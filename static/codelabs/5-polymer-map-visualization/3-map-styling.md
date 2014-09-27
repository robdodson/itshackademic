<toc-element></toc-element>

The default style of Google Maps is designed to ease navigation, but that means
it's not always the best backdrop for data on top of it. Luckily there's an API
specifically for customizing the style of our map.

### Accessing the raw Maps API

The `<google-map>` element can do many things, but it only exposes a subset of
[the total Maps API](https://developers.google.com/maps/documentation/javascript/reference).
However, it also offers a way of easily accessing the underlying JavaScript
objects so that we can do what we wish with it.

The map is loaded asynchronously, though, so any code that will access it will
need to run *after* the map has finished loading. The `<google-map>` element
fires an event when it has loaded that we can use to make sure this happens.

&rarr; Open `main.js` and fill it with the following:

    var mapElement = document.querySelector('google-map');
    mapElement.addEventListener('google-map-ready', mapLoaded);

    function mapLoaded(e) {
      var map = this.map;
      console.log('current zoom: ' + map.getZoom());
    }

This code adds an event listener to the `<google-map>` element. Then, when that
element has finished loading the Maps API, the `google-map-ready` event is
fired and `mapLoaded` is called, and we can access its `map` property, which is
the same [Map object](https://developers.google.com/maps/documentation/javascript/reference#Map)
you'd get if you initialized the Maps API yourself in pure JavaScript.

If you'd like, hit the <img src="img/runbutton.png" class="icon"> button again.
If everything is working, you should see the same map as before, but your code
will write a `current zoom: 13` to the JavaScript console.

### Styling the map

The Google Maps API has an extensive [styling API](https://developers.google.com/maps/documentation/javascript/styling),
allowing you to specify the colors and weights of features as common as country
borders or as specific as toll highways.

For this codelab, we're going to keep things simple. The following style
maintains all the colors of the default style, but almost entirely desaturates
them. Map features will still be quickly recognizable to people familiar with
Google Maps, but the data we draw on top of the map will stand out clearly.
This style also reduces the lightness of the water to keep it from overwhelming
the view.

&rarr; Update the `mapLoaded` function so that it sets a map style:

    function mapLoaded(e) {
      var map = this.map;
      map.setOptions({
        styles: [
          {
            // set all features to 15% of the saturation of their default color
            stylers: [{saturation: -85}]
          }, {
            // in addition, lower the lightness of water specifically
            featureType: "water",
            elementType: "geometry",
            stylers: [{lightness: -20}]
          }
        ]
      });
    }

### Run the app

Hit the run button again, and you should be greeted by a desaturated map.

<figure>
  <img src="img/s3-map-desaturate.png">
  <figcaption>index.html with a desaturated map</figcaption>
</figure>

<aside class="callout">
  <b>Styled Maps</b>
  <p>Of course, desaturation and lightness aren't the only options available
  for styling, and you certainly don't need to memorize all the available
  options to use them. The [Google Maps API Styled Maps Wizard](http://gmaps-samples-v3.googlecode.com/svn/trunk/styledmaps/wizard/index.html)
  lets you explore and create styles interactively. If you want to make your
  own style, click through and create one, then just hit the `Show JSON` button
  and copy the results in place of the style used above.</p>
</aside>

### Summary

In this step, you learned how to:

- Add JavaScript functions triggered by Polymer events
- Dig into the `<google-map>` element to get at the raw Maps API
- Set a custom map style

### Next

Add a data overlay to the map and finally visualize something.