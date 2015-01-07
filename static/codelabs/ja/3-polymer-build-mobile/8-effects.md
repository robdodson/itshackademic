<toc-element></toc-element>

Polymer の `<paper-*>` セットは、要素におもしろい効果を与えてくれます。いくつか見ていきましょう。

### カードに影を追加する


&rarr; `paper-shadow` 依存関係をインストールします。

    ...
    <link rel="import" href="bower_components/paper-shadow/paper-shadow.html">
    ...

&rarr; カードの div を囲むように `<paper-shadow>` 要素を追加します。`z` 属性を `2` に設定します。これで、影の *depth*（奥行）が決まります。
    
    <paper-shadow z="2">
      <div flex class="card">
        <p>{{body}}</p>
      </div>
    </paper-shadow>

<figure>
  <img src="img/s8-shadow.png">
  <figcaption>カードに影が付きました</figcaption>
</figure>

### リップル効果をカードに追加する

ペーパー要素には、クリック時に美しいリップル効果を加えることができます。FAB をクリックしてみてください。クリックした場所に応じて、色の付いた波が要素の中を広がっていきます。

&rarr; `paper-ripple` 依存関係をインストールします。

    ...
    <link rel="import" href="bower_components/paper-ripple/paper-ripple.html">
    ...


&rarr; `<paper-ripple>` を `.card` div の一番下に追加します。
`recenteringTouch` クラスを追加して、ユーザーのアクションに反応するようにします。

    <div flex class="card">
      ...
      <paper-ripple class="recenteringTouch" fit></paper-ripple>
    </div>

<aside class="callout">
  <b>注:</b>

<p>`fit` 属性は、Polymer の [レイアウト属性](https://www.polymer-project.org/docs/polymer/layout-attrs.html#general-purpose-attributes)の 1 つです。`position: absolute` を設定し、`top:0;right:0;bottom:0;left:0;` を設定します。</p>
</aside>

&rarr; `index.html` を開き、<img src="img/runbutton.png" class="icon"> ボタンでアプリのプレビューを表示します。
カード上のどこかをクリックしてみてください。クリックするたびに繊細なリップル効果が表れます。

### ウォーターフォール モードを使用する

要素によっては、その属性に応じて異なるスタイルが設定されるものがあります。例えば、`core-header-panel` では、`waterfall` モードはツールバーの挙動を変化させます。最初は平たんな状態ですが、コンテンツがツールバーの下にスクロールされると影ができます。
使用できるすべてのモードを確認したい場合は、こちらの[core-header-panel github ページ](http://polymer.github.io/core-header-panel/components/core-header-panel/demo.html)を参照してください。


&rarr; `mode="waterfall"` を、ドロワーおよびメイン セクションの `<core-header-panel>` に追加します。

    ...
    <core-header-panel drawer mode="waterfall">
    ...
    <core-header-panel main mode="waterfall">
    ...

&rarr; <img src="img/runbutton.png" class="icon"> ボタンでアプリのプレビューを表示します。
メイン セクションにメモを複数追加して、スクロールできる状態にしてください。コンテンツをスクロールバーの下にスクロールすると、ツールバーの下に影ができるのが分かるはずです。

<figure>
  <img src="img/s8-waterfall.png">
  <figcaption>ツールバーの下にコンテンツをスクロール</figcaption>
</figure>


### より多くのスペースを使用する（可能な場合）

`core-drawer-panel` はレスポンシブな要素です。narrow（幅が狭い）モードのときはドロワーを閉じます（モバイルなど）。この要素の `narrow` プロパティを使えば、モードが narrow ではないときに、ツールバーをより美しく表示させることができます。

&rarr; `core-drawer-panel` の `narrow` プロパティを `narrow` 変数として公開します。

    <core-drawer-panel id="drawerPanel" narrow="{{narrow}}">

&rarr; ツールバーに、`narrow` 変数に依存する条件付きクラスを追加します。

[tokenList](http://www.polymer-project.org/docs/polymer/expressions.html#tokenlist) フィルターを使えば、フィルターに渡されるオブジェクトに基づいて、クラス名を動的に設定/削除することができます。

    <core-header-panel drawer mode="waterfall">
      <core-toolbar class="{{ {tall : !narrow} | tokenList }}">...</core-toolbar>
      ...
    <core-header-panel main mode="waterfall">
      <core-toolbar class="{{ {tall : !narrow} | tokenList }}">...</core-toolbar>

<figure>
  <img src="img/s8-tall.png" height="300px;">
  <figcaption>デスクトップ モードでは縦が長く、モバイルでは縮小するツールバー</figcaption>
</figure>

### まとめ

このステップで学んだ内容:

- `paper-shadow` を使って要素に影を付ける
- `paper-ripple` を使って要素にリップル効果を加える
- `waterfall` プロパティを使ってツールバーの表示を変更する
- `narrow` プロパティ、`tall` クラスを使ってツールバーの表示を変更する

## 次のステップ

ほぼ終了です！
