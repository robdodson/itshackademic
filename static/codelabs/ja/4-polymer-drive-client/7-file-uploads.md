<toc-element></toc-element>


### アップロード パネルを追加する

アプリには、ユーザーがアップロード対象に_選択した_ファイル、およびすでに_アップロードされた_ファイルの名前を表示するエリアが必要です。ここでは、2 つのパネルを用意して、そのヘディングの中にツールバーを入れ、**Queue**（待機中）エリアと**Uploaded**（アップロード済み）エリアを分けるスプリッターを設ける方法を用います。

<figure>
  <img src="img/image_30.png"/>
  <figcaption>UI 案</figcaption>
</figure>

&rarr; `<core-toolbar>` の後に以下のマークアップを追加します。

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


&rarr; 以下の行を `drive-app.css` ファイルに追加して、ルック＆フィールを高めます。


    .panel { width: 50% };
    .panel core-toolbar {
      background: rgb(68, 68, 68);
    }


&rarr; <img src="img/runbutton.png" class="icon"> ボタンをクリックします。

以下のような表示になるはずです。

<figure>
  <img src="img/image_31.png"/>
  <figcaption>アプリの現在の UI</figcaption>
</figure>

これでアプリに必要な UI のほとんどが揃いました。ここからは、それを機能させるためのロジックを追加します！


### アプリのイベントを実装する

ここで、マークアップに命を吹き込む JavaScript を追加します。

&rarr; 終了タグ `</template>` の後に、以下のコードを追加します。これは、アップロード リストと連動させるのに使う配列とプロパティを定義するコードです。

    <script>
      Polymer({
        uploadList: [],    // selected files
        uploadedList: [],  // successfully uploaded files
        autoUpload: false, // automatically upload?
      });
    </script>

&rarr; このコードを拡張して、ファイル選択用、およびファイル選択時の配列更新用のロジックを追加します（注: 前回のスニペットをこれで置き換えます）。


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

&rarr; 以下のコードを `selectFiles` 関数の直前に追加します。

    manualUpload: function () { 
      this.uploadFiles(this.queue); 
    },

これによって、手動アップロード ボタンがクリックされると、ファイルがアップロードされるようになります。

さて、UI の一部を関数につなげましたが、アプリにはまだ `uploadFiles` 関数がありません。

### ファイルのアップロード機能を実装する

`uploadFiles` は、Google ドライブ チームが作成したライブラリを使うことができます。これを使えば、ファイルのアップロードの扱いが簡単になります。ライブラリのインストールには Bower を使います。

&rarr; `bower.json` を編集して、"cors-update-sample" に対する依存関係を追加します。依存関係は次のようになります。

    "dependencies": {
      "polymer": "Polymer/polymer#master",
      "paper-elements": "Polymer/paper-elements#master",
      "core-splitter": "Polymer/core-splitter#master",
      "core-scaffold": "Polymer/core-scaffold#master",
      "cors-upload-sample": "googledrive/cors-upload-sample#master"
    }

<div class="stepbystep">
  <ul>
    <li>Chrome Dev Editor にて、ファイル名 **bower.json** を右クリックします。</li>
    <li>ドロップダウンから **Bower Update** を実行します。</li>
  </ul>
  <div>
    <img src="img/image_18.png" style="height:250px;">
  </div>
</div>


&rarr; cors-upload-sample` が `bower_components` ディレクトリ内にあることを確認します。

<figure>
  <img src="img/image_33.png"/>
  <figcaption>bower_components ディレクトリに core-upload-sample が入った状態</figcaption>
</figure>


上出来です。ここで、このパッケージに含まれている `upload.js` スクリプトを_参照_します。

&rarr; `drive-app.html` にて、以下の `script` タグを、他のHTML imports の後に追加します。

    <script src="bower_components/cors-upload-sample/upload.js"></script>

&rarr; `uploadFiles` 関数を `manualUpload` 関数の前に追加します。

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


&rarr; このすぐ上に、ドラッグ＆ドロップ、ファイルの選択、アップロード リストのクリアを処理するヘルパーを追加します。

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

## 次のステップ

ファイルのアップロードに必要なものが _ほぼすべて_揃いました。
あと必要なのは、ユーザーを Google ドライブ アカウントにサインインさせてアップロードを可能にする方法です。
