<toc-element></toc-element>

## Step 1: Creating the app structure

In this step, you'll use some pre-built Polymer elements to create the basic application structure, with a toolbar and tabs.

In this step, you'll learn about:

-   Using HTML imports.
-   Using Polymer elements with standard HTML, CSS and JavaScript.

### Edit index.html

Go to the `starter` directory and open the `index.html` file. The starting file looks like this:

    <!doctype html>
    <html>

    <head>

      <title>unquote</title>

      <meta name="viewport" 
        content="width=device-width, minimum-scale=1.0, initial-scale=1.0, user-scalable=yes">

      <script src="../components/platform/platform.js">
      </script>

      <link rel="import" 
        href="../components/font-roboto/roboto.html">
      ...

<ul>
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

Skipping over the styles for now, at the end of the file you'll find something new:

    ...
    <body unresolved>

    </body>
    ...

The <code>unresolved</code> attribute on the <code>&lt;body></code> element is used to prevent a flash of unstyled content 
      (FOUC) on browsers that lack native support for custom elements. For details, see the 
      <a href="//polymer-project.org/docs/polymer/styling.html#fouc-prevention">Polymer styling reference</a>.

<hr>

OK, time to write some code!

&rarr; Add HTML import links to import the `<core-header-panel>`, `<core-toolbar>`, and `<paper-tabs>` elements:

    <script 
      src="../components/platform/platform.js">
    </script>
    
    <link rel="import" 
      href="../components/font-roboto/roboto.html">

    <!-- Add your imports here, like so: -->
    <link rel="import"
      href="../components/core-header-panel/core-header-panel.html">
    <link rel="import"
      href="../components/core-toolbar/core-toolbar.html">
    <link rel="import"
      href="../components/paper-tabs/paper-tabs.html"></strong>
    <style>

Polymer uses <a href="//polymer-project.org/platform/html-imports.html">HTML imports</a> to load components. HTML imports provide dependency management, ensuring that your elements and all of their dependencies are loaded before you use them.

<hr>

#### Add a toolbar

&rarr; To add a toolbar, add the following code inside the `<body>` tag.

    <core-header-panel>

      <core-toolbar>
      </core-toolbar>

      <!-- main page content will go here --> 

    </core-header-panel>

<ul>
  <li>The 
      <code><a href="//polymer-project.org/docs/elements/core-elements.html#core-header-panel">&lt;core-header-panel&gt;</a></code> 
      element is a simple container that holds a 
      header (in this case a <code>&lt;core-toolbar></code> element), and some content. By 
      default, the header stays at the top of the screen, but it can also be 
      set to scroll with the content.</li>
  <li>The <code><a href="//polymer-project.org/docs/elements/core-elements.html#core-toolbar">&lt;core-toolbar></a></code> element serves 
      as a container for tabs, menu buttons, and other controls.</li>
</ul>

<hr>

#### Add the tabs

The application will use tabs for navigating between two different views,
a list of all messages and a list of favorites. The 
<code><a href="//polymer-project.org/docs/elements/paper-elements.html#paper-tabs">&lt;paper-tabs&gt;</a></code>
element works much like a `<select>` element, but it's styled as a set of
tabs.

&rarr; To add tabs, add the following code inside the `<core-toolbar>` tag.

    ...
    <core-toolbar>

      <paper-tabs id="tabs" selected="all" self-end>
        <paper-tab name="all">All</paper-tab>
        <paper-tab name="favorites">Favorites</paper-tab>
      </paper-tabs>

    </core-toolbar>
    ...

<ul>
  <li>
    <code>&lt;paper-tabs></code> identifies the selected child by its name
    value or its index value.
  </li>
  <li>
    <code>selected="all"</code> chooses the first tab as the initially selected tab.
  </li>
  <li>In this case, the children are <code>&lt;paper-tab></code> elements, which provide
     styling and the "ink ripple" animation when you touch a tab.
  </li>
  <li>
    <code>self-end</code> is a
    <a href="//polymer-project.org/docs/polymer/layout-attrs.html">layout attribute</a>.
  </li>
</ul>

<hr>

#### Add styles for the new elements

&rarr; Add the following CSS rules inside the `<style>` element.

    core-header-panel {
      height: 100%;
      overflow: auto;
      -webkit-overflow-scrolling: touch; 
    }
    core-toolbar {
      background: #03a9f4;
      color: white;
    }
    #tabs {
      width: 100%;
      margin: 0;
      -webkit-user-select: none;
      -moz-user-select: none;
      -ms-user-select: none;
      user-select: none;
      text-transform: uppercase;
    }

<ul>
  <li>The <code>&lt;core-header-panel&gt;</code> is a generic element that can be used as either a 
      full-page layout or for a card with a toolbar. To use it as a full-page, scrollable container,
      set its height explicitly. </li>
  <li>Here, the height is set to 100%. This works because the existing style rules ensure that its 
      parent elements,
      <code>&lt;html&gt;</code> and <code>&lt;body&gt;</code>, take up 100% of the viewport height.</li>
  <li>The <code>overflow</code> and <code>-webkit-overflow-scrolling</code> properties ensure that
      scrolling works smoothly on touch devices, especially iOS.</li>
  <li>The <code>#tabs</code> selector selects the `&lt;paper-tabs&gt;` element. The toolbar adds a default margin on its children, to space controls appropriately. The tabs don't need this extra spacing.</li>
  <li>The <code>user-select</code> properties prevent the user from accidentally selecting the tab text.</li>
</ul>

&rarr; Add a `<script>` tag near the end of the file to handle the tab switching event.

    <script>
      var tabs = document.querySelector('paper-tabs');

      tabs.addEventListener('core-select', function() {
        console.log("Selected: " + tabs.selected);
      });
    </script>

<ul>
  <li>
    The <code>&lt;paper-tabs></code> element fires a <code>core-select</code> event when you select a 
    tab. You can interact with the element just like a built-in element.
  </li> 
  <li>
    Right now there's nothing to switch; you'll finish hooking it up later.
  </li>
</ul>

<hr>

### Run the app

If you haven't already done so, hit the <img src="img/runbutton.png"
class="icon"> button. You have a Polymer app!

<figure>
  <img src="http://www.polymer-project.org/images/tutorial/step-1.png">
</figure>

<aside class="callout">
  <b>Note:</b>

  <p>If you have the console open, you'll notice that you get two `core-select` 
events each time you switch tabs &mdash; one for the previously-selected tab and one 
for the newly-selected tab. The `<paper-tabs>` element inherits this behavior from 
<code><a href="//polymer-project.org/docs/elements/core-elements.html#core-selector">&lt;core-selector&gt;</a></code>, which supports
both single and multiple selections.</p>
</aside>

If something isn't working, check your work against the `index.html` file in the `step-1` folder:

-   [`index.html`](https://github.com/Polymer/polymer-tutorial/blob/master/step-1/index.html)

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
