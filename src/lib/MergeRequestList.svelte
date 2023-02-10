<script lang='ts'>
    import { onMount } from 'svelte'
    import { createEventDispatcher } from 'svelte';
    import Table from '$lib/components/Table.svelte';
    import {
        fetchMergeRequests
    } from '$lib/queryApi'
    import type { MergeRequest } from '$lib/queryApi'

	const dispatch = createEventDispatcher();

    export let mergeRequests: MergeRequest[] = [];
    export let selectedIid: number;

    $: mergeRequests = mergeRequests.map(({ iid, ...mr }) => ({
        ...mr,
        iid,
        class: `${selectedIid && selectedIid !== iid ? 'hidden' : ''}`,
        onClick: () => {
            selectedIid = selectedIid ? 0 : iid
            dispatch('setMr', { iid: selectedIid })
        }
    }))
    $: console.log({mergeRequests})

    onMount(async () => {
        mergeRequests = await fetchMergeRequests({
            assignee_id: '127',
            state: 'opened'
        })
    });
</script>

<h1>Merge Requests</h1>
<div class='py-4'>
    {#if mergeRequests.length}
        <Table rows={mergeRequests}
            columns={[
                {
                    key: 'iid',
                    element: 'a',
                    componentProps: (row) => ({
                        href: row.web_url,
                        target: '_blank',
                        class: 'underline'
                    })
                },{
                    key: 'title'
                }]
            } />
    {/if}
</div>
