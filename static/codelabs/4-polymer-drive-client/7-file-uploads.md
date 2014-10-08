<toc-element></toc-element>


### Add Upload panels

The app needs an area to display the names of files that
the user has _selected_ for uploading,
as well as those that have already been _uploaded_. 
The approach we'll take is to have two panels
containing a toolbar as part of the heading,
with a splitter dividing the **Queue** and **Uploaded** areas. 

<figure>
  <img src="img/image_30.png"/>
  <figcaption>The proposed UI</figcaption>
</figure>

&rarr; After `<core-toolbar>`, add the following markup:

    <div id="file-splitter" horizontal layout>
        
      <div class="panel">
        <core-toolbar><div horizontal layout>Queue</div></core-toolbar>
        <ul class="filelist">
          <template repeat="{{file in uploadList}}">
            <li>
            <strong>{{file.name}}</strong> {{file.type}}
            </li>
          </template>
        </ul>
      </div>

      <core-splitter></core-splitter>

      <div class="panel">
        <core-toolbar><div horizontal layout>Uploaded</div></core-toolbar>

        <ul class="filelist">
          <template repeat="{{file in uploadedList}}">
            <li>
            <img src="{{file.iconLink}}"> 
            <strong>{{file.title}}</strong>
            <p>
            <a href="{{file.selfLink}}">Drive URL</a>
            <a href="{{file.webContentLink}}">Web URL</a>
            </p>
            </li>
          </template>
        </ul>
      </div>
    </div>


&rarr; Add the following lines to the `drive-app.css` file to
improve the look and feel:

    .panel { width: 50% };
    .panel core-toolbar {
      background: rgb(68, 68, 68);
    }


&rarr; Click the <img src="img/runbutton.png" class="icon"> button.

You should now see the following:

<figure>
  <img src="img/image_31.png"/>
  <figcaption>The app's current UI</figcaption>
</figure>

The app now has most of the UI it needs.
It's time to add the logic to get it working!


### Wire up events for the app

Now you add the JavaScript that brings the markup to life. 

&rarr; After your closing `</template>` tag, add the following code,
which defines some arrays and properties you'll use to work with upload lists:

    <script>
      Polymer({
        uploadList: [],    // selected files
        uploadedList: [],  // successfully uploaded files
        autoUpload: false, // automatically upload?
      });
    </script>

&rarr; Expand that code to add the logic for selecting files and
updating the arrays when files are chosen (note, this replaces the
last snippet):

    <script>
      Polymer({
          uploadList: [],
          uploadedList: [],
          autoUpload: false,

          selectFiles: function (files) {
            this.queue = files;
            this.$.status.textContent = 'Files selected';

            var f;
            for(var i=0; f = files[i]; i++) {
              this.uploadList.push(f);
            }

            if(this.autoUpload) {
              this.uploadFiles(files);
            }
          }
      });
    </script>

&rarr; Add the following code right before the `selectFiles` function:

    manualUpload: function () { 
      this.uploadFiles(this.queue); 
    },

That code allows the manual upload button to upload files if clicked.

So, you’ve now wired up some of the UI to functions,
but the app is still missing the `uploadFiles` function.

### Implement file uploading

`uploadFiles` can use a little library written by the Google Drive team
that makes working with file uploads easier.
You can use Bower to install the library.

&rarr; Edit `bower.json` to add a dependency on "cors-update-sample".
The dependencies should look like this:

    "dependencies": {
      "polymer": "Polymer/polymer#master",
      "paper-elements": "Polymer/paper-elements#master",
      "core-splitter": "Polymer/core-splitter#master",
      "core-scaffold": "Polymer/core-scaffold#master",
      "cors-upload-sample": "googledrive/cors-upload-sample#master"
    }

<div class="stepbystep">
  <ul>
    <li>In Chrome Dev Editor, right-click the filename **bower.json**.</li>
    <li>Run **Bower Update** from the dropdown.</li>
  </ul>
  <div>
    <img src="img/image_18.png" style="height:250px;">
  </div>
</div>


&rarr; Make sure that `cors-upload-sample` is in the `bower_components` directory.

<figure>
  <img src="img/image_33.png"/>
  <figcaption>The bower_components directory should now contain core-upload-sample.</figcaption>
</figure>


Excellent. You can now _reference_ the `upload.js` script that
comes with this package.

&rarr; Add the following `script` tag after
the other HTML imports in `drive-app.html`:

    <script src="bower_components/cors-upload-sample/upload.js"></script>

&rarr; Add the `uploadFiles` function before the `manualUpload` function:

    uploadFiles: function (files) {
      var uploadedList = this.uploadedList;
      this.$.status.innerHTML = 'Uploading...';

      var f;
      for(var i=0; f = files[i]; i++) {
        var uploader = new MediaUploader({
          file: f,
          token: this.accessToken,
          onComplete: function (data) {
            uploadedList.push(JSON.parse(data));
            this.$.status.innerHTML = 'Upload successful';
            this.uploadList = [];
          }.bind(this)
        });
        uploader.upload();
      }
    },


&rarr; Just above that, add helpers for handling drag and drop, file picking, and
clearing the upload list:

    tapSelect: function (e) {
        this.$.files.click();
    },

    handleDragOver: function (e) {
        e.stopPropagation();
        e.preventDefault();
        e.dataTransfer.dropEffect = 'copy';
    },

    handleFilePick: function (e) {
        e.stopPropagation();
        e.preventDefault();
        this.selectFiles(e.target.files);
    },

    handleFileSelect: function (e) {
        e.stopPropagation();
        e.preventDefault();
        this.selectFiles(e.dataTransfer.files);
    },

    clearUploadList: function () {
        this.uploadedList = [];
        this.uploadList = [];
    },

## Next up

You _almost_ have enough in place to upload files.
The last thing you need is a way to sign users into
their Google Drive account so that uploads work.
