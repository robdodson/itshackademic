<toc-element></toc-element>

Google マップのデフォルトのスタイルは、ナビゲーションしやすいデザインになっていますが、それはつまり、地図上のデータにとっては必ずしもベストな背景ではないことを意味します。幸いにも、Google マップのスタイルのカスタマイズに特化した API が存在します。

### 生の Maps API にアクセスする

`<google-map>` 要素はたくさんのことができますが、[全 Maps API](https://developers.google.com/maps/documentation/javascript/reference) のサブセットしか公開していません。
しかし一方で、基本的な JavaScript オブジェクトに簡単にアクセスできる方法もあり、それを使って、したいことができるようになっています。

ただし、地図は非同期的にロードされるため、地図にアクセスするコードはすべて、地図のロードが終わった*後*に実行する必要があります。地図のロード完了時に `<google-map>` 要素がイベントを起動することで、ロード後にコードが実行されるようになります。

&rarr; `main.js` を開き、以下の内容を入力します。

    var mapElement = document.querySelector('google-map');
    mapElement.addEventListener('google-map-ready', mapLoaded);

    function mapLoaded(e) {
      var map = this.map;
      console.log('current zoom: ' + map.getZoom());
    }

これはイベント リスナーを `<google-map>` 要素に追加するコードです。よって、要素が Maps API をロードし終えると、`google-map-ready` イベントが起動して `mapLoaded` がコールされ、その `map` プロパティにアクセスできるようになります。これは、純粋な JavaScript で Maps API を自分で初期化した場合に取得するのと同じ [Map オブジェクト](https://developers.google.com/maps/documentation/javascript/reference#Map) です。

必要であれば <img src="img/runbutton.png" class="icon"> ボタンを再度クリックします。すべてがうまくいっていれば、前と同じ地図が表示されますが、コードが `current zoom: 13` を JavaScript コンソールに書き込みます。

### 地図のスタイルを設定する

Google Maps API には拡張[スタイル設定 API](https://developers.google.com/maps/documentation/javascript/styling) があり、国境線などの共通のものや有料高速道路などの特殊なものなど、対象物の色や太さを指定できるようになっています。

この codelab では、物事をシンプルにして話を進めましょう。以下に示すスタイルでは、デフォルトのスタイルの色はすべてそのまま維持しますが、ほぼすべて彩度を落しています。Google マップに慣れた人の目には、地図上の対象物は依然として素早く認識されると同時に、地図上に描くデータはしっかり目立ちます。また、このスタイルでは、水域の明るさを落とすことで、表示内で存在感を出しすぎないようにしています。

&rarr; マップのスタイルを設定するよう `mapLoaded` 関数をアップデートします。

    function mapLoaded(e) {
      var map = this.map;
      map.setOptions({
        styles: [
          {
            // set all features to 15% of the saturation of their default color
            stylers: [{saturation: -85}]
          }, {
            // in addition, lower the lightness of water specifically
            featureType: "water",
            elementType: "geometry",
            stylers: [{lightness: -20}]
          }
        ]
      });
    }

### アプリを実行する

実行ボタンを再度クリックすると、彩度を落した地図が表示されるはずです。

<figure>
  <img src="img/s3-map-desaturate.png">
  <figcaption>彩度を落した地図が表示された index.html </figcaption>
</figure>

<aside class="callout">
  <b>スタイル付き地図</b>
  <p>もちろん、スタイル設定で使えるオプションは彩度と明るさだけではありません。また、オプションを使うのに、使用可能オプションをすべて覚える必要も当然ありません。[Google Maps API スタイル付き地図ウィザード](http://gmaps-samples-v3.googlecode.com/svn/trunk/styledmaps/wizard/index.html) を使えば、スタイルについてさらに詳しく学べ、インタラクティブにスタイルを作成することもできます。独自のスタイルを作成したい場合は、クリックでスタイルを作成していき、`Show JSON` ボタンを押して表示された内容を、上記で使用したスタイルの部分にコピーします。</p>
</aside>

### まとめ

このステップで学んだ内容:

- Polymer イベントによって起動される JavaScript 関数を追加する
- `<google-map>` 要素を使って、生の Maps API にアクセスする
- カスタムの地図スタイルを設定する

### 次のステップ

地図にデータ オーバーレイを追加して、何かデータを視覚化しましょう。
