<script lang='ts'>
    import { createEventDispatcher } from 'svelte';

    export let mergeRequests = [];
    
	const dispatch = createEventDispatcher();
    const setMr = (iid: number) => {
        dispatch('setMr', { iid })
    }
</script>
<div class=''>
    {#if mergeRequests.length}
        <ul class='flex flex-col shadow rounded p-4 bg-white my-2'>
            {#each mergeRequests as item}
                <li class='flex flex-row justify-between py-1 text-left'
                    on:click={() => {setMr(item.iid)}}
                    on:keypress={() => {setMr(item.iid)}}
                >
                    <div class=''>{item.title}</div>
                    <div>{item.id}</div>
                </li>
            {/each}
        </ul>
    {/if}
</div>
