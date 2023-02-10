<script lang='ts'>
    import Convert from 'ansi-to-html'
    import {
		fetchJobTrace,
    } from './queryApi'
    import Tag from '$lib/components/Tag.svelte'

    export let job: any;

    let jobTrace: string = '';
    let failedTests: Array<string> = [];

    $: console.log({job, jobTrace})
    $: job && fetchJobTrace(job.id).then(r => { jobTrace = new Convert().toHtml(r) })
    $: failedTests = jobTrace ? listFailedTests(jobTrace, job?.name) : [];

    const listFailedTests = (trace: string, jobName: string): Array<string> => {
        const failSplit: Array<string> = trace.match(/\nFAIL .*\n/g) || []
        switch (jobName) {
            case 'launch-external-console-end2end-part-1-on-branch':
            case 'launch-external-console-end2end-part-2-on-branch':
            case 'launch-admin-console-end2end-on-branch':
                return [... new Set(failSplit.map(s => (s.match(/\nFAIL (.*\.js)(?: \(.*\))?/)[1])))];
            case 'test-edi-ccep-unit-test':
                return [... new Set(failSplit.map(s => (s.match(/\nFAIL: (.*)/)[1])))]
            default:
                return []
        }
    }
</script>

<div>
    {#if job}
        <div class="card w-full bg-base-100 shadow-xl my-4">
            <div class="card-body">
                <h2 class="card-title">Job {job.id}</h2>

                <div class="stats bg-base-200 shadow">

                    <div class="stat place-items-center">
                        <div class="stat-title">Status</div>
                        <div class="stat-value"><Tag status={job.status} /></div>
                    </div>

                    <div class="stat place-items-center">
                        <div class="stat-title">Duration</div>
                        <div class="stat-value ">{Math.floor(job.duration / 60)} min</div>
                    </div>

                    {#if failedTests.length}
                    <div class="stat place-items-center">
                        <div class="stat-title">Failed tests</div>
                        <div class="stat-value">{failedTests.length}</div>
                    </div>
                    {/if}
                </div>

                <div class='inline-flex justify-between'>
                    <div>
                        <div class='font-bold'>started: &nbsp;</div>
                        <div>{new Date(job.started_at).toLocaleString()}</div>
                    </div>
                    <div>
                        <div class='font-bold'>finished: &nbsp;</div>
                        <div>{new Date(job.finished_at).toLocaleString()}</div>
                    </div>
                </div>

                <div class="divider"></div>

                {#if failedTests.length}
                <div tabindex="0" class="collapse collapse-arrow bg-base-100 rounded-box" role='textbox'>
                    <input type="checkbox"/>
                    <div class="collapse-title text-xl font-medium">
                        <h3>Failed tests</h3>
                    </div>
                    <div class="collapse-content">
                        <ul class='flex flex-col shadow rounded p-4 bg-black text-color-white my-2 font-mono whitespace-nowrap overflow-x-scroll'>
                            {#each failedTests as test}
                                <li class='text-left text-sm'>
                                    {test}
                                </li>
                            {/each}
                        </ul>
                        <div class='flex justify-between items-center border-solid bg-base-200 rounded-box px-4' role='button' on:click={() => {
                            navigator.clipboard.writeText(`yarn run test:e2e '${failedTests.join('|')}'`)
                        }}>
                            <div>Copy test string</div>
                            <div class='flex justify-end my-4'>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25zM6.75 12h.008v.008H6.75V12zm0 3h.008v.008H6.75V15zm0 3h.008v.008H6.75V18z" />
                                </svg>
                            </div>
                        </div>
                    </div>
                </div>
            {/if}

            {#if jobTrace}
                <div tabindex="0" class="collapse collapse-arrow bg-base-100 rounded-box" role='textbox'>
                    <input type="checkbox"/>
                    <div class="collapse-title text-xl font-medium">
                        <h3>Trace</h3>
                    </div>
                    <div class="collapse-content">
                        <div class='w-full'>
                            <pre class='max-h-96 px-4 overflow-scroll text-left text-xs bg-black text-white'>{@html jobTrace}</pre>
                        </div>
                    </div>
                </div>
            {/if}
            </div>
        </div>
    {/if}
</div>
