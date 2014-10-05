<toc-element></toc-element>

Polymer provides the `<google-map>` element ([github](https://github.com/PolymerLabs/google-map)) for rendering a Google Map.  To use it, you first need to install it using Bower.

<aside class="callout">
  <b>What is Bower?</b>

  <p><a href="http://bower.io/">Bower</a> is a client-side package management
    tool that can be used with any web app. When working with Polymer, it
    simplifies the hassles of dependency management. Every component defines
    its own set of dependencies. When you use Bower to install a component,
    the component's dependencies are installed alongside it under
    <code>bower_components/</code>.</p>

</aside>

### Install the &lt;google-map> element

Normally, you'd run `bower install PolymerLabs/google-map --save` on the
command line to install `<google-map>`. However, Chrome Dev Editor does
not have a command line for running Bower commands. Instead, you need to
manually edit `bower.json` to include `google-map`, then run Chrome Dev
Editor's **Bower Update** feature. **Bower Update** checks the dependencies in
`bower.json` and installs any missing ones.

<!-- <aside class="callout">
  <p><b>Pro tip</b>: the <code>--save</code> option appends the item to the <code>dependencies</code> section in <code>bower.json</code>.</p>
</aside> -->

&rarr; Edit `bower.json` and add `google-map` to the `dependencies` object:

    "dependencies": {
      "polymer": "Polymer/polymer#master",
      "paper-elements": "Polymer/paper-elements#master",
      "google-map": "GoogleWebComponents/google-map#master"
    }

<div class="stepbystep">
  <ul>
    <li>Right-click the `bower.json` filename in the editor.</li>
    <li>Select <b>Bower Update</b> from the context menu.</li>
  </ul>
  <div>
    <img src="img/s2-bowerupdate.png" style="height:200px;">
  </div>
</div>

The download may take a few seconds. You can verify that `<google-map>` (and any
dependencies) were installed by checking that `bower_components/google-map/` was
created and populated.

### Use the &lt;google-map> element

To employ `<google-map>`, you need to:

1. Use an HTML Import to load it in `index.html`.
2. Declare an instance of the element on the page.

&rarr; In `index.html`, add an
[HTML Import](http://www.polymer-project.org/platform/html-imports.html) in the
`<head>` that loads `google-map.html`. 

**Important**: all imports need to come after `platform.js` so the polyfill can
properly load them.

    <head>
      ...
      <script src="bower_components/platform/platform.js"></script>
      <link rel="import" href="bower_components/google-map/google-map.html">
    </head>

<aside class="callout">
  <b>Note:</b>
  <p>The project scaffold will already contain a number of HTML Imports in the `<head>`. You may remove these if they get in your way, they're just there to give the scaffold something to display and are not required for this tutorial.</p>
</aside>

&rarr; Remove the contents of `<body>` and declare a `<google-map>` element:

    <body>
      <google-map latitude="37.779" longitude="-122.3892" zoom="13"></google-map>
    </body>

As you can see, using `<google-map>` is completely declarative! The map is
centered using the `latitude` and `longitude` attributes and its zoom level is
set by the `zoom` attribute.

#### Style the map

If you run the app right now, nothing will display. In order for the map to
properly display itself, you need to set it to `display: block` and give it a
`height` in CSS.

&rarr; Open `styles.css` and replace its contents with default styling:

    body, html {
      font-family: 'Roboto', Arial, sans-serif;
      height: 100%;
      margin: 0;
    }
    google-map {
      display: block;
      height: 100%;
    }

#### Add a marker

`<google-map>` supports markers by declaring `<google-map-marker>` elements as children.
The maker locations are also set using `latitude` and `longitude` attributes.

&rarr; Back in `index.html`, add `<google-map-marker>` to the map:

    <google-map
        latitude="37.779"
        longitude="-122.3892"
        disableDefaultUI>
      <google-map-marker
          latitude="37.779"
          longitude="-122.3892"
          title="Go Giants!"
          draggable="true"></google-map-marker>
    </google-map>

### Run the app

If you haven't already done so, hit the <img src="img/runbutton.png"
class="icon"> button. At this point, you should see a map that takes up the
entire viewport and a single pin.

<figure>
  <img src="img/s2-maptab.png">
  <figcaption>index.html with the map and marker</figcaption>
</figure>

### Summary

In this step, you learned how to:

- Install the `<google-map>` element using Bower
-  Use the element and declaratively place a marker
- Style a custom element using CSS

### Next up

Add driving directions.
