# How to Contribute APL Cheatsheets

**NOTE:** At present, the layout values (x and y coordinatess, width and height) are hardcoded into each JSON file. This will get unwieldy quickly, but is easier for fine-tuning each cheatsheet's size and position at present.

## Cheatsheets are Just JSON

Below is a bare-bones cheatsheet example:

```
{
    "x":0,
    "y":0,
    "w":2,
    "h":2,
    "id":"example",
    "static": false,    
    "title":"Example Cheatsheet",
    "header": [t
        { "key":"instruction", "value":"How to Do Something" },
        { "key":"result", "value":"What Happens as a Result" }
    ],
    "row": [
        {
            "id":"b",
            "instruction":"Eat an apple a day",
            "result":"Keeps those doctors away"
        },
        {
            "id":"a",
            "instruction":"Learn APL",
            "result":"Wonder why you ever used anything else"
        },
    ]
}
```
### `x` and `y`

These determine the top-left origin of the cheatsheet table on the page grid. If you look in [src/App.svelte](../../src/App.svelte), you will find that the variable `cols` is hardcoded to `6`. This is currently the predefined number of columns of the page grid.

### `w` and `h`

Taking into account the top-left origin as defined by `x` and `y`, including knowledge of the number of columns, use these values to determine the *width* and *height* of your cheatsheet on the grid. The maximum width is `6` (for six columns) and the height is "unlimited" (i.e. the page extends to fit the grid).

### `id`

This is the unique identification used internally to keep track of the cheatsheet. Make it unique, and preferably related to what the cheatsheet is (e.g. `shortcuts`).

### `static`

This determines whether the cheatsheet is pinned by default. A value of `true` means a sheet is pinned on page load.

### `title`

The title of your cheatsheet! Give it an informative name.

### `header`

These determine the `key` and `value` pairs for your cheatsheet table. You can have as many as you like — just remember to make sure each `row` has a corresponding `key`/`value` pair for each one in the header!

### `row`

Each object in the row is another addition to your cheatsheet. Give each one a unique `id` and a value for each `key` you defined in the `header`.

**NOTE:** At present, each sheetsheet needs to define its own `id`s for each element. These must be unique but are irrelevant to the user. In future, I will automate generation of this to simplify cheatsheet development.
