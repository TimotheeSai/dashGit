<script lang='ts'>
    import { createEventDispatcher } from 'svelte';

    export let jobs = [];
    export let pipelineId: number;

	const dispatch = createEventDispatcher();
    const setJob = (jobId: any):void => {
        dispatch('setJob', {
            job: jobs.find(e => e.id === jobId)
        })
    }

</script>
<div>
    {#if jobs.length}
        <div class='flex justify-center items-center'>
            <div>jobs for pipeline: {pipelineId}</div>
        </div>
        <ul class='flex flex-col shadow rounded p-4 bg-white my-2'>
            {#each jobs as item}
                <li class='grid grid-cols-6 text-left' on:click={() => {setJob(item.id)}} on:keypress={() => {() => {setJob(item.id)}}}>
                    <div class='col-span-2'>{item.ref}</div>
                    <div>{item.id}</div>
                    <div>{item.stage}</div>
                    <div>{item.name}</div>
                    <div>{item.status}</div>
                </li>
            {/each}
        </ul>
    {/if}
</div>
