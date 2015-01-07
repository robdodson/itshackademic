<toc-element></toc-element>

### Create a new project

<!-- Chrome Dev Editor callout block -->
<aside class="callout">
This codelab uses **Chrome Dev Editor**, a Chrome app IDE.
<div class="kiosk">
  Run Chrome Dev Editor by clicking its icon at the bottom of your screen:
  <figure>
  <img src="/static/images/app-icons/chrome_dev_editor_screenshot.png">
  </figure>
</div>

<div class="extended">If you don't have it installed yet, please
[install it from Chrome Web Store](https://chrome.google.com/webstore/detail/spark/pnoffddplpippgcfjdhbmhkofpnaalpg).</div>
</aside>
<!-- End of Chrome Dev Editor callout block -->

Fire up Chrome Dev Editor and start a "JavaScript Web app using Polymer paper elements".

<div class="stepbystep">
  <ul>
    <li>Click <img src="img/hamburger.png" class="icon"> to start a new project.</li>
  </ul>
  <div>
    <img src="img/s1-newproject.png" style="height:250px;">
  </div>
</div>

<div class="stepbystep">
  <ul>
    <!-- TODO (asolovay): Do they put quotes around the project name? If not, we
      should set off VisualizationCodelab in bold but with no quotes. -->
    <li>Enter <b>"VisualizationCodelab"</b> as the <b>Project name</b>.</li>
    <li>In the <b>Project type</b> dropdown, select <b>JavaScript web app (using Polymer paper elements)</b>.</li>
    <li>Click the <b>Create</b> button.</li>
  </ul>
  <div>
    <img src="img/s1-newproject-type.png" style="height:250px;">
  </div>
</div>

Chrome Dev Editor creates a basic scaffold for your Polymer app. In the
background, it also uses [Bower](http://bower.io/) to download and install a
list of dependencies (including `polymer.js`) into the `bower_components/`
folder. You'll learn more about using Bower in the next step.

    VisualizationCodelab/
      bower_components/ <!-- installed dependencies from Bower -->
      bower.json  <!-- Bower metadata file. Used for managing dependencies -->
      index.html  <!-- your app -->
      main.js
      styles.css

<aside class="callout">
<div>If you receive an error <strong>"Github API Limit Exceeded"</strong> while installing bower dependencies, you can use <a href="zips/VisualizationCodelab.zip">this project zip</a> instead.</div>
<div>Unzip the project, and click on <strong>Open Folder...</strong> in the Chrome Dev Editor menu to import it.</div>
<div>It includes all the dependencies to complete this codelab so you should not need to run bower with it.</div>
<div>This is a short term bug in Chrome Dev Editor that will be fixed in the next release.</div>
</aside>

### Preview the app

At any point, hit the <img src="img/runbutton.png" class="icon"> button in the
top toolbar to run the app. Chrome Dev Editor fires up a web server and
navigates to the `index.html` page. This is great way to preview changes as you
make them.

<figure>
  <img src="img/s1-helloworld.png">
  <figcaption>Preview of index.html</figcaption>
</figure>

### Summary

In this step, you learned how to:

- Create a new Polymer application
- Run Chrome Dev Editor's web server to preview the app

### Next up

At this point the app only greets the world, it doesn't show it. We need a map!
