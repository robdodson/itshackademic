<toc-element></toc-element>

We'll be using the [CanvasLayer](https://github.com/brendankenny/CanvasLayer)
library to draw data over the map, wrapped up in its own Polymer element
`<point-overlay>`. While the Maps API itself has a number of options for data
visualization built into it, CanvasLayer enables WebGL content to be drawn over
the map, allowing millions of items to be drawn on the screen in real time.

### Install the &lt;point-overlay> element

Once again, the Bower dance is needed to fetch the code.

&rarr; Edit `bower.json` by adding `point-overlay` in the `dependencies`:

    "dependencies": {
      "polymer": "Polymer/polymer#master",
      "core-elements": "Polymer/core-elements#master",
      "google-map": "PolymerLabs/google-map",
      "point-overlay": "brendankenny/point-overlay"
    }

<div class="stepbystep">
  <ul>
    <li>Right-click the `bower.json` filename in the editor.</li>
    <li>Run <b>Bower Update</b> from the dropdown.</li>
  </ul>
  <div>
    <img src="img/s2-bowerupdate.png" style="height:200px;">
  </div>
</div>

### Add a &lt;canvas-layer> element

&rarr; In `index.html`, add a new HTML Import for `<point-overlay>`:

    <head>
      ...
      <script src="bower_components/platform/platform.js"></script>
      <link rel="import" href="bower_components/google-map/google-map.html">
      <link rel="import" href="bower_components/point-overlay/point-overlay.html">
    </head>

In the last step, you wrote Javascript to access the `<google-map>` element's
underlying Maps object through its `map` property. The `<point-overlay>` element *also* has
a `map` property, but it doesn't provide a map, it needs one supplied to it. We
can bind the `<google-map>` element's `map` to the `<point-overlay>` element's map so they can share
the object.

Both `<google-map>` and `<point-overlay>` publish their `map` property as a
[published property](http://www.polymer-project.org/docs/polymer/polymer.html#published-properties).
This means that you can use `{{}}` bindings on the `map` **attributes** to bind
their `map` **properties** together.

<aside class="callout">
  <b>What are published properties?</b>
  <p><a href="http://www.polymer-project.org/docs/polymer/polymer.html#published-properties">Published properties</a>
  allow users to configure a property using an HTML attribute of the same name.
  Instead of setting a property in JS (e.g. 
  <code>myElement.foo = 'hi there'</code>), you can declare the attribute
  <code>&lt;my-element foo="hi there">&lt;/my-element></code>. Published
  properties are convenient to use because they support two-way data binding.
  </p>
</aside> 

&rarr; Wrap the existing `<google-map>` in `<template is="auto-binding">`.

<aside class="callout">
  <b>Data binding outside of Polymer</b>
  <p>Polymer supports
  <a href="http://www.polymer-project.org/docs/polymer/databinding.html">two-way
  data binding</a>. A useful way to use data binding is to wire elements
  together using their attributes. While this can all be done in JavaScript,
  declaratively defining how components will share data is sometimes clearer and
  more convenient.</p>
  <p>Polymer's data-binding features are only available when creating a
  <code>&lt;polymer-element></code>. However, Polymer provides a
  <a href="http://www.html5rocks.com/en/tutorials/webcomponents/customelements/#typeextension">type-extension</a>
  version of <code>&lt;template></code> named "auto-binding". It allows you to
  use <code>{{}}</code> bindings outside of an element.</p>
  <p>When code moves to production, it may make more sense to create a proper
  Polymer element that encapsulates all of the content, but
  <code>auto-binding</code> makes for a great prototyping and quick-iteration
  tool.
</aside> 

&rarr; Bind the `map` attribute of `<google-map>` to the `map` attribute of
`<point-overlay>`. Make sure this is done inside `<template is="auto-binding">`:

    <body>
      <template is="auto-binding">
        <google-map map="{{map}}" latitude="37.779" longitude="-122.3892" zoom="13"></google-map>
        <point-overlay map="{{map}}"></point-overlay>
        <script src="main.js"></script>
      </template>
    </body>

**Important**: notice that the `<script>` tag is inside the template. Since our
script operates on the `<google-map>` element directly, this is a convenient
way to make sure the script doesn't run until after the template is activated
and added to the DOM by Polymer.

### Draw a point

Finally, the `<point-overlay>` needs data to actually draw. We'll shortly bind
an entire dataset, but we can just as easily start with a single point.

`<point-overlay>` has a `data` property that we can feed data to. It expects an
array of objects, and it knows how to draw points for those objects when they 
have certain properties. The only required properties are `lat` and `lng`, the
point's latitude and longitude.

To get started, we can draw a single point by putting the center of the map into
an array:

    [
      {
        "lat": 37.779,
        "lng": -122.3892
      }
    ]

&rarr; Hardcode the point directly into the template. The `<point-overlay>` from
the previous step should now look like the following:

    <point-overlay map="{{map}}" data='[{"lat": 37.779, "lng": -122.3892}]'></point-overlay>

**Important**: note the single quotes around the `data` attribute's value so
that the double quotes in the value are parsed correctly.

Polymer helpfully notices that this is an array of objects, parses it using
`JSON.parse`, and passes it into the `<point-overlay>` instance.

### Run the app

Hit the <img src="img/runbutton.png" class="icon"> button and you should now
see the first point drawn by `<point-overlay>` over the map.

<figure>
  <img src="img/s4-map-first-point.png">
  <figcaption>index.html with a point</figcaption>
</figure>

### Summary

In this step, you learned how to:

- Bind Polymer elements inside an `auto-binding` template
- Connect a `<point-overlay>` with a `<google-map>` by binding their `map` properties
- Hardcode some data for `<point-overlay>` to draw

### Next

Drawing lots and lots of data
