<script lang='ts'>
    enum Status {
        FAILED = 'failed',
        SUCCESS = 'success',
        SKIPPED = 'skipped',
    }

    export let status: Status;
    export let content: string = '';

    let textColor: string
    $: textColor = status === Status.FAILED
        ? 'text-red-500'
        : status === Status.SUCCESS
            ? 'text-green-500'
            : 'text-amber-500'

    let ringColor: string
    $: ringColor = status === Status.FAILED
        ? 'ring-red-500'
        : status === Status.SUCCESS
            ? 'ring-green-500'
            : 'ring-amber-500'
</script>
<div
    class='m-auto text-center px-4 w-min rounded {textColor} ring-2 {ringColor}'
>
    {content || status}
</div>
