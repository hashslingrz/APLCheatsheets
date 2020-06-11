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

const id = () =>
  "_" +
  Math.random()
    .toString(36)
    .substr(2, 9);

function generateLayout(col) {
	// new Array(number_of_items)
  return map(new Array(10), function(item, i) {
    const y = Math.ceil(Math.random() * 4) + 1;
    return gridHelp.item({
      x: (i * 2) % col,
      y: Math.floor(i / 6) * y,
      w: 2,
      h: y,
      id: id()
    });
  });
}

const randomNumberInRange = (min, max) => Math.random() * (max - min) + min;
let adjustAfterRemove = false;
let cols = 6;
let layout = generateLayout(cols);

//let items = gridHelp.resizeItems(layout, cols);
let items = [
	gridHelp.item({ x: 0, y: 0, w: 2, h: 3, id: id(), title: "User Commands", header: ucmd_h, row: ucmd_c }),
	gridHelp.item({ x: 2, y: 0, w: 2, h: 6, id: id(), title: "Shortcuts", header: shortcut_h, row: shortcut_c })
];
	
let breakpoints = [[1100, 5], [800, 4], [530, 1]];
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
			<Search></Search>
		</div>
	</div>
	<Grid {breakpoints} bind:items={items} {cols} let:item rowHeight={100} gap={2}>
		<div class="content" style="background: #ccc; border: 1px solid black;">
			<DataTable size="short" title={item.title} rows={item.row} headers={item.header}></DataTable>
		</div>
	</Grid>
</main>

<style>
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