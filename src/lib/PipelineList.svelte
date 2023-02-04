<script lang='ts'>
    import { createEventDispatcher } from 'svelte';
    import Tag from './Tag.svelte'
    	
    export let pipelines = [];
    export let mrId: number;

	const dispatch = createEventDispatcher();
    const setPipelineId = (id: number):void => {
        dispatch('setPipeline', {id})
    }
</script>
<div>
    {#if pipelines.length}
        <div class='flex justify-center items-center'>
            <div>pipelines for mrId: {mrId}</div>
        </div>
        <ul class='flex flex-col shadow rounded p-4 bg-white my-2 divide-y-2'>
            {#each pipelines as item}
                <li
                    class='grid grid-cols-4 text-left py-4'
                    on:click={() => {setPipelineId(item.id)}}
                    on:keypress={() => {setPipelineId(item.id)}}
                >
                    <div class='col-span-2'>{item.ref}</div>
                    <Tag status={item.status}/>
                    <div>{item.id}</div>
                </li>
            {/each}
        </ul>
    {/if}
</div>
