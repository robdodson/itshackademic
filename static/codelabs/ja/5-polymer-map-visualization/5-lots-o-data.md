<toc-element></toc-element>

### データをインストールする

データセットは、米国の国家道路交通安全局提供の[Fatality Analysis Reporting System（死傷分析報告システム）](http://www.nhtsa.gov/FARS) からのものです。この中には、過去10年間、米国での自動車による死亡事故データがすべて入っています。

このデータセットを簡素化し、プリコンパイルして JSON に入れています。

&rarr; `bower.json` を編集し、`simplified-traffic-data` と `core-ajax` を `dependencies` に追加します。

    "dependencies": {
      "polymer": "Polymer/polymer#master",
      "paper-elements": "Polymer/paper-elements#master",
      "google-map": "GoogleWebComponents/google-map#master",
      "point-overlay": "brendankenny/point-overlay#master",
      "simplified-traffic-data": "brendankenny/simplified-traffic-data#master",
      "core-ajax": "Polymer/core-ajax#master"
    }

&rarr; エディターにて、ファイル名 `bower.json` を右クリックし、ドロップダウンから **Bower Update** を選択します。

**注**: この JSON ファイルは非常に大きいので、Chrome Dev Editor がこれを取得するのに多少の時間を要することがあります。

### &lt;core-ajax> 要素を追加する

データをファイルからロードするには、`<core-ajax>` 要素を使用します。

&rarr; `index.html` にて、`<core-ajax>` の HTML Import を新たに追加します。

    <head>
      ...
      <script src="bower_components/webcomponentsjs/webcomponents.js"></script>
      <link rel="import" href="bower_components/google-map/google-map.html">
      <link rel="import" href="bower_components/point-overlay/point-overlay.html">
      <link rel="import" href="bower_components/core-ajax/core-ajax.html">
    </head>

次は JSON ファイルのロードです。`<core-ajax>` には数多くの[便利なプロパティとイベント](http://polymer.github.io/core-ajax/components/core-ajax/) がありますが、ここでは 4 つのみ使用します。

- `url`: ロードするファイル
- `handleAs`: ロードするデータの取り扱い方法を `<core-ajax>` に指示する
- `response`: ダウンロードしたデータがここに入る
- `auto`: 要素が即座にファイルのダウンロードを開始するようにする

ここで必要とする `<core-ajax>` 要素は、以下のようになります。

    <core-ajax
        url="bower_components/simplified-traffic-data/accidents.json"
        handleAs="json"
        response="{{data}}"
        auto>
    </core-ajax>

変数の `data` を `response` 属性にバインドしたので、データのロードとパースが済み次第、すぐに入力されます。データを表示するには、`data` をここで `<point-overlay>` にもバインドさせる必要があります。

&rarr; 前のステップで追加した、`<point-overlay>` にあるハードコード化したデータを `{{data}}` で置き換えます。

    <body>
      <template is="auto-binding">
        <google-map map="{{map}}" latitude="37.779" longitude="-122.3892" zoom="13"></google-map>
        <point-overlay map="{{map}}" data="{{data}}"></point-overlay>
        <core-ajax
            url="bower_components/simplified-traffic-data/accidents.json"
            handleAs="json"
            response="{{data}}"
            auto>
        </core-ajax>
      </template>

      <script src="main.js"></script>
    </body>

データ ファイルはローカルですが非常に大きいため、JavaScript エンジンがこれをパースしてメモリにロードするのに多少の時間を要します。デモの場合はそれで構いませんが、別のファイル フォーマットに移動させることで、その点を改善させることができます。ただし、この件については、この codelab では扱いません。

<aside class="callout">
  <b>データファイル サイズ</b>
  <p>現在、JSON は通常 UTF-8 ですので、ファイル サイズ上、1 文字当たり最低 1 バイト必要です。float データは 4 バイトで保存できますが、UTF-8 だと `-122.3892` のように切り捨てられた数字でも 9 バイトも必要になります。また、プロパティ名、ブラケット、クォーテーションといったオーバーヘッドもあります。gzip は、特にプロパティ名が繰り返される場合のファイル圧縮に非常に有効です。バイナリ データにも通用しますが、その効果はデータによります。Protocol Buffers など、より高度なバイナリ ワイヤー フォーマットが多数存在しますので、より効果的にファイル サイズの圧縮を行える場合もあります。</p>
</aside>

### アプリを実行する

&rarr; <img src="img/runbutton.png" class="icon"> ボタンをクリックしてアプリを実行します。すべてのデータのロードが終わるまで数秒かかります。

<figure>
  <img src="img/s5-app.png">
  <figcaption>`google-map` 全体にプロットされたデータ</figcaption>
</figure>

### まとめ

このステップで学んだ内容:

- `<core-ajax>` 要素を使って JSON データをロードする
- レスポンスを `<point-overlay>` データ属性にバインドして多数の点を描画する
