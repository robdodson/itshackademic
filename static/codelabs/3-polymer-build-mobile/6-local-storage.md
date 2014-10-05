<toc-element></toc-element>

Let's make sure our app can remember its state! Fortunately, adding a persistence layer with Polymer is really easy.

### Save tasks in local storage

To save tasks in local storage:

1. Add a `core-localstorage` (non-UI) element.
2. Save the task list every time `data` is changed.


&rarr; In `codelab-app.html`, install a `core-localstorage` dependency and add a `core-localstorage` element to the end of the `<template>`, after the `<core-drawer-panel>`. Give it the ID **storage**, and bind its value to the `data` variable.

    ...
    <link rel="import" href="bower_components/core-localstorage/core-localstorage.html">
    ...
    <template>
      ...
      </core-drawer-panel>
      <core-localstorage id="storage" name="codelab-app-storage" value="{{data}}"></core-localstorage>
    </template>



&rarr; Add a `dataChanged` callback to the element's prototype. In the callback, retrieve the storage element by ID and use its `save` method to save the data to local storage.

    <script>
      Polymer({
        ...
        dataChanged: function() {
          this.$.storage.save();
        }
      });
    </script>

The `dataChanged` callback is a _change watcher_.
It's called automatically every time the `data` property is changed—for
example, when a new note is added to the `data` array. 
Therefore, any time a user adds a new note, it gets automatically saved in local storage.

<aside class="callout">
  <b>Observing properties</b>
  <p>You can use a change watcher to observe property changes in your element's prototype. All properties on Polymer elements can be watched for changes by implementing a `propertyNameChanged` handler. When the value of a watched property changes, the appropriate change handler is automatically invoked.</p>
</aside>

&rarr; Add an `on-change` listener to `<paper-checkbox>` and bind it to the `dataChanged` callback.
Now, when user checks the checkbox, the `dataChanged` callback is triggered and the new value of the note's status is saved in the local storage.

    <paper-checkbox checked="{{done}}" on-change="{{dataChanged}}"></paper-checkbox>


&rarr; Open `index.html` and preview the app with the <img src="img/runbutton.png" class="icon"> button.
Add, check, and uncheck notes, and then reload the page. The state should persist between reloads of the page.

<figure>
  <img src="img/s6-preview.png">
  <figcaption>Note are now saved with `<core-localstorage>`</figcaption>
</figure>

### Summary

In this step, you learned how to:

- Use `core-localstorage` to save the state of the app to local storage

## Next up

We have an empty sidebar—so much space for even moar elements!
