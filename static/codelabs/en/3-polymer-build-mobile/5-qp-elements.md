<toc-element></toc-element>

This step fleshes out the main section of the app:
the ability to add and list the user's notes.

### Support adding a note

To add this feature:

1. Add a colorful FAB (floating action button) that adds a new note.
2. Add a Paper input field to define the note's body.
3. Add a list data structure to keep track of added notes in the root element.

&rarr; In `codelab-app.html`, add an HTML Import for `paper-fab`
    
    ...
    <link rel="import" href="bower_components/paper-fab/paper-fab.html">

&rarr; Add a `paper-fab` button to the toolbar in the `main` section. Bind the `on-click` event of the button to a `showNewNoteInput` callback.

    ...
    <core-header-panel main>
      <core-toolbar>
        ...
        <paper-fab icon="icons:add" on-click="{{showNewNoteInput}}"></paper-fab>
      </core-toolbar>
    </core-header-panel>

&rarr; Add rules for `paper-fab` to `styles.css`.

    paper-fab {
      background-color: #e0a30b;
      position: absolute !important;
      bottom: -27px;
      right: 1em;
      z-index: 10;
    }

&rarr; Add a `.content` div to the `main` section after the `<core-toolbar>`.

    <core-header-panel main>
      <core-toolbar>
        ...
      </core-toolbar>
      <div class="content"></div>
    </core-header-panel>

&rarr; Install a `paper-input` dependency and add a `paper-input` element to the `.content` div.
Give the input element the ID **newNoteInput**. Use the `label` attribute to define the label of the input. Use the `floatingLabel` attribute to make the label hover nicely over the field when active.

    ...
    <link rel="import" href="bower_components/paper-input/paper-input.html">
    ...
    <div class="content">
      <paper-input id="newNoteInput"
                   floatingLabel
                   label="Add a new note"></paper-input>
    </div>

&rarr; In the `ready` callback, hide the input. Define the `showNewNoteInput` callback that unhides the input.

    <script>
      Polymer({
        ...
        ready: function() {
          this.$.newNoteInput.style.display = 'none';
        },
        showNewNoteInput: function() {
          this.$.newNoteInput.style.display = 'block';
        }
      });
    </script>

<aside class="callout">
  <b>Component lifecycle callbacks</b>
  <p>`Ready` is an example of a predefined [component lifecycle callback](http://www.polymer-project.org/docs/polymer/polymer.html#lifecyclemethods).
  It is called when an instance of the element is created.</p>
</aside>

&rarr; Bind the value of the input to the `newNote` variable. Bind the `on-change` event to the `add` callback.

    ...
    <paper-input id="newNoteInput"
                 floatingLabel
                 label="Add a new note"
                 on-change="{{add}}"
                 value="{{newNote}}"></paper-input>
    ...

&rarr; Add an array named `data` to the element's prototype to hold all notes.
Each note is an Object and has two properties: `body` and `done`.

    <script>
      Polymer({
        data: [],
        ...
      });
    </script>

&rarr; Add the `add` callback to add a new note to the `data` array.
Use the `newNote` binding to retrieve the note body from the input.
At the end, clear and hide the input field.

    <script>
      Polymer({
        data: [],
        ...
        add: function() {
          if (this.newNote) {
            this.data.unshift({
              body: this.newNote,
              done: false
            });
            this.$.newNoteInput.style.display = 'none';
            this.$.newNoteInput.value = null;
          }
        }
      });
    </script>

&rarr; Open `index.html` and hit the <img src="img/runbutton.png" class="icon"> to preview the app. Clicking on the `paper-fab` should cause the `paper-input` to appear.

<figure>
  <img src="img/s5-preview.png">
  <figcaption>Our app is starting to take shape</figcaption>
</figure>

You can inspect the value of the `data` array using the Console in the Developer Tools:

    document.querySelector('codelab-app').data;

### Display a list of notes

Once a few notes are added to the `data` array, we can display them in the `main`
section of our app, using a repeated template.

&rarr; In `codelab-app.html`, install a `paper-checkbox` dependency

    ...
    <link rel="import" href="bower_components/paper-checkbox/paper-checkbox.html">
    ...

&rarr; Add a repeated template after the `paper-input` field. Populate it with
a `paper-checkbox` and a `.card` div to display the notes from the `data` array.
The template is repeated for every item in the list. Each item is an Object;
its properties, `body` and `done`, are accessible as {{body}} and {{done}}, respectively.
Use these variables to populate the `checked` attribute of `paper-checkbox`
and the content of the `.card` div.

    <div class="content">
      ...
      <template repeat="{{data}}" >
        <div center horizontal layout class="item">
          <paper-checkbox checked="{{done}}"></paper-checkbox>
          <div flex class="card">
            <p>{{body}}</p>
          </div>
        </div>
      </template>
    </div>

&rarr; Add styles for the `.item` and `.card` divs to `styles.css`.

    .item {
      margin: 1em;
    }

    .card {
      width: 300px;
      background-color: #fff;
      padding: 1em;
      position: relative;
    }

&rarr; Open `index.html` and preview the app with the <img src="img/runbutton.png" class="icon"> button. Because the template with the list of notes is bound to the `data` property of the element, when you add a new note it gets listed automatically.

<figure>
  <img src="img/s5-listtasks.png">
  <figcaption>Notes are listed in the app</figcaption>
</figure>

### Summary

In this step, you learned how to:

- Use `paper-fab`, `paper-input`, and `paper-checkbox` elements
- Use a repeated template to display a list of items
- Use data binding for automatic update of the displayed list

## Next up

Adding new notes on every page refresh is tedious.
Instead, let's save them in local storage.
