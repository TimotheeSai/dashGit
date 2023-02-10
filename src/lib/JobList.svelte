<script lang='ts'>
    import { createEventDispatcher } from 'svelte';
    import Tag from '$lib/components/Tag.svelte'
    import Table from '$lib/components/Table.svelte';
    import {
        fetchGetQueryFilter
    } from '$lib/queryApi'
    import type { Job } from '$lib/queryApi'

    export let pipelineId: number;
    export let jobs: Job[] = [];
    let selected: number;

	const dispatch = createEventDispatcher();

    $: pipelineId ? fetchGetQueryFilter(`pipelines/${pipelineId}/jobs`).then(r => { jobs = r }) : (jobs = [])
    $: selected = pipelineId ? selected : 0
    $: jobs = jobs.map(({id, ...job}) => ({
        ...job,
        id,
        class: `${selected  && selected  !== id ? 'hidden' : ''}`,
        onClick: () => {
            selected = selected ? 0 : id
            dispatch('setJob', {
                job: jobs.find(e => e.id === id)
            })
        }
    }))
</script>
<div>
    {#if jobs.length}
        <div class="divider"></div>
        <h1>Jobs</h1>
        <Table rows={jobs}
            columns={['id', 'stage', 'name', 'status'].map(i => ({
                key: i,
                component: i === 'status' && Tag,
                componentProps: i === 'status' ? (row, k) => ({status: row[k]}) : undefined
            }))} />
    {/if}
</div>
