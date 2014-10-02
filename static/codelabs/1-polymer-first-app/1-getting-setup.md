<toc-element></toc-element>

### The Goal

In this tutorial, you'll build a small Polymer application -- a very basic client for a social networking service. The end result will look like this:

<figure layout vertical center>
  <a href="//polymer-project.org/apps/polymer-tutorial/finished/" layout horizontal class="unquote-link">
    <img src="img/s1-app.png" alt="Finished tutorial">
  </a>
  <figcaption>
    Click screenshot for demo
  </figcaption>
</figure>

There's a lot of ground to cover, so let's get started!

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

<div class="stepbystep">
  <ul>
    <li>
      <a href="#">Download the project source</a> and save it to your computer.
    </li>
    <li>
      Unzip the project file, there should be one `PolymerApp` directory.
    </li>
  </ul>
</div>

<div class="stepbystep">
  <ul>
    <li>
      In Chrome Dev Editor, click <img src="img/hamburger.png" class="icon"> and select `Open Folder...`
    </li>
  </ul>
  <div>
    <img src="img/s1-open-folder.png" alt="open folder" style="height:250px;">
  </div>
</div>

<div class="stepbystep">
  <ul>
    <li>
      Select the `PolymerApp` directory to load it into the editor.
    </li>
  </ul>
  <div>
    <img src="img/s1-open-folder2.png" alt="open folder" style="height:190px;">
  </div>
</div>


You should see the following structure in your editor's sidebar.

    PolymerApp/
      api/          <!-- a fake API for our app to consume -->
      components/   <!-- installed dependencies from Bower -->
      finished/     <!-- the finished version of our project, for reference -->
      images/
      post-service/ <!-- a component used in the tutorial -->
      starter/      <!-- the starting point for your project! -->
      step-1/       <!-- checkpoint steps, for reference -->
      step-2/
      step-3/
      .bowerrc      <!-- bower configuration file -->
      .gitignore
      bower.json    <!-- bower metadata file. Used for managing dependencies -->

### Preview the app

&rarr;  Open `starter/index.html` and hit the <img src="img/runbutton.png" class="icon"> button in the top toolbar to run the app.

Chrome Dev Editor fires up a web server and navigates to the `index.html` page. This is great way to preview changes as you make them.

<figure>
  <img src="img/s1-first-run.png">
  <figcaption>Preview of index.html</figcaption>
</figure>

### Summary

In this step, you learned how to:

- Load a project into Chrome Dev Editor
- Run Chrome Dev Editor's web server to preview the app

### Next up

At this point the app doesn't do much. Let's add some code!
