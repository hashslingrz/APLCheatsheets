<script>
import { DataTable } from "carbon-components-svelte";
import { Search } from "carbon-components-svelte";
import Grid from "svelte-grid";
import gridHelp from "svelte-grid/build/helper";
import map from "lodash.map";

// Handle pop-up dialog when saving layout
import SaveLayout from './SaveLayout.svelte';
import Modal from 'svelte-simple-modal';

// Library for encoding JSON objects for use in URLs
import JsonUrl from "./json-url.js";
const jib = JsonUrl("lzma");

// Handle decoding query parameter into layout
const urlParams = new URLSearchParams(window.location.search);
const layoutParam = urlParams.get('q');
let cols = 6;
let stack = [];
let defaultSheets = [];
if (layoutParam == null) {
	// Read list of cheatsheets & fetch each associated JSON file
	fetch("data/cheatsheets.txt")
		.then(response => response.text())
		.then(sheetList => {
			let files = (sheetList.split("\n")).filter(item => item);
			const requests = files.map((jsonfile) => {
			    return fetch("data/"+jsonfile+".json")
					.then(response => response.json())
					.then(cheatsheet => defaultSheets.push(gridHelp.item(cheatsheet)));
			})
			Promise.all(requests).then(() => stack = [defaultSheets]);
		}
	);
} else {
	jib.decompress(layoutParam).then(output => { stack = [output]; });
}

// Handle search bar "stack" functionality
let searchQuery = "";
let searchIndexer = 0;
const updateSearch = (e) => {
	let tmp = e.target.value;
	if (tmp.length != null) {
		if (tmp.length > searchQuery.length) {
			for (let i = searchQuery.length; i < tmp.length; i++) {
				stack.push(stack[i].filter(item => item.title.includes(tmp)));
			}
			searchIndexer += (tmp.length - searchQuery.length);
		} else {
			for (let i = tmp.length; i < searchQuery.length; i++) {
				stack.pop();
			}
			searchIndexer -= (searchQuery.length - tmp.length);
		}
		//console.log(searchIndexer+" "+tmp);
		searchQuery = tmp;
	} else {
		searchQuery = "";
		searchIndexer = 0;
	}
}

// Responsive breakpoints
let breakpoints = [[1100, 4], [800, 2], [530, 1]];

// Mouse handling utility
const mousedown = (e) => {
	e.preventDefault()
	e.stopPropagation()
	e.stopImmediatePropagation()
}

// Cheatsheet pinning functionality
const pin = item => {
	const reMapItems = stack[searchIndexer].map(value => {
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
	stack[searchIndexer] = reMapItems;
};
</script>

<svelte:head>
<link rel="stylesheet" href="https://unpkg.com/carbon-components@10.9.0/css/carbon-components.min.css"/>
</svelte:head>

<main>
	<Modal>
	<div class="topnav">
	    <h1 class="topnav-left">Dyalog APL Cheatsheets</h1>
		<div class="topnav-right">
			<SaveLayout codePromise={jib.compress(stack[searchIndexer])}/>
			<Search on:input={updateSearch}></Search>
		</div>
	</div>
	<Grid {breakpoints} bind:items={stack[searchIndexer]} {cols} let:item rowHeight={100} gap={2}>
		<div class="content" style="background: {item.static ? '#cce' : '#ccc'}; border: 1px solid black;">
			<div class="pin">
				<input id={item.id} type="checkbox" name={item.id} checked={item.static} on:click={pin.bind(null, item)} on:mousedown={mousedown}/>
				<label for={item.id}></label>
			</div>
			<DataTable size="short" title={item.title} rows={item.row} headers={item.header}></DataTable>
		</div>
	</Grid>
	</Modal>
</main>

<style>
.topnav {
	padding-left: 2ex;
	padding-right: 2ex;
	overflow: hidden;
	background-color: #e9e9e9;
}
.topnav-left {
	display: block;
	float: left;
	text-align: center;
}
.topnav-right {
	display: flex;
	float: right;
}
@media screen and (max-width: 768px) {
	.topnav-left, .topnav-right {
		float: none;
		display: block;
		text-align: left;
		width: 100%;
		margin: 0;
	}
}
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
.content {
	width: 100%;
	height: 100%;
	color: black;
	display: flex;
	justify-content: center;
	align-items: center;
	font-size: large;
}
:global(.bx--search-close) {
	display: none !important;
}
:global(.svlt-grid-shadow) {
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