<toc-element></toc-element>

Now that you have a basic application structure, you can start building a card element to display a post. The finished card includes space for a profile picture, name, favorite button, and a content area.

<div layout vertical center>
  <img class="sample" src="img/s3-card.png" style="border: 1px solid #ccc;">
</div>

In this step, you'll create a `<post-card>` element that controls the layout and styling of its children, so you can create a card like the one above using simple markup like this:
 
    <post-card>
      <img src="profile-picture.png">
      <h2>A. Developer</h2>
      <p>Something really profound about code.</p>
    </post-card>

In this step, you'll learn about:

-   Creating a custom element using Polymer.
-   Working with shadow DOM.

<aside class="callout">
  <b>Learn more:</b>

  <p>Shadow DOM provides you a way to add a local DOM tree
  inside a DOM element, with local styles and markup that are decoupled from the rest of the web page.</p>
  <p>To learn more about shadow DOM, see the <a href="//polymer-project.org/platform/shadow-dom.html">
  Shadow DOM polyfill docs</a>.</p>
</aside>

### Create a `<post-card>` element

<div class="yt-embed">
  <google-youtube
    videoid="HVDsd-7SDOI"
    width="16"
    height="9"
    rel="0"
    autoplay="0"
    fluid>
  </google-youtube>
</div>

Open `post-card.html` in your editor. This file contains the skeleton of a custom element, starting with some imports:

```side-by-side
<link rel="import" 
  href="../components/polymer/polymer.html">
<link rel="import" 
  href="../components/core-icon-button/core-icon-button.html">
...
```

<ul class="side-by-side">
  <li>As in the previous step, <code>&lt;link rel="import"&gt;</code> is used to import elements the <code>post-card</code> element relies on.</li>
</ul>

Next is the definition of the element itself:

```side-by-side
<polymer-element name="post-card">
  <template>
    <style>
    :host {
      display: block;
      position: relative;
      background-color: white;
      padding: 20px;
      width: 100%;
      font-size: 1.2rem;
      font-weight: 300;
    }
    .card-header {
      margin-bottom: 10px;
    }
    </style>

    <!-- CARD CONTENTS GO HERE -->
  </template>
  ...
```

<ul class="side-by-side">
  <li>The <code>&lt;polymer-element&gt;</code> element is how you define a new custom element in Polymer. In this case, you're creating an element called
  "post-card".</li>
<li>The <code>&lt;template&gt;</code> defines the element's internal DOM structure, or <em>shadow DOM</em>. This is where 
    you'll add markup for your custom element.</li>
<li>Used inside a shadow DOM tree, the <code>:host</code> pseudo-class matches the element that <em>hosts</em> 
    the tree. In this case, it matches the <code>&lt;post-card&gt;</code> element.</li>
<li>Ordinary selectors used inside the shadow DOM are 
    <em>scoped</em> to the shadow DOM. The <code>.card-header</code> here only matches elements in this element's shadow DOM.</li>
</ul>

<aside class="callout">
  <b>Note:</b>

  <p>The `<polymer-element>` tag can include only one `<template>` tag as a _direct_ descendant.
This tag defines the shadow DOM for the element. Other `<template>` tags may be nested inside the outer
template tag.</p>
</aside>

At the end of the element definition is a `<script>` tag:

```side-by-side
  <script>
  Polymer({
    // properties and methods for the element go here
  });
  </script>
</polymer-element>
```

<ul class="side-by-side">
<li>The <code>Polymer</code> call at the end of the file <em>registers</em> the element so it's recognized by the browser. You'll do more with this in a later step as well.</li>
</ul>

<aside class="callout">
  <b>Note:</b>

  <p>
    It is a common best practice to keep your styles and scripts in external files, so you might be looking at this example and wondering why it uses `<style>` and `<script>` tags intead.
  </p>
  <p>
    Because the Shadow DOM scopes CSS to the element instance, it can be convenient to see it in the same file as the rest of the markup. Likewise,
    the JavaScript in this example is only for the element's prototype. It is by no means required that you use `<style>` and `<script>` tags, and if you prefer using external files you may do so. The approach taken in this tutorial is merely as a convenience.
  </p>
</aside>

<hr>

#### Create the card structure.

<div class="yt-embed">
  <google-youtube
    videoid="wZ1dNGRdA5E"
    width="16"
    height="9"
    rel="0"
    autoplay="0"
    fluid>
  </google-youtube>
</div>

When you create an instance of <code>&lt;post-card&gt;</code>, the contents from its shadow DOM <code>&lt;template&gt;</code> are inserted as the element's <em>shadow root</em>. These elements are rendered in the browser, but are not included in the element's <code>children</code> collection.

By default, any children added by the user don't render. For example:
<pre>&lt;post-card&gt;&lt;h3&gt;Hello!&lt;/h3&gt;&lt;/post-card&gt;</pre>

