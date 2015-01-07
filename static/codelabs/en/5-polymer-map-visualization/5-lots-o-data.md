<toc-element></toc-element>

### Install the data

The data set is from the
[Fatality Analysis Reporting System](http://www.nhtsa.gov/FARS), provided by the
US National Highway Traffic Safety Administration. In it is every fatality
caused by a motor vehicle in the US in the last decade.

The dataset has been simplified and pre-compiled into JSON.

&rarr; Edit `bower.json` by adding `simplified-traffic-data` and `core-ajax` in the `dependencies`:

    "dependencies": {
      "polymer": "Polymer/polymer#master",
      "paper-elements": "Polymer/paper-elements#master",
      "google-map": "GoogleWebComponents/google-map#master",
      "point-overlay": "brendankenny/point-overlay#master",
      "simplified-traffic-data": "brendankenny/simplified-traffic-data#master",
      "core-ajax": "Polymer/core-ajax#master"
    }

&rarr; Right-click the `bower.json` filename in the editor and select
**Bower Update** from the dropdown.

**Note**: The JSON file is quite large, so it may take some time for the Chrome
Dev Editor to fetch it.

### Add the &lt;core-ajax> element

To load the data from file, we'll be using the `<core-ajax>` element.

&rarr; In `index.html`, add a new HTML Import for `<core-ajax>`:

    <head>
      ...
      <script src="bower_components/webcomponentsjs/webcomponents.js"></script>
      <link rel="import" href="bower_components/google-map/google-map.html">
      <link rel="import" href="bower_components/point-overlay/point-overlay.html">
      <link rel="import" href="bower_components/core-ajax/core-ajax.html">
    </head>

Next we'll load the JSON file. `<core-ajax>` has a host of
[useful properties and events](http://polymer.github.io/core-ajax/components/core-ajax/),
but we'll only need four:

- `url`, the file to load
- `handleAs`, which instructs `<core-ajax>` in how to handle the data it loads
- `response`, which will contain the downloaded data
- `auto`, which causes the element to start downloading the file immediately

The `<core-ajax>` element we need ends up looking like:

    <core-ajax
        url="bower_components/simplified-traffic-data/accidents.json"
        handleAs="json"
        response="{{data}}"
        auto>
    </core-ajax>

Notice we've bound the variable `data` to the `response` attribute, which will
be filled as soon as the data is loaded and parsed. To get the data to display,
`data` now needs to be bound to the `<point-overlay>` as well.

&rarr; Replace the hardcoded data on `<point-overlay>` you added in the last
step with `{{data}}`:

    <body>
      <template is="auto-binding">
        <google-map map="{{map}}" latitude="37.779" longitude="-122.3892" zoom="13"></google-map>
        <point-overlay map="{{map}}" data="{{data}}"></point-overlay>
        <core-ajax
            url="bower_components/simplified-traffic-data/accidents.json"
            handleAs="json"
            response="{{data}}"
            auto>
        </core-ajax>
      </template>

      <script src="main.js"></script>
    </body>

Although the data file is local, it is quite large, so it will take some time
for the JavaScript engine to parse it and load it into memory. That's fine for a
demo, but this can be ameliorated by moving to a different file format. Doing so
is outside the scope of this codelab, however.

<aside class="callout">
  <b>Data File Size</b>
  <p>Since JSON is typically UTF-8 today, you need at least a byte per
  character in the file size. Even a truncated number like `-122.3892` takes
  nine bytes, while the equivalent raw float would take only four, and then
  there's also the overhead of property names, brackets, and quotes. gzip helps
  immensely (especially with repeated property names), but depending on the
  data, gzip helps binary data too. There are also many less naive binary wire
  formats (e.g. Protocol Buffers) available that can help even more.</p>
</aside>

### Run the app

&rarr;  Hit the <img src="img/runbutton.png" class="icon"> button and see the
app run. It will take a few seconds for all of the data to load in.

<figure>
  <img src="img/s5-app.png">
  <figcaption>Our data plotted across a `google-map`</figcaption>
</figure>

### Summary

In this step, you learned how to:

- Use a `<core-ajax>` element to load JSON data
- Bind the response to `<point-overlay>` data attribute to draw many points
