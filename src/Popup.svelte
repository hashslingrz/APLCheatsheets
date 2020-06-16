<script>
  export let promise;
</script> 

{#await promise then codeResult}
<pre>{codeResult}</pre>
{/await}