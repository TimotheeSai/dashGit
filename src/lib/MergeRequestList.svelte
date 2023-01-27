<script lang='ts'>
    import { createEventDispatcher } from 'svelte';

    export let mergeRequests = [];
    
	const dispatch = createEventDispatcher();
    const setMr = (iid: number) => {
        dispatch('setMr', { iid })
    }
</script>
<div>
    {#if mergeRequests.length}
        <ul class='flex flex-col shadow rounded p-4 bg-white my-2'>
            {#each mergeRequests as item}
                <li class='grid grid-cols-3 py-1 text-left'
                    on:click={() => {setMr(item.iid)}}
                    on:keypress={() => {setMr(item.iid)}}
                >
                    <div class='col-span-2'>{item.title}</div>
                    <div>{item.id}</div>
                </li>
            {/each}
        </ul>
    {/if}
</div>
