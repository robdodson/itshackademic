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

Fire up Chrome Dev Editor and create a JavaScript app that uses Polymer.

<div class="stepbystep">
  <ul>
    <li>In Chrome Dev Editor,
        click <img src="img/hamburger.png" class="icon"> to start a new project.</li>
  </ul>
  <div>
    <img src="img/s1-newproject.png"  style="height:250px;">
  </div>
</div>

<div class="stepbystep">
  <ul>
    <li>Enter <b>PolymerMobileCodelab</b> as the <b>Project name</b>.</li>
    <li>In the <b>Project type</b> dropdown, select <b>JavaScript web app (using Polymer paper elements)</b>.</li>
    <li>Click the <b>Create</b> button.</li>
  </ul>
  <div>
    <img src="img/s1-newproject-type.png" style="height:250px;">
  </div>
</div>

Chrome Dev Editor creates a basic scaffold for your Polymer app.
In the background, it also uses [Bower](http://bower.io/) to
download and install a list of dependencies (including `polymer.js`)
into the `bower_components/` folder.
You'll learn more about using `bower.json` in the next step.
After installation, your directory structure should look like this:

    PolymerMobileCodelab/
      bower_components/ <!-- installed dependencies from Bower -->
      bower.json        <!-- metadata for managing dependencies -->
      index.html        <!-- your app -->
      main.js
      styles.css

### Preview the app

At any point, click the <img src="img/runbutton.png" class="icon"> button
in the top toolbar to run the app.
Chrome Dev Editor fires up a web server and navigates to the `index.html` page.
This is a great way to preview changes as you make them.

<figure>
  <img src="img/s1-helloworld.png">
  <figcaption>Preview of index.html</figcaption>
</figure>

### Summary

In this step, you learned how to:

- Create a new Polymer application
- Run Chrome Dev Editor's web server to preview the app

The project is set up! Let's get some Paper elements!