Creates a <code>&lt;post-card&gt;</code> with a single <code>&lt;h3&gt;</code> element as a child.
To render the <code>&lt;h3&gt;</code> inside your <code>&lt;post-card&gt;</code>, you need to add an
<em>insertion point</em>, which tells the browser where to render children in
the shadow DOM tree.

&rarr; Find the `CARD CONTENTS GO HERE` comment and replace it with the `<div>` and
`<content>` tags shown below.

```side-by-side
<!-- Add the following code: -->
<div class="card-header" layout horizontal center>
  <content select="img"></content>
  <content select="h2"></content>
</div>
<content></content>
```

<ul class="side-by-side">
  <li>`layout horizontal center` creates a flexbox layout with children arranged horizontally, and centered vertically.</li>
  <li>The three <code>&lt;content&gt;</code> elements create <em>insertion points</em>. <br />
(The shadow DOM spec calls this process of selecting nodes
<em>distribution</em>).</li>
  <li>Any <code>&lt;img&gt;</code> children match the first <code>&lt;content&gt;</code> tag and are inserted
here.</li>
  <li>The second <code>&lt;content&gt;</code> tag selects any <code>h2</code> children.</li>
  <li>The final <code>&lt;content&gt;</code> tag, with no <code>select</code> attribute, selects any
nodes that haven't already been inserted. (This is probably the most
common form of <code>&lt;content&gt;</code> element.)</li>
</ul>

<aside class="callout">
  <b>Selecting content:</b>

  <p>The `select` attribute on a `content` element accepts a [limited set of 
CSS selectors](http://w3c.github.io/webcomponents/spec/shadow/#satisfying-matching-criteria). 
You can only select direct children of the host node, not descendents.</p>
</aside>

<hr>

#### Style the imported content.

There are a number of new CSS selectors to work with. The `post-card.html` 
file already includes a `:host` selector, discussed earlier, to style the 
top-level `<post-card>` element. 

To style the children added using the `<content>` element, add the 
following CSS inside the `<style>` tag after the existing rules:

```side-by-side
.card-header {
  margin-bottom: 10px;
}
/* Add your styles here: */
.card-header ::content h2 {
  margin: 0;
  font-size: 1.8rem;
  font-weight: 300;
}
.card-header ::content img {
  width: 70px;
  border-radius: 50%;
  margin: 10px;
}
</style>
```

<ul class="side-by-side">
  <li>The <code>::content</code> pseudo element selects an insertion point (created by 
  a <code>&lt;content&gt;</code> tag).  
  Here, <code>::content h2</code> selects any <code>h2</code> that's distributed through an
  insertion point.</li>
</ul>

<aside class="callout">
  <b>Note:</b>

  <p>You can't style the insertion point itself, so the 
<code>::content</code> pseudo element is always used with a descendent selector.</p>
</aside>

### Import `<post-card>` into your app

<div class="stepbystep">
  <ul>
    <li>Save the `post-card.html` file and open `index.html` in your editor.</li>
    <li>Add the import for `post-card.html` after your existing imports:</li>
  </ul>
</div>

```side-by-side
<link rel="import"
  href="../components/paper-tabs/paper-tabs.html">
<!-- Add the following import: -->
<link rel="import" href="post-card.html">
```

<ul class="side-by-side">
  <li>This makes the <code>&lt;post-card&gt;</code> element available for use in <code>index.html</code>.</li>
</ul>

<hr>

&rarr; Add a `<post-card>` element to `index.html` directly after the `<core-toolbar>` element:

```side-by-side
<!-- Add the following code: -->
<div class="container" layout vertical center>

  <post-card>
    <img width="70" height="70" 
      src="../images/avatar-07.svg">
    <h2>Another Developer</h2>
    <p>I'm composing with shadow DOM!</p>
  </post-card>
  
</div>
```

<ul class="side-by-side">
  <li>The child elements you specify here are <em>distributed</em> into the 
      <code>&lt;post-card&gt;</code> element's insertion points.</li>
</ul>

### Run the app

Make sure you have `index.html` open, then hit the <img src="img/runbutton.png" class="icon"> button! Your application should now look like this:

<div layout vertical center>
  <img class="sample" src="img/s3-app.png">
</div>

The card still needs a favorite button, but it's starting to take shape. 

If something isn't working, check your work against the files in the `step-3` folder:

-   [`post-card.html`](https://github.com/robdodson/its-hackademic/blob/master/static/codelabs/1-polymer-first-app/PolymerApp/step-3/post-card.html)
-   [`index.html`](https://github.com/robdodson/its-hackademic/blob/master/static/codelabs/1-polymer-first-app/PolymerApp/step-3/index.html)

<aside class="callout">
  <b>Explore:</b>

  <p>Play around with the insertion points to get a feeling for how 
they work. Does anything change if you reorder the `<post-card>`'s children in 
`index.html`? What if you include multiple images, or add plain text? You can 
also try swapping the two `select=` attributes in `post-card.html`.</p>
</aside>

### Summary

In this step, you learned how to:

- Create a custom element using Polymer
- Work with shadow DOM

### Next up

Using Data Binding
