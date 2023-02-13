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
        <div class='flex items-center justify-between'>
            <h1>Pipelines</h1>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 m-4"
                on:click={() => {fetchGetQueryFilter(`merge_requests/${mrIid}/pipelines`).then( r => { pipelines = r } )}}
                on:keypress={() => {fetchGetQueryFilter(`merge_requests/${mrIid}/pipelines`).then( r => { pipelines = r } )}}
                role='button'
            >
                <path stroke-linecap="round" stroke-linejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99" />
            </svg>
        </div>
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
