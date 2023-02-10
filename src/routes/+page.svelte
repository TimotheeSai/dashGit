<script lang="ts">
    import MergeRequestList from '$lib/MergeRequestList.svelte'
    import PipelineList from '$lib/PipelineList.svelte'
    import Job from '$lib/JobView.svelte'
    import JobList from '$lib/JobList.svelte'
    import ThemeSelector from '$lib/ThemeSelector.svelte'

    let job: any;
    let pipelineId: number;
    let mrIid: number;
    let unique = {};
</script>

<main class='bg-inherit flex flex-col m-4 lg:m-16'>
    <div class='flex justify-between items-center'>
        <h1 class='text-6xl font-bold'>DashGit</h1>
        <div class='flex gap-4'>
            <button
                class='btn btn-active'
                on:click={() => {
                    mrIid = 0
                    pipelineId = 0
                    job = null
                    unique = {}
                }}
            >
                Reset
            </button>
            <ThemeSelector />
        </div>
    </div>
    {#key unique}
    <MergeRequestList
        selectedIid={mrIid}
        on:setMr={({ detail: { iid } }) => {
            mrIid = iid
            pipelineId = 0
            job = null
        }}
    />
    <PipelineList
        mrIid={mrIid}
        on:setPipeline={({ detail: { id } }) => {
            pipelineId = id
            job = null
        }}
    />
    <JobList pipelineId={pipelineId} on:setJob={(ev) => { job = ev.detail.job }} />
    <Job job={job} />
    {/key}
</main>
