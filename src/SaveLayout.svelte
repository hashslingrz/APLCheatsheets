<script>
import { Button } from "carbon-components-svelte";
import { getContext } from 'svelte';
import Popup from './Popup.svelte';
import JsonUrl from "./json-url.js";

const jib = JsonUrl("lzma");
const { open } = getContext('simple-modal');

export let layoutToSave;

const saveLayout = () => {
    let codePromise = jib.compress(layoutToSave);
    open(Popup, { promise: codePromise });
};
</script> 

<Button on:click={saveLayout}>Save</Button>
