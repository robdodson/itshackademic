<toc-element></toc-element>

### 新しいプロジェクトを作成する

Chrome Dev Editor を起動して、「JavaScript Web app using Polymer」（Polymer を使用する JavaScript ウェブ アプリ）を起動します。

<div class="stepbystep">
  <ul>
    <li>Chrome Dev Editor にて、
      <img src="img/hamburger.png" class="icon"> をクリックして <b>New Project</b>（新しいプロジェクト）をクリックします。</li>
  </ul>
  <div>
    <img src="img/s1-newproject.png" style="height: 250px;">
  </div>
</div>

<div class="stepbystep">
  <ul>
    <li> <b>Project name</b>（プロジェクト名）に <b>PolymerDriveCodelab</b> と入力します。</li>
    <li><b>Project type</b>（プロジェクト タイプ）のドロップダウンから、
      <b>JavaScript web app (using Polymer paper elements)</b>（JavaScript ウェブアプリ（Polymer ペーパー要素を使用））を選択します。</li>
    <li><b>Create</b>（作成）ボタンをクリックします。</li>
  </ul>
  <div>
    <img src="img/s1-newproject-type.png" style="height:250px;">
  </div>
</div>

**注:** Chrome Dev Editor にて初めてプロジェクトを作成する場合、プロジェクトを保存するフォルダを選択するよう尋ねられるかもしれません。一般に、デフォルトの設定を使って先に進むか、ディレクトリを新規作成してそれを選択することができます。

Chrome Dev Editor が Polymer アプリの基本的な土台を作成します。また、そのバックグラウンドでは、[Bower](http://bower.io/) を使って依存関係のリスト（`polymer.js` も含む）をダウンロードし、`bower_components/` フォルダにインストールします。
`bower.json` の使用方法について詳しくは次のステップで学習します。

インストール後、ディレクトリ構造は以下のようになっているはずです。

    PolymerDriveCodelab/
      bower_components/ <!-- Bower からインストールした依存関係 -->
      bower.json        <!-- 依存関係の管理用のメタデータ -->
      index.html        <!-- アプリ -->
      main.js
      styles.css

<aside class="callout">
<div>bower の依存関係のインストール中に<strong>「Github API Limit Exceeded」</strong>（Github API の制限超過）エラーが発生した場合は、<a href="zips/PolymerDriveCodelab.zip">こちらのプロジェクト zip </a>を代用してください。</div>
<div>プロジェクトを解凍し、Chrome Dev Editor メニューにて <strong>Open Folder...</strong>（フォルダを開く）をクリックしてインポートします。</div>
<div>この中には、この codelab を最後まで進めるのに必要な依存関係がすべて含まれていますので、bower を実行する必要がありません。</div>
<div>このエラーは Chrome Dev Editor の一時的なバグで、次回リリースで修正される予定です。</div>
</aside>

### アプリのプレビュー

随時、`index.html` を選択して、上部のツールバーにある <img src="img/runbutton.png" class="icon"> ボタンをクリックしてアプリを実行してください。

Chrome Dev Editorがウェブ サーバーを起動し、`index.html` ページを開きます。変更を加えたときにその場で表示を確認できて、大変便利です。


<figure>
  <img src="img/s1-helloworld.png" style="height:300px">
  <figcaption>Preview of index.html</figcaption>
</figure>

### まとめ

このステップで学んだ内容:

- 新しい Polymer アプリケーションを作成する方法
- Chrome Dev Editor のウェブ サーバーを起動してアプリをプレビューする方法

## 次のステップ

今の時点ではアプリはまだ何もできません。最初の要素 `<drive-app>` を作成しましょう！
