<script lang="ts">
    import { onMount } from 'svelte'
    import Convert from 'ansi-to-html'
    import Counter from './lib/Counter.svelte'
    import { 
        fetchApiGet,
		fetchJob,
		fetchJobTrace,
        fetchMergeRequests,
        fetchGetQueryFilter,
        fetchPipelines
    } from './lib/queryApi'


    let job: any;
    let jobTrace: string = '';
    let failedTests: Array<string> = [];
    let mr = [];
    let pipelines = [];
    let pipelineJobs = [];
    let mrPipelines = [];

    let pipelineId: number;
    let mrIid: number;
    let jobId: number;
    
    $: console.log({mr: mr, mrp: mrPipelines, pipelineJobs: pipelineJobs, mrIid, job, jobTrace, failedTests});
    $: mrIid && fetchGetQueryFilter(`merge_requests/${mrIid}/pipelines`).then( r => { mrPipelines = r } )
    $: pipelineId && fetchGetQueryFilter(`pipelines/${pipelineId}/jobs`).then(r => { pipelineJobs = r })
    $: job && fetchJobTrace(job.id).then(r => { jobTrace = new Convert().toHtml(r) })
    $: failedTests = jobTrace ? listFailedTests(jobTrace, job.name) : [];

    onMount(async () => {
        // jobTrace = await fetchJobTrace('630745');
        job = await fetchJob(687002)
        mr = await fetchMergeRequests({
            assignee_id: '127',
            state: 'opened'
        })
        mrIid = mr[0].iid
    });

    const listFailedTests = (trace: string, jobName: string): Array<string> => {
        switch (jobName) {
            case 'launch-external-console-end2end-part-1-on-branch':
            case 'launch-external-console-end2end-part-2-on-branch':
            case 'launch-admin-console-end2end-on-branch':
                return [... new Set(trace.match(/\nFAIL .*\n/g).map(s => (s.match(/\nFAIL (.*\.js)(?: \(.*\))?/)[1])))];
            case 'test-edi-ccep-unit-test':
                return [... new Set(trace.match(/\nFAIL:.*\n/g).map(s => (s.match(/\nFAIL: (.*)/)[1])))]
            default:
                return []
        }
    }  

</script>

<main class='bg-inherit flex flex-col w-full'>
    {#if mr.length}
        <div class='flex justify-center items-center'>
            <div>merge request iid: {mrIid}</div>
        </div>
        <ul class='flex flex-col shadow rounded p-4 bg-white my-2'>
            {#each mr as item}
                <li class='grid grid-cols-3 py-1 text-left' on:click={() => {mrIid = item.iid}} on:keypress={() => {mrIid = item.iid}}>
                    <div class='col-span-2'>{item.title}</div>
                    <div>{item.id}</div>
                </li>
            {/each}
        </ul>
    {/if}
    {#if mrPipelines.length}
        <div class='flex justify-center items-center'>
            <div>pipelines for mrIid: {mrIid}</div>
        </div>
        <ul class='flex flex-col shadow rounded p-4 bg-white my-2'>
            {#each mrPipelines as item}
                <li class='grid grid-cols-4 text-left' on:click={() => {pipelineId = item.id}} on:keypress={() => {pipelineId = item.id}}>
                    <div class='col-span-2'>{item.ref}</div>
                    <div>{item.status}</div>
                    <div>{item.id}</div>
                </li>
            {/each}
        </ul>
    {/if}
    {#if pipelineJobs.length}
        <div class='flex justify-center items-center'>
            <div>jobs for pipeline: {pipelineId}</div>
        </div>
        <ul class='flex flex-col shadow rounded p-4 bg-white my-2'>
            {#each pipelineJobs as item}
                <li class='grid grid-cols-6 text-left' on:click={() => {jobId = item.id; job = pipelineJobs.find(e => e.id === item.id)}} on:keypress={() => {jobId = item.id}}>
                    <div class='col-span-2'>{item.ref}</div>
                    <div>{item.id}</div>
                    <div>{item.stage}</div>
                    <div>{item.name}</div>
                    <div>{item.status}</div>
                </li>
            {/each}
        </ul>
    {/if}
    {#if job}
        <div>{job.id}</div> 
        
        <ul class='flex flex-col shadow rounded p-4 bg-white my-2'>
            {#each failedTests as test}
                <li class='text-left'>
                    {test}
                </li>
            {/each}
        </ul>
        <div class='w-full'>
            <pre class='max-h-96 px-4 overflow-scroll text-left text-xs bg-black text-white'>{@html jobTrace}</pre> 
        </div>
    {/if}
</main>
