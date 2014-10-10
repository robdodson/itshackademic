<toc-element></toc-element>

Polymer provides the `<google-map>` element
([github](https://github.com/GoogleWebComponents/google-map)) for rendering a Google
Map.  To use it, you first need to install it using Bower.

<aside class="callout">
  <b>What is Bower?</b>
  <p><a href="http://bower.io/">Bower</a> is a client-side package management
      tool that can be used with any web app. When working with Polymer, it
      simplifies the hassles of dependency management. Every component defines
      its own set of dependencies. When users install the component using Bower,
      its dependencies are installed alongside it under
      <code>bower_components/</code>.</p>
</aside>

### Install the &lt;google-map> element

Normally, you'd run `bower install GoogleWebComponents/google-map --save` on the
command-line to install `<google-map>`. However, the Chrome Dev Editor does not
have a command-line for running Bower commands. Instead, you need to manually
edit the `bower.json` to include `google-map`, then run the Chrome Dev Editor's
"Bower Update" feature. "Bower Update" checks the dependencies in `bower.json`
and installs any missing ones.

&rarr; Edit `bower.json` by adding `google-map` in the `dependencies`:

    "dependencies": {
      "polymer": "Polymer/polymer#master",
      "paper-elements": "Polymer/paper-elements#master",
      "google-map": "GoogleWebComponents/google-map#master"
    }

<div class="stepbystep">
  <ul>
    <li>Right-click the `bower.json` filename in the editor.</li>
    <li>Run <b>Bower Update</b> from the dropdown.</li>
  </ul>
  <div>
    <img src="img/s2-bowerupdate.png" style="height:250px;">
  </div>
</div>

The download may take few seconds. You can verify that `<google-map>` (and any
dependencies) were installed by checking that `bower_components/google-map/` was
created and populated.

### Use the &lt;google-map> element

To employ `<google-map>`, you need to:

1. Use an HTML Import to load it in `index.html`.
2. Declare an instance of the element on the page.

&rarr; Start editing `index.html`.

&rarr; In the `<head`> of `index.html`, **remove** all existing imports and **add the following line**, making sure it's after the import of `platform.js`:

    <link rel="import" href="bower_components/google-map/google-map.html">

When you're finished, the `<head>` of your document should look like this:

    <head>
      <title>VisualizationCodelab</title>

      <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0">
      <meta name="mobile-web-app-capable" content="yes">
      <meta name="apple-mobile-web-app-capable" content="yes">

      <script src="bower_components/platform/platform.js"></script>
      
      <link rel="import" href="bower_components/google-map/google-map.html">

      <link rel="stylesheet" href="styles.css">
    </head>

&rarr; Remove the contents of `<body>` and declare a `<google-map>` element.
Leave the default `main.js` script, as the file will be needed later.

    <body unresolved>
      <google-map latitude="37.779" longitude="-122.3892" zoom="13"></google-map>
      <script src="main.js"></script>
    </body>

As you can see, using `<google-map>` is completely declarative! The map is
centered using the `latitude` and `longitude` attributes and its zoom level is
set by the `zoom` attribute. 

&rarr; Empty `main.js`. The example script will just cause an error.

#### Give the map a size

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

### Run the app

If you haven't already done so, hit the
<img src="img/runbutton.png" class="icon"> button. At this point, you should see a map that takes up the entire viewport.

<figure>
  <img src="img/s2-maptab.png">
  <figcaption>index.html with the map</figcaption>
</figure>

### Summary

In this step, you learned how to:

- Install the `<google-map>` element using Bower
- Use the element
- Style a custom element using CSS

### Next

Change the styling of the map to make the data stand out.
