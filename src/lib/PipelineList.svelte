<script lang='ts'>
    import { createEventDispatcher } from 'svelte';
    import Table from '$lib/components/Table.svelte';
    import Tag from '$lib/components/Tag.svelte'
    import {
        fetchGetQueryFilter
    } from '$lib/queryApi'
    import type { Pipeline } from '$lib/queryApi'
    	
    export let pipelines: Pipeline[] = [];
    export let mrIid: number;
    let selected: number;

	const dispatch = createEventDispatcher();

    $: console.log({pipelines})
    $: mrIid ? fetchGetQueryFilter(`merge_requests/${mrIid}/pipelines`).then( r => { pipelines = r } ) : (pipelines = [])
    $: selected = mrIid ? selected : 0
    $: pipelines = pipelines.map(({id, ...p}) => ({
        ...p,
        id,
        class: `${selected ? selected  !== id && 'hidden' : ''}`,
        onClick: () => {
            selected = selected ? 0 : id
            dispatch('setPipeline', { id: selected })
        }
    }))
</script>
<div>
    {#if pipelines.length}
        <div class="divider"></div>
        <h1>Pipelines</h1>
        <Table rows={pipelines}
            columns={[
                {
                    key: 'id',
                    element: 'a',
                    componentProps: (row) => ({
                        href: row.web_url,
                        target: '_blank',
                        class: 'underline'
                    })
                },{
                    key: 'ref'
                },{
                    key: 'updated_at',
                    title: 'last updated',
                    content: (row, key) => (new Date(row[key]).toLocaleString())
                },{
                    key: 'status',
                    component: Tag,
                    componentProps: (row, k) => ({status: row[k]})

                }
            ]}
        />
    {/if}
</div>
