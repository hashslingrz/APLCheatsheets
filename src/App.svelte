<script>
import { DataTable } from "carbon-components-svelte";
import { Search } from "carbon-components-svelte";
import Grid from "svelte-grid";
import gridHelp from "svelte-grid/build/helper";
import map from "lodash.map";

import ucmd_h from '../data/ucmd_h.json';
import ucmd_c from '../data/ucmd_c.json';
import shortcut_h from '../data/shortcut_h.json';
import shortcut_c from '../data/shortcut_c.json';

let searchQuery = "";
let searchIndexer = 0;
const updateSearch = (e) => {
	let tmp = e.target.value;
	if (tmp.length != null) {
		if (tmp.length > searchQuery.length) {
			cheatsheets.push(items.filter(item => item.title.includes(tmp)));
			searchIndexer += (tmp.length - searchQuery.length);
		} else {
			cheatsheets.pop(items.filter(item => item.title.includes(tmp)));
			searchIndexer -= (searchQuery.length - tmp.length);
		}
		searchQuery = tmp;
	} else {
		searchQuery = "";
		searchIndexer = 0;
	}
	//console.log(tmp);
}

let cols = 6;
let items = [
	gridHelp.item({ x: 0, y: 0, w: 2, h: 3, id: "ucmds", title: "User Commands", header: ucmd_h, row: ucmd_c }),
	gridHelp.item({ x: 2, y: 0, w: 2, h: 6, id: "shortcuts", static: true, title: "Shortcuts", header: shortcut_h, row: shortcut_c })
];
let cheatsheets = [items];

// Responsive breakpoints
let breakpoints = [[1100, 4], [800, 2], [530, 1]];

const mousedown = (e) => {
	e.preventDefault()
	e.stopPropagation()
	e.stopImmediatePropagation()
}

const pin = item => {
	console.log("pinned!");
	const reMapItems = items.map(value => {
		if (value.id === item.id) {
			return {
				...value,
				...{
					static: !value.static,
					draggable: !value.draggable,
					resizable: !value.resizable
				}
			};
		}
		return value;
	});
	items = reMapItems;
};
</script>

<svelte:head>
<link rel="stylesheet" href="https://unpkg.com/carbon-components@10.9.0/css/carbon-components.min.css"/>
</svelte:head>

<main>
	<div class="flexbox">
		<div class="flexitem">
			<h1>Dyalog APL Cheatsheets</h1>
		</div>
		<div class="flexitem" style="width: 100%">
			<Search on:input={updateSearch} inline=true></Search>
		</div>
	</div>
	<Grid {breakpoints} bind:items={cheatsheets[searchIndexer]} {cols} let:item rowHeight={100} gap={2}>
		<div class="content" style="background: {item.static ? '#cce' : '#ccc'}; border: 1px solid black;">
			<div class="pin">
				<input id={item.id} type="checkbox" name={item.id} checked={item.static} on:click={pin.bind(null, item)} on:mousedown={mousedown}/>
				<label for={item.id}></label>
			</div>
			<DataTable size="short" title={item.title} rows={item.row} headers={item.header}></DataTable>
		</div>
	</Grid>
</main>

<style>
.pin {
	position: absolute;
	top: 0;
	right: 0;
}
.pin input[type="checkbox"] {
	display: none;
}
.pin input + label {
	display: inline-block;
	margin-top: 4px;
	margin-right: 2px;
	width: 25px;
	height: 25px;
	cursor: pointer;
	background-size: contain;
	background-repeat: no-repeat;
	background-image: url(../assets/unpinned.png);
}
.pin input[type="checkbox"]:checked + label {
	background-size: contain;
	background-repeat: no-repeat;
	background-image: url(../assets/pinned.png)
}
.flexbox {
    display: -webkit-flex;
    display: -ms-flexbox;
    display: flex;
	width: 100%
}
.flexitem {
    min-width: 0;
	width: auto;
    margin: 5px;
}
.flexitem:nth-child(1) { /*DO NOT SHRINK*/
    -webkit-flex: 0 0 auto;
        -ms-flex: 0 0 auto;
            flex: 0 0 auto;
}
.content {
	width: 100%;
	height: 100%;
	color: black;
	display: flex;
	justify-content: center;
	align-items: center;
	font-size: large;
}
:global(.svlt-grid-shadow) {
	/*transition: top 0.2s, left 0.2s;*/
	/*transition: transform 0.2s;*/
	transition: width 0.3s, height 0.3s;
	background: #0000FF;
}
:global(.svlt-grid-container) {
	background: #fff;
}
:global(.svlt-grid-transition > .svlt-grid-item) {
	transition: transform 0s;
}
:global(.bx--data-table-container) {
	min-width: 0 !important;
	height: 100%;
	width: 100%;
}
:global(.bx--data-table-header__title) {
	text-transform: uppercase;
	font-weight: 700;
}
</style>