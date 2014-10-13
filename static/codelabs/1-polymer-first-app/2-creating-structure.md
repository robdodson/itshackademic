<toc-element></toc-element>

In this step, you'll use some pre-built Polymer elements to create the basic application structure, with a toolbar and tabs.

In this step, you'll learn about:

-   Using HTML imports.
-   Using Polymer elements with standard HTML, CSS and JavaScript.

<div class="yt-embed">
  <google-youtube
    videoid="QoarDun5arg"
    width="16"
    height="9"
    rel="0"
    autoplay="0"
    fluid>
  </google-youtube>
</div>

### Import dependencies

Go to the `starter` directory and open the `index.html` file. The starting file looks like this:

```side-by-side
<!doctype html>
<html>

<head>

  <title>unquote</title>

  <meta name="viewport"
  content="width=device-width, minimum-scale=1.0, initial-scale=1.0, user-scalable=yes">
  
  <link rel="stylesheet" href="app.css">
  
  <script src="../components/platform/platform.js">
  </script>
  
  <link rel="import"
    href="../components/font-roboto/roboto.html">
  ...
```

<ul class="side-by-side">
  <li>This bare-bones file defines some styles and embeds the <code>platform.js</code> script, which supplies any missing Web Components features.</li>
  <li>The <code>link rel="import"</code> element is an <em>HTML import</em>, a new way of including resources into an HTML file.</li>
</ul>

<aside class="callout">
  <b>Note:</b>

<p>The `font-roboto` import loads the `RobotoDraft` font using the 
[Google Fonts API](https://developers.google.com/fonts/). If you're working
offline or cannot access the Google Fonts API for any reason, this can block
rendering of the web page. If you experience this problem, comment out the 
import for `font-roboto`.</p>
</aside>

At the end of the file you'll find something new:

```side-by-side
<body unresolved>

  <script src="app.js"></script>
</body>
```

<ul class="side-by-side">
  <li>The <code>unresolved</code> attribute on the <code>&lt;body></code> element is used to prevent a flash of unstyled content 
      (FOUC) on browsers that lack native support for custom elements. For details, see the 
      <a href="//polymer-project.org/docs/polymer/styling.html#fouc-prevention">Polymer styling reference</a>.</li>
</ul>

<hr>

OK, time to write some code!

<div class="yt-embed">
  <google-youtube
    videoid="-TwIxg39szQ"
    width="16"
    height="9"
    rel="0"
    autoplay="0"
    fluid>
  </google-youtube>
</div>

&rarr; Add HTML import links to import the `<core-header-panel>`, `<core-toolbar>`, and `<paper-tabs>` elements:

```side-by-side
<script src="../components/platform/platform.js">
</script>

<link rel="import" 
  href="../components/font-roboto/roboto.html">

<!-- Add your imports here, like so: -->
<link rel="import"
  href="../components/core-header-panel/core-header-panel.html">
<link rel="import"
  href="../components/core-toolbar/core-toolbar.html">
<link rel="import"
  href="../components/paper-tabs/paper-tabs.html">
```

<ul class="side-by-side">
  <li>Polymer uses <a href="//polymer-project.org/platform/html-imports.html">HTML imports</a> to load components. HTML imports provide dependency management, ensuring that your elements and all of their dependencies are loaded before you use them.</li>
</ul>

<hr>

### Add a toolbar

<div class="stepbystep">
  <ul>
    <li>
      Add the following code inside the `<body>` tag.
    </li>
  </ul>
</div>

```side-by-side
<core-header-panel>

  <core-toolbar>
  </core-toolbar>

  <!-- main page content will go here --> 

</core-header-panel>
```

<ul class="side-by-side">
  <li>The 
      <code><a href="//polymer-project.org/docs/elements/core-elements.html#core-header-panel">&lt;core-header-panel&gt;</a></code> 
      element is a simple container that holds a 
      header (in this case a <code>&lt;core-toolbar></code> element), and some content. By 
      default, the header stays at the top of the screen, but it can also be 
      set to scroll with the content.</li>
  <li>The <code><a href="//polymer-project.org/docs/elements/core-elements.html#core-toolbar">&lt;core-toolbar></a></code> element serves 
      as a container for tabs, menu buttons, and other controls.</li>
</ul>

If you try to hit the <img src="img/runbutton.png"
class="icon"> button now to preview the app the page will be blank. That's because `<core-header-panel>` always needs to have a height set on it explicitly. An easy way to go about this is to use [layout attributes](//polymer-project.org/docs/polymer/layout-attrs.html).

<div class="stepbystep">
  <ul>
    <li>
      Add `fullbleed`, `layout`, and `vertical` attributes to the `<body>`
    </li>
    <li>
      Add a `flex` attribute to the `<core-header-panel>`.
    </li>
  </ul>
</div>

Your code should look like this:

```side-by-side
<body unresolved fullbleed layout vertical>
  <core-header-panel flex>
  
    <core-toolbar>
    </core-toolbar>
  
    <!-- main page content will go here --> 
  
  </core-header-panel>

  <script src="app.js"></script>
</body>
```

<ul class="side-by-side">
  <li>The <code>fullbleed</code> attribute will cause the <code>&lt;body></code> to completely fill the viewport, removing all margin and padding around the edges.</li>
  <li>
    When a container includes the <code>layout</code> attribute, it can become a flex container. You can specify <code>horizontal</code> or <code>vertical</code> to change the orientation
  </li>
  <li>
  Children of an element using the <code>layout</code> attribute can use <code>flex</code> attributes to control their own sizing. The <code>flex</code> attribute tells the child to take up as much space as it possibly can.
  </li>
</ul>

Hit <img src="img/runbutton.png" class="icon"> again, or refresh the page, and you should see a grey toolbar on the screen. Nice!

<figure>
  <img src="img/s2-header-panel.png">
  <figcaption>Our first `<core-header-panel>`</figcaption>
</figure>

<hr>

#### Add the tabs

<div class="yt-embed">
  <google-youtube
    videoid="ffwXhCvThCk"
    width="16"
    height="9"
    rel="0"
    autoplay="0"
    fluid>
  </google-youtube>
</div>

The application will use tabs for navigating between two different views,
a list of all messages and a list of favorites. The 
<code><a href="//polymer-project.org/docs/elements/paper-elements.html#paper-tabs">&lt;paper-tabs&gt;</a></code>
element works much like a `<select>` element, but it's styled as a set of
tabs. We'll use layout attributes again to position our tabs inside of the `<core-toolbar>`.

&rarr; Add the following `<paper-tabs>` code

```side-by-side
<core-toolbar>

  <!-- Add the following code -->
  <paper-tabs selected="messages" flex>
    <paper-tab name="messages">Messages</paper-tab>
    <paper-tab name="favorites">Favorites</paper-tab>
  </paper-tabs>

</core-toolbar>
```

<ul class="side-by-side">
  <li>
    <code>&lt;paper-tabs></code> identifies the selected child by its name
    value or its index value.
  </li>
  <li>
    <code>selected="messages"</code> chooses the first tab as the initially selected tab.
  </li>
  <li>
    In this case, the children are <code>&lt;paper-tab></code> elements, which provide styling and the "ink ripple" animation when you touch a tab.
  </li>
  <li>
    `<core-toolbar>` positions its children using flexbox so we can use a `flex` attribute to tell the `<paper-tabs>` to take up as much space as they can.
  </li>
</ul>

If you refresh the page, you'll notice the tabs are sitting in the middle of the toolbar. To "pin" our tabs to the bottom of the toolbar, we can give them a <code>fit</code> class.

&rarr; Add a `fit` class to the `<paper-tabs>` element

```side-by-side
<paper-tabs class="fit" selected="messages" flex>
  <paper-tab name="messages">Messages</paper-tab>
  <paper-tab name="favorites">Favorites</paper-tab>
</paper-tabs>
```

<ul class="side-by-side">
  <li>Aside from `fit`, the `<core-toolbar>` has a number of built-in classes for rearranging its children. See <a href="http://www.polymer-project.org/docs/elements/core-elements.html#core-toolbar">the `<core-toolbar>` docs for reference</a>.</li>
</ul>

Hit <img src="img/runbutton.png" class="icon"> again, or refresh the page, and your tabs should now be sitting on the bottom of the toolbar.

<figure>
  <img src="img/s2-paper-tabs.png">
  <figcaption>`<paper-tabs>`, looking good!</figcaption>
</figure>

<hr>

#### Add styles for the new elements

<div class="stepbystep">
  <ul>
    <li>
      Open `app.css` and find the line that says `/* Add your styles here! */`.
    </li>
    <li>
      Add the following CSS rules
    </li>
  </ul>
</div>

```
/* Add your styles here! */
core-toolbar {
  background: #03a9f4;
  color: white;
}
paper-tabs {
  text-transform: uppercase;
}
```

&rarr; Open `app.js` and add the following code to handle the tab switching event.

```side-by-side
var tabs = document.querySelector('paper-tabs');

tabs.addEventListener('core-select', function() {
  console.log("Selected: " + tabs.selected);
});
```

<ul class="side-by-side">
  <li>
    The <code>&lt;paper-tabs></code> element fires a <code>core-select</code> event when you select a 
    tab. You can interact with the element just like a built-in element.
  </li> 
  <li>
    Right now there's nothing to switch; you'll finish hooking it up later.
  </li>
</ul>


### Run the app

If you haven't already done so, hit the <img src="img/runbutton.png"
class="icon"> button. You have a Polymer app!

<figure>
  <img src="img/s2-app.png">
</figure>

<aside class="callout">
  <b>Note:</b>

  <p>If you have the console open, you'll notice that you get two `core-select` 
events each time you switch tabs &mdash; one for the previously-selected tab and one 
for the newly-selected tab. The `<paper-tabs>` element inherits this behavior from 
<code><a href="//polymer-project.org/docs/elements/core-elements.html#core-selector">&lt;core-selector&gt;</a></code>, which supports
both single and multiple selections.</p>
</aside>

If something isn't working, check your work against the files in the `step-2` folder:

-   [`index.html`](https://github.com/robdodson/its-hackademic/blob/master/static/codelabs/1-polymer-first-app/PolymerApp/step-2/index.html)
-   [`app.css`](https://github.com/robdodson/its-hackademic/blob/master/static/codelabs/1-polymer-first-app/PolymerApp/step-2/app.css)
-   [`app.js`](https://github.com/robdodson/its-hackademic/blob/master/static/codelabs/1-polymer-first-app/PolymerApp/step-2/app.js)

### Summary

In this step, you learned how to:

- Use HTML imports to import custom elements
- Use custom elements to create a simple app layout
- Style a custom element using CSS

<aside class="callout">
  <b>Explore:</b>

  <p>Can you use other children inside the `<paper-tabs>`? Try an image or a text span.</p>
</aside>

### Next up

Creating your own element.
