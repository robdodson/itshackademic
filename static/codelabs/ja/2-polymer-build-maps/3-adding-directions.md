<toc-element></toc-element>

`<google-map-directions>` 要素は、`<google-map>` と一緒にインストール済みです。この要素は、Google Maps API を使ってルート案内情報を提供します。

### &lt;google-map-directions> 要素を使う

`<google-map-directions>` を使うためには、以下の手順を実施します。

1. HTML Import を使って `<google-map-directions>` 要素 を`index.html` にロードする
2. ページ上で要素のインスタンスを宣言する
3. それを地図に「接続」する

&rarr; `index.html` にて、`google-map-directions.html` 用のHTML Import を追加します。

    <head>
      ...
      <link rel="import"
            href="bower_components/google-map/google-map-directions.html">
    </head>

&rarr; `<google-map-directions>` を宣言します。`startAddress` 属性を **"San Francisco"** に設定し、`endAddress` を **"Mountain View"** に設定します。

    <body>
      <google-map latitude="37.779" longitude="-122.3892" disableDefaultUI>
        ...
      </google-map>
      <google-map-directions startAddress="San Francisco"
                             endAddress="Mountain View">
      </google-map-directions>
    </body>

### ルート案内を地図に追加する

`<google-map-directions>` はルート案内を取得しますが、それ単独ではあまり役には立ちません。ルート案内が地図上に表示されるよう `<google-map-directions>` を `<google-map>` につなげます。

どちらの要素も、 基礎となる `Map` オブジェクト（Google Maps JavaScript API によって使用されるオブジェクト）へのユーザーによるアクセス/設定を許可する`.map` プロパティを公開しています。これら 2 つの要素が作用し合うようにするには、両方が同じ `Map` オブジェクトを使用するよう設定します。

&rarr; `main.js` の内容を以下のコードで置き換え、ルート案内要素が同じ `Map` オブジェクトを使うように設定します。

    var gMap = document.querySelector('google-map');
    gMap.addEventListener('api-load', function(e) {
      document.querySelector('google-map-directions').map = this.map;
    });

**注**: 地図要素によって `api-load` イベントが開始されるのを待つことは、地図がロードされたことの確認になります。


&rarr; `index.html` にて、`main.js` がページの最後のスクリプトとして含まれていることを確認します。

    <body unresolved>
      ...
      <google-map-directions startAddress="San Francisco"
                             endAddress="Mountain View">
      </google-map-directions>
      <script src="main.js"></script>
    </body>

<aside class="callout">
  <b>待って、コードが全然ない！</b>
  <p>そんな声が聞こえてきました。たしかに JavaScript がほんの少しだけでした。このステップでは、要素をそのイベントとプロパティを使って設定する方法を示しました。次のステップでは、Polymer の宣言型データ バインディング機能のためにコードを削除することになります。</p>
</aside>

### アプリを実行する

<img src="img/runbutton.png" class="icon">ボタンをクリックします。すると、地図、マーカー、そして追加した **San
Francisco** から **Mountain View** までのルート案内が表示されているはずです。

<figure>
  <img src="img/s3-directionstab.png">
  <figcaption>地図とルート案内</figcaption>
</figure>

### まとめ

このステップで学んだ内容:

- `<google-map-directions>`を使ってルート案内を地図に追加する
- 属性とプロパティを使って要素同士を「接続」する

### 次のステップ

Polymer のデータ バインディング機能について学び、ユーザーが出発地と目的地を入力できるようにします。
