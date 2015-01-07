<toc-element></toc-element>

### 準備作業としてコンポーネントをインポートする

&rarr; `index.html` にて、`<head>` に以下のHTML Imports を追加します。

    <link rel="import" href="bower_components/core-icons/maps-icons.html">
    <link rel="import" href="bower_components/core-item/core-item.html">
    <link rel="import" href="bower_components/core-selector/core-selector.html">

`maps-icons.html` は、[地図アイコンセット](http://www.polymer-project.org/components/core-icons/demo.html) のロードに必要なものです。後の方で、トラベル モード のアイコンを表示するのに使用します。

### core-item とcore-selector を使用する

[`<core-item>`](http://www.polymer-project.org/components/core-docs/index.html#core-item) はシンプルなラインアイテム オブジェクトで、アイコンとラベルに対応しています。その`icon` 属性は `<iconset>:<name>` という形を取ります。例えば、以下のコードは、`maps` アイコンセットの `directions-car` アイコンを `DRIVING` というテキストの隣に配置します。

    <core-item icon="maps:directions-car" label="DRIVING"></core-item>

`<google-map-directions>` 要素は、表示するルート案内の種類を指定する `travelMode` プロパティを公開します。取りうる値は、`"DRIVING"`（運転）、`"WALKING"`（徒歩）、`"BICYCLING"`（自転車）、`"TRANSIT"`（乗換）の 4 つです。


[`<core-selector>`](http://www.polymer-project.org/components/core-docs/index.html#core-selector) は、リストからアイテムを選択する汎用コンポーネントです。ルート案内の `<core-item>` トラベル モードの選択に使用します。

&rarr; `<div id="inputs">` コンテナにて、`<core-selector>` とトラベル オプションを追加します。

    <div id="inputs">
      ...
        <core-selector selected="0" layout horizontal>
          <core-item icon="maps:directions-car" label="DRIVING"></core-item>
          <core-item icon="maps:directions-walk" label="WALKING"></core-item>
          <core-item icon="maps:directions-bike" label="BICYCLING"></core-item>
          <core-item icon="maps:directions-transit"
              label="TRANSIT"></core-item>
       </core-selector>
    </div>

**注**

- `layout` と `horizontal` は [Polymer のCSS レイアウト システム](https://www.polymer-project.org/docs/polymer/layout-attrs.html) の一部です。フレックスボックスをサポートします。
- `selected="0"` では最初のアイテムを選択しますが、必要に応じて別のデフォルトを指定できます。

### セレクターのスタイルを設定する

デフォルトでは、`<core-selector>` にはスタイルが与えられていません。

&rarr; `styles.css` にて、各要素について以下のデフォルト スタイルを追加します。

    core-selector {
      background: #eee;
      font-size: 12px;
      margin-top: 5px;
    }

    core-item {
      padding: 3px 10px 3px 3px;
      cursor: pointer !important;
    }

    /* 注:  <core-selector>  は、選択されているアイテムに core-selected CSS クラスを適用します。*/
    core-item.core-selected {
      background: rgb(66, 133, 244);
      color: white;
      fill: white;
    }

<figure>
  <img src="img/s5-tabs.png">
  <figcaption>スタイル設定されたトラベル モード セレクター</figcaption>
</figure>

### トラベル モード セレクター &#8596; ルート案内要素をデータ バインドする

最後に、`<google-map-directions>` の `travelMode` 属性を `<core-selector>` ノードの `.selectedItem` 属性にデータ バインドする必要があります。新しいアイテムが選択されると、`<core-selector>`  はこのプロパティを、選択されたアイテムに更新します。

&rarr; ルート案内の`travelMode` 属性をセレクターの `.selectedItem` にデータ バインドします。`.selectedItem` はノードを返すため、`travelMode` をその `.label` プロパティにバインドする必要があります。

    <google-map-directions map="{{map}}"
                           startAddress="{{start}}" endAddress="{{end}}"
                           travelMode="{{travelMode.label}}">
    </google-map-directions>

    ...

    <core-selector ... selectedItem="{{travelMode}}">
      ...
    </core-selector>

### アプリを実行する

&rarr; <img src="img/runbutton.png" class="icon"> ボタンをクリックします。

&rarr; 出発地アドレスに **San Francisco, CA** を入力します。

&rarr; 目的地アドレスに **Oakland, CA** を入力します。

&rarr; 別のトラベル モードをクリックします。

地図は自動的に更新され、別の移動手段が表示されます。

<figure>
  <img src="img/s5-final.png">
  <figcaption>ルート案内とトラベル モード セレクター</figcaption>
</figure>

### まとめ

このステップで学んだ内容:

- `<core-selector>` と `<core-item>` 要素を使用する
- Polymer のアイコン セットを使用する
- Polymer の双方向データ バインディングを使用してトラベル モードを設定する
