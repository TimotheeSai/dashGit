<script lang='ts'>
    import Convert from 'ansi-to-html'
    import { 
		fetchJobTrace,
    } from './queryApi'

    export let job: any;
    
    let jobTrace: string = '';
    let failedTests: Array<string> = [];

    $: console.log({job, jobTrace})
    $: job && fetchJobTrace(job.id).then(r => { jobTrace = new Convert().toHtml(r) })
    $: failedTests = jobTrace ? listFailedTests(jobTrace, job.name) : [];

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
        <div>{job.id}</div> 

        {#if failedTests.length}
        <ul class='flex flex-col shadow rounded p-4 bg-white my-2'>
            {#each failedTests as test}
                <li class='text-left'>
                    {test}
                </li>
            {/each}
        </ul>
        {/if}
        <div class='w-full'>
            <pre class='max-h-96 px-4 overflow-scroll text-left text-xs bg-black text-white'>{@html jobTrace}</pre> 
        </div>
    {/if}
</div>
