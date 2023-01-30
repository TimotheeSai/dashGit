<script lang='ts'>
    enum Status {
        FAILED = 'failed',
        SUCCESS = 'success',
        SKIPPED = 'skipped',
    }

    export let status: Status;
    export let content: string = '';

    let color: string
    $: color = status === 'failed'
        ? 'red'
        : status === 'success'
            ? 'green'
            : 'amber'

</script>
<div
    class='m-auto text-center px-4 w-min rounded text-{color}-500 ring-2 ring-{color}-500'
>
    {content || status}
</div>
