<!-- src/routes/+error.svelte -->
<script>
  export let error;
  export let status;

  console.log('==>>>', error, status)
</script>

<h1 class="err">
  404 ERROR
</h1>

<style>
  .err {
    @apply mt-16 text-[72px] font-bold justify-center items-center text-center
  }
</style>
