<script lang='ts'>
    enum Status {
        FAILED = 'failed',
        SUCCESS = 'success',
        SKIPPED = 'skipped',
    }

    export let status: Status;
    export let content: string = '';
    let badgeState: string
    $: badgeState = status === Status.FAILED
        ? 'badge-error'
        : status === Status.SUCCESS
            ? 'badge-success'
            : 'badge-warning'
</script>
<div
    class='badge {badgeState}'
>
    {content || status}
</div>
