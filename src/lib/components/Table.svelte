<script lang="ts">
    interface Column {
        key: string,
        title?: string,
        component?: any,
        element?: string,
        componentProps?: (row: any, key: string|number) => any,
        content?: (row: any, key: string|number) => any
    };
    export let columns: Column[] = [];
    export let rows: any[] = [];

</script>
<div class="overflow-x-auto dark:bg-slate-800">
    <table class="table w-full">
        <thead>
            <tr>
                {#each columns as headerItem}
                    <th>{headerItem.title || headerItem.key}</th>
                {/each}
            </tr>
        </thead>
        <tbody>
            {#each rows as rowItem}
                <tr
                    on:click={rowItem?.onClick}
                    on:keypress={rowItem?.onClick}
                    class={rowItem.class || ''}
                >
                    {#each columns as col}
                        <td class='overflow-x-auto max-w-2xl'>
                            {#if col.component}
                                <svelte:component this={col.component} {...col.componentProps && col.componentProps(rowItem, col.key)}/>
                            {:else if col.element}
                                <svelte:element this={col.element} {...col.componentProps && col.componentProps(rowItem, col.key)}>
                                    {rowItem[col.key]}
                                </svelte:element>
                            {:else}
                                {col.content ? col.content(rowItem, col.key) : rowItem[col.key]}
                            {/if}
                        </td>
                    {/each}
                </tr>
            {/each}
        </tbody>
    </table>
</div>
