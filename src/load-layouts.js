import gridHelp from "svelte-grid/build/helper";

import ucmd from '../data/ucmd.json';
import shortcuts from '../data/shortcuts.json';

let items = [
	gridHelp.item({
		x: 0,
		y: 0,
		w: 2,
		h: 3,
		id: ucmd.id,
		title: "User Commands",
		header: ucmd.headers,
		row: ucmd.rows
	}),
	gridHelp.item({
		x: 2,
		y: 0,
		w: 2,
		h: 6,
		id: shortcuts.id,
		static: true,
		title: "Shortcuts",
		header: shortcuts.headers,
		row: shortcuts.rows
	})
];
export { items };
