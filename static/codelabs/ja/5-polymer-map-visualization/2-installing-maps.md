<toc-element></toc-element>

Polymer は、Google マップ表示用に `<google-map>` 要素 ([github](https://github.com/GoogleWebComponents/google-map)) を提供しています。この要素を使うには、まず、Bower を使ってインストールする必要があります。

<aside class="callout">
  <b>Bower とは？</b>
  <p><a href="http://bower.io/">Bower</a> は、クライアント側のパッケージ管理ツールで、どんなウェブ アプリでも使用することができます。Polymer と連携して、面倒な依存関係管理を簡単にしてくれます。Polymer コンポーネントはすべて、自身の依存関係を定義しています。Bower を使って Polymer コンポーネントをインストールすると、そのコンポーネントの依存関係も同時に <code>bower_components/</code> の中にインストールされます。</p>
</aside>

### &lt;google-map> 要素をインストールする

通常は、`bower install GoogleWebComponents/google-map --save` をコマンドライン上で実行して `<google-map>` をインストールしますが、Chrome Dev Editor には Bower コマンドを実行するコマンドラインがありません。代わりに、手動で `bower.json` を編集して `google-map` を追加したのち、Chrome Dev Editor の **Bower Update** 機能を実行します。**Bower Update** は、`bower.json` にある依存関係をチェックし、抜けているものがあればそれをインストールします。


&rarr; `bower.json` を編集して、`google-map` を `dependencies` に追加します。

    "dependencies": {
      "polymer": "Polymer/polymer#master",
      "paper-elements": "Polymer/paper-elements#master",
      "google-map": "GoogleWebComponents/google-map#master"
    }

<div class="stepbystep">
  <ul>
    <li>エディターにて、ファイル名 `bower.json` を右クリックします。</li>
    <li>ドロップダウンから <b>Bower Update</b>（Bower 更新）を選択します。</li>
  </ul>
  <div>
    <img src="img/s2-bowerupdate.png" style="height:250px;">
  </div>
</div>

ダウンロード時間はおそらく数秒です。`<google-map>`（および依存関係）がインストールされたかどうかは、`bower_components/google-map/` が作成されてそこにデータが入っているかで確認できます。

###  &lt;google-map> 要素を使用する

`<google-map>` を使用するには、以下の手順を実施する必要があります。

1. HTML Import を使って `<google-map>` を `index.html` にロードする
2. ページ上で要素のインスタンスを宣言する

&rarr; `index.html` の編集を開始する

&rarr; `index.html` の `<head`> にて、そこにあるすべてのインポートを**削除**し、**以下の行を追加**します。`webcomponents.js` のインポートの後ろに置いてください。

    <link rel="import" href="bower_components/google-map/google-map.html">

これが終わったら、ドキュメントの `<head>` は以下のようになっているはずです。

    <head>
      <title>VisualizationCodelab</title>

      <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0">
      <meta name="mobile-web-app-capable" content="yes">
      <meta name="apple-mobile-web-app-capable" content="yes">

      <script src="bower_components/webcomponentsjs/webcomponents.js"></script>
      
      <link rel="import" href="bower_components/google-map/google-map.html">

      <link rel="stylesheet" href="styles.css">
    </head>

&rarr; `<body>` の中身を削除して、`<google-map>` 要素を宣言します。デフォルトの `main.js` スクリプトについては、後で必要になりますのでそのままにしておいてください。

    <body unresolved>
      <google-map latitude="37.779" longitude="-122.3892" zoom="13"></google-map>
      <script src="main.js"></script>
    </body>

お分かりのように、`<google-map>` の使用方法は完全に宣言型です。地図は、`latitude`（緯度）および `longitude`（経度）属性を使って中央に配置され、`zoom`（ズーム）属性でそのズーム レベルが決まります。

&rarr; `main.js` の中身を空にします。このスクリプト例はエラーを発生させるだけです。

#### 地図にサイズを設定する

この時点でアプリを実行しても何も表示されません。地図を正しく表示させるには、CSS にて `display: block` に設定して、`height`（高さ）を与える必要があります。

&rarr; `styles.css` を開き、その内容を以下のようにデフォルトのスタイル設定で置き換えます。

    body, html {
      font-family: 'Roboto', Arial, sans-serif;
      height: 100%;
      margin: 0;
    }
    google-map {
      display: block;
      height: 100%;
    }

### アプリを実行する

<img src="img/runbutton.png" class="icon"> ボタンのクリックがまだであればクリックします。ビューポートいっぱいに広がる地図が表示されるはずです。

<figure>
  <img src="img/s2-maptab.png">
  <figcaption>地図が表示された index.html</figcaption>
</figure>

### まとめ

このステップで学んだ内容:

- Bower を使って `<google-map>` 要素をインストールする
- `<google-map>` 要素を使用する
- CSS を使ってカスタム要素のスタイルを設定する

### 次のステップ

地図のスタイル設定を変更してデータが目立つようにします。
