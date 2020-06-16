<script>
import { Button } from "carbon-components-svelte";
import { getContext } from 'svelte';
import Popup from './Popup.svelte';
const { open } = getContext('simple-modal');

export let codePromise;

const saveLayout = () => {
    open(Popup, { promise: codePromise});
};
</script> 

<Button on:click={saveLayout}>Save</Button>
