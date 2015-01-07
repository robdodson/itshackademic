<toc-element></toc-element>

### 新しいプロジェクトを作成する

<!-- Chrome Dev Editor callout block -->
<aside class="callout">
このcodelab では、Chrome アプリ IDE である **Chrome Dev Editor** を使用します。
<div class="kiosk">
  Run Chrome Dev Editor by clicking its icon at the bottom of your screen:
  <figure>
  <img src="/static/images/app-icons/chrome_dev_editor_screenshot.png">
  </figure>
</div>

<div class="extended">Chrome Dev Editor をまだインストールしていない場合は、[Chrome ウェブストアからインストールしてください](https://chrome.google.com/webstore/detail/spark/pnoffddplpippgcfjdhbmhkofpnaalpg)。</div>
</aside>
<!-- End of Chrome Dev Editor callout block -->

Chrome Dev Editor を起動して、「JavaScript Web app using Polymer paper elements（JavaScript ウェブアプリ、Polymer ペーパー要素を使用）」を 開始します。

<div class="stepbystep">
  <ul>
    <li><img src="img/hamburger.png" class="icon"> をクリックして新規プロジェクトを開始します。</li>
  </ul>
  <div>
    <img src="img/s1-newproject.png" style="height:250px;">
  </div>
</div>

<div class="stepbystep">
  <ul>
    <li><b>Project name（プロジェクト名）</b>に <b>"PolymerMapsCodelab"</b> と入力します。</li>
    <li><b>Project type（プロジェクト タイプ）</b>のドロップダウン メニューから、<b>JavaScript web app (using Polymer paper elements)（JavaScript ウェブアプリ（Polymer ペーパー要素を使用））</b>を選択します。</li>
    <li><b>Create</b>（作成）ボタンをクリックします。</li>
  </ul>
  <div>
    <img src="img/s1-newproject-type.png" style="height:250px;">
  </div>
</div>

Chrome Dev Editor が Polymer アプリの基本的な土台を作成します。また、そのバックグラウンドでは、[Bower](http://bower.io/) を使って依存関係のリスト（`polymer.js` も含む）をダウンロードし、`bower_components/` フォルダにインストールします。Bower について、詳しくは次のステップで学習します。

    PolymerMapsCodelab/
      bower_components/ <!-- Bower からインストールした依存関係 -->
      bower.json  <!-- Bower のメタデータ ファイル。依存関係の管理に使用 -->
      index.html  <!-- 作成するアプリ -->
      main.js
      styles.css

<aside class="callout">
<div>bower の依存関係のインストール中に<strong>「Github API Limit Exceeded」</strong>（Github API の制限超過）エラーが発生した場合は、<a href="zips/PolymerMapsCodelab.zip">こちらのプロジェクト zip</a> を代用してください。</div>
<div>プロジェクトを解凍し、Chrome Dev Editor メニューにて <strong>Open Folder...</strong>（フォルダを開く）をクリックしてインポートします。</div>
<div>この中には、この codelab を最後まで進めるのに必要な依存関係がすべて含まれていますので、bower を実行する必要がありません。</div>
<div>このエラーは Chrome Dev Editor の一時的なバグで、次回リリースで修正される予定です。</div>
</aside>

### アプリのプレビュー

随時、上部のツールバーにある<img src="img/runbutton.png" class="icon">ボタンをクリックしてアプリを実行してください。Chrome Dev Editorがウェブ サーバーを起動し、`index.html` ページを開きます。変更を加えたときにその場で表示を確認できて、大変便利です。

<figure>
  <img src="img/s1-helloworld.png">
  <figcaption>index.html のプレビュー</figcaption>
</figure>

### まとめ

このステップで学んだ内容:

- 新しい Polymer アプリケーションを作成する方法
- Chrome Dev Editor のウェブ サーバーを起動してアプリをプレビューする方法

### 次のステップ

今の時点ではアプリはまだ何もできません。地図を追加しましょう！
