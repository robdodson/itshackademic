<toc-element></toc-element>

The `<google-map-directions>` element was installed with `<google-map>`. It provides driving direction information using the Google Maps API.

### Use the &lt;google-map-directions> element

To employ `<google-map-directions>`:

1. Use an HTML Import to load it in `index.html`.
2. Declare an instance of the element on the page.
3. "Connect" it to the map.

&rarr; In `index.html`, add an HTML Import for `google-map-directions.html`:

    <head>
      ...
      <link rel="import"
            href="bower_components/google-map/google-map-directions.html">
    </head>

&rarr; Declare `<google-map-directions>`. Set its `startAddress` attribute to
**"San Francisco"** and the `endAddress` to **"Mountain View"**.

    <body>
      <google-map latitude="37.779" longitude="-122.3892" disableDefaultUI>
        ...
      </google-map>
      <google-map-directions startAddress="San Francisco"
                             endAddress="Mountain View">
      </google-map-directions>
    </body>

### Hook up directions to the map

`<google-map-directions>` fetches directions, but it isn't that useful by itself. You need to connect `<google-map-directions>` to `<google-map>` so the directions render on the map.

Both elements expose a `.map` property that allow users to access/set an underlying `Map` object (used by the Google Maps JavaScript API). To get these two elements talking, set them to use the same `Map` object.

&rarr; In `main.js`, set the directions element to use the same `Map` object:

      var gMap = document.querySelector('google-map');
      gMap.addEventListener('api-load', function(e) {
        document.querySelector('google-map-directions').map = this.map;
      });

**Note**: Waiting until the map element fires its `api-load` event ensures that
the map has been loaded.

&rarr; In `index.html`, make sure `main.js` is included as the last script on the page:

    <body unresolved>
      ...
      <google-map-directions startAddress="San Francisco"
                             endAddress="Mountain View">
      </google-map-directions>
      <script src="main.js"></script>
    </body>

<aside class="callout">
  <b>Wait...you said no code!</b>
  <p>OK, so there was a little JavaScript :) This step illustrated how you can configure an element using its events and properties. In the next step, you'll remove the code in favor of Polymer's declarative data binding features.</p>
</aside>

### Run the app

Hit the <img src="img/runbutton.png" class="icon"> button! At this point, you
should see the map, a marker, and added driving directions between **San
Francisco** and **Mountain View**.

<figure>
  <img src="img/s3-directionstab.png">
  <figcaption>Map with driving directions</figcaption>
</figure>

### Summary

In this step, you learned how to:

- Use `<google-map-directions>` to add driving directions to a map
- "Connect" elements using their attributes and properties.

### Next up

Learn Polymer's data-binding features and allow users to input their own start
and end addresses.
