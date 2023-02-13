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
        <div class='flex justify-between items-center'>
            <h1>Jobs</h1>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 m-4"
                on:click={() => {fetchGetQueryFilter(`pipelines/${pipelineId}/jobs`).then(r => { jobs = r })}} 
                on:keypress={() => {fetchGetQueryFilter(`pipelines/${pipelineId}/jobs`).then(r => { jobs = r })}} 
                role='button'
            >
                <path stroke-linecap="round" stroke-linejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99" />
            </svg>

        </div>
        <Table rows={jobs}
            columns={['id', 'stage', 'name', 'status'].map(i => ({
                key: i,
                component: i === 'status' && Tag,
                componentProps: i === 'status' ? (row, k) => ({status: row[k]}) : undefined
            }))} />
    {/if}
</div>
