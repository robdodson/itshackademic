<toc-element></toc-element>

When looking at your app on a mobile device, you'll notice that the drawer is hidden by default. Let's make it open when user clicks the menu button and close when the user taps outside.

### Add the ability to open the drawer while on mobile

To add this feature:

1. Add an ID to the drawer.
2. Add a click event listener to the menu button to toggle the drawer.

&rarr; Add the ID **drawerPanel** to the drawer.

    ...
    <core-drawer-panel id="drawerPanel">
    ...

<aside class="callout">
  <b>IDs in Web Components and Polymer</b>
  <p>In Web Components, IDs are local and scoped to the element they are contained in. This makes it safe to use IDs inside custom elements, even if they can appear more than once on a page. Polymer also provides a convenience method,
<code>this.$.myIdName</code>, to easily find a child element inside a Polymer element by ID.</p>
</aside>


&rarr; Add an `on-click` listener to the `<paper-icon-button icon="menu">` button. Bind it to the `toggleDrawer` method of the root element, which we'll define in a moment.

    ...
    <paper-icon-button icon="menu" on-click="{{toggleDrawer}}"></paper-icon-button>
    ...

<aside class="callout">
  <b>Why on-click and not onClick?</b>
  <p>
Polymer supports declarative binding of events to methods in the component.
It uses special `on-event` syntax to trigger this binding behavior.
Learn more about [declarative event mapping](http://www.polymer-project.org/docs/polymer/polymer.html#declarative-event-mapping).</p>
</aside>

&rarr; Add a `toggleDrawer` method to the `codelab-app` element's prototype.
Use Polymer's `this.$.myIdName` shorthand notation to get access to the
`core-drawer-panel` element. Use its `togglePanel` method to delegate opening
of the drawer. To learn more about the API for `core-drawer-panel`,
visit its [documentation](https://www.polymer-project.org/docs/elements/core-elements.html#core-drawer-panel).

    <script>
      Polymer({
        toggleDrawer: function() {
          this.$.drawerPanel.togglePanel();
        }
      });
    </script>

&rarr; Select the **index.html** file and preview the app with the <img src="img/runbutton.png" class="icon"> button.
In *Developer Tools*, in the *Emulation* tab, pick *Nexus 5* from the dropdown, and click *Emulate*.

&rarr; Refresh the page. The drawer should be hidden by default.
Try clicking on the menu button in the toolbar.
The drawer should open and close accordingly.

<aside class="callout">
<b>New in v0.5.1</b>
<p>
You can now toggle the drawer just by adding a `core-drawer-toggle` attribute to your `paper-icon-button`. Try adding the `core-drawer-toggle` to your `paper-icon-button` and removing the `on-click` and `toggleDrawer` method. See if you can get the same behavior as before.
</p>
</aside>

### Summary

In this step, you learned how to:

- Use Polymer's element callbacks to make the element interactive
- Use `this.$.myIdName` notation to find elements on the page
- Use methods in an element's API

## Next up

Let's add some Paper elements to display notes in the app.
