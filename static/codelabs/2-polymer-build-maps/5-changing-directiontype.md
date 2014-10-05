<toc-element></toc-element>

### Import the components for this setup

&rarr; In `index.html`, add the following HTML Imports to the `<head>`:

    <link rel="import" href="bower_components/core-icons/maps-icons.html">
    <link rel="import" href="bower_components/core-item/core-item.html">
    <link rel="import" href="bower_components/core-selector/core-selector.html">

`maps-icons.html` is required to load the
[map iconset](http://www.polymer-project.org/components/core-icons/demo.html).
You'll use it later to render icons for the travel modes.

### Use core-item and core-selector

[`<core-item>`](http://www.polymer-project.org/components/core-docs/index.html#core-item)
is a simple line-item object that supports an icon and label. Its `icon`
attribute takes the form `<iconset>:<name>`. For example, the following code
places the `directions-car` icon from the `maps` icon set next to the text
`DRIVING`:

    <core-item icon="maps:directions-car" label="DRIVING"></core-item>

The `<google-map-directions>` element publishes a `travelMode` property for
specifying the type of directions to render. It has four possible values:
`"DRIVING"`, `"WALKING"`, `"BICYCLING"`, and `"TRANSIT"`.

[`<core-selector>`](http://www.polymer-project.org/components/core-docs/index.html#core-selector)
is a general purpose component for selecting an item from a list. You'll use it
to select a `<core-item>` travel mode for the directions.

&rarr; In the `<div id="inputs">` container, add a `<core-selector>` with the travel mode options:

    <div id="inputs">
      ...
        <core-selector selected="0" layout horizontal>
          <core-item icon="maps:directions-car" label="DRIVING"></core-item>
          <core-item icon="maps:directions-walk" label="WALKING"></core-item>
          <core-item icon="maps:directions-bike" label="BICYCLING"></core-item>
          <core-item icon="maps:directions-transit"
              label="TRANSIT"></core-item>
       </core-selector>
    </div>

**Notes**

- `layout` and `horizontal` are part of
[Polymer's CSS layout system](https://www.polymer-project.org/docs/polymer/layout-attrs.html).
They provide flexbox support.
- `selected="0"` selects the first item, but you can specify a different default
if necessary.

### Style the selector

By default, `<core-selector>` is not styled.

&rarr; In `styles.css`, add the following default styles for each element:

    core-selector {
      background: #eee;
      font-size: 12px;
      margin-top: 5px;
    }

    core-item {
      padding: 3px 10px 3px 3px;
      cursor: pointer !important;
    }

    /* Note: <core-selector> applies the core-selected CSS class
             to the selected item. */
    core-item.core-selected {
      background: rgb(66, 133, 244);
      color: white;
      fill: white;
    }

<figure>
  <img src="img/s5-tabs.png">
  <figcaption>Travel mode selector with styling</figcaption>
</figure>

### Data-bind the travel mode selector &#8596; directions element

The last thing you need to do is data-bind the `travelMode` attribute of
`<google-map-directions>` to the `<core-selector>` node's `.selectedItem`
attribute. When a new item is chosen, `<core-selector>` updates this property to
the item that was selected.

&rarr; Bind the direction's `travelMode` attribute to the selector's
`.selectedItem`. Since `.selectedItem` returns a node, you need to bind
`travelMode` to its `.label` property:

    <google-map-directions map="{{map}}"
                           startAddress="{{start}}" endAddress="{{end}}"
                           travelMode="{{travelMode.label}}">
    </google-map-directions>

    ...

    <core-selector ... selectedItem="{{travelMode}}">
      ...
    </core-selector>

### Run the app

&rarr; Hit the <img src="img/runbutton.png" class="icon"> button.

&rarr; Enter **San Francisco, CA** for the start address.

&rarr; Enter **Oakland, CA** for an end address.

&rarr; Click the different modes of travel.

The map should automatically update to show different forms of travel:

<figure>
  <img src="img/s5-final.png">
  <figcaption>Directions with travel mode selector</figcaption>
</figure>

### Summary

In this step, you learned how to:

- Use the `<core-selector>` and `<core-item>` elements.
- Use Polymer's icon set.
- Use use Polymer's two-way data-binding to set the travel mode.
