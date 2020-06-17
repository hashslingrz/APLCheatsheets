import gridHelp from "svelte-grid/build/helper";

import ucmd from '../data/ucmd.json';
import shortcuts from '../data/shortcuts.json';

let items = [
	gridHelp.item(ucmd),
	gridHelp.item(shortcuts)
];
export { items };
