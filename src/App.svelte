<script lang="ts">
    import { onMount } from 'svelte'
    import MergeRequestList from './lib/MergeRequestList.svelte'
    import PipelineList from './lib/PipelineList.svelte'
    import Job from './lib/JobView.svelte'
    import JobList from './lib/JobList.svelte'
    import { 
        fetchMergeRequests,
        fetchGetQueryFilter,
        fetchPipelines
    } from './lib/queryApi'


    let mergeRequests = [];
    let mrPipelines = [];
    let pipelineJobs = [];

    let job: any;
    let jobTrace: string = '';
    let pipelineId: number;
    let mrIid: number;
    
    $: console.log({mr: mergeRequests, mrp: mrPipelines, pipelineJobs: pipelineJobs, mrIid, job, jobTrace});
    $: mrIid && fetchGetQueryFilter(`merge_requests/${mrIid}/pipelines`).then( r => { mrPipelines = r } )
    $: pipelineId && fetchGetQueryFilter(`pipelines/${pipelineId}/jobs`).then(r => { pipelineJobs = r })

    onMount(async () => {
        // jobTrace = await fetchJobTrace('630745');
        // job = await fetchJob(687002)
        mergeRequests = await fetchMergeRequests({
            assignee_id: '127',
            state: 'opened'
        })
        // mrIid = mergeRequests[0].iid
    });

</script>

<main class='bg-inherit flex flex-col '>
    <div>
        <button 
            class='rounded px-4 ring-2'
            on:click={() => {
                mrIid = 0
                mrPipelines = []
                pipelineJobs = []
                job = null
            }}
        >
            Reset
        </button>
    </div>
    {#if mrIid}
        <div class='flex justify-center items-center'>
            <div>merge request iid: {mrIid}</div>
        </div>
    {:else}
        <MergeRequestList
            mergeRequests={mergeRequests}
            on:setMr={({ detail: { iid } }) => {mrIid = iid }}
        />
    {/if}
    <PipelineList
        pipelines={mrPipelines}
        mrId={mrIid} 
        on:setPipeline={({ detail: { id } }) => {pipelineId = id}}
    />
    <JobList jobs={pipelineJobs} on:setJob={(ev) => { job = ev.detail.job }} pipelineId={pipelineId}/>
    <Job job={job} />
</main>
