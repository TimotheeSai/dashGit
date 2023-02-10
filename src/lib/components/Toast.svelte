<script lang="ts">
    let show: true

    setTimeout(() => {
      t.$destroy()
    }, 2000)
</script>
<div class="toast toast-top toast-right">
    <div class="alert alert-info">
        <div>
            <span>New mail arrived.</span>
        </div>
    </div>
    <div class="alert alert-success">
        <div>
            <span>Message sent successfully.</span>
        </div>
    </div>
</div>
