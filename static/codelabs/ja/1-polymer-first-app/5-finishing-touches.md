<toc-element></toc-element>

このセクションでは、お気に入りボタンをカードに追加し、タブを `<post-list>` コントロールに接続して、アプリを完成させます。

このステップで学ぶ内容:

-   宣言型のイベント ハンドリング
-   プロパティとメソッドを要素のプロトタイプに追加する
-   自動ノード検索 

### post-card.html を編集する

<div class="yt-embed">
  <google-youtube
    videoid="qym7deY53SY"
    width="16"
    height="9"
    rel="0"
    autoplay="0"
    fluid>
  </google-youtube>
</div>

&rarr; エディターで `post-card.html` を開き、<code><a href="//polymer-project.org/docs/elements/core-elements.html#core-icon-button">&lt;core-icon-button></a></code> 要素を追加します。

```side-by-side
<div class="card-header" layout horizontal center>
  <content select="img"></content>
  <content select="h2"></content>
</div>

<!-- content タグの上に、以下のコードを追加 -->
<core-icon-button
  icon="favorite"
  on-tap="{{favoriteTapped}}">
</core-icon-button>
<!-- End -->

<content></content>
```

<ul class="side-by-side">
  <li>`post-card.html` ファイルの冒頭には、`core-icon-button.html` 定義用のHTML importが既にあるはずです。</li>
  <li>その名が示すように、<code>&lt;core-icon-button&gt;</code> は埋め込まれたアイコン付きのボタンを作成します。Polymer にはスケーラブルなアイコン セットがいくつか含まれています。</li>
  <li><code>icon="favorite"</code> 属性は、デフォルトのアイコンセットからハート型アイコンを選択します。</li>
  <li><code>on-tap=</code><wbr><code>"{{favoriteTapped}}"</code> 属性では、ボタンがタップされたときに <code>post-card</code> 要素にコールするメソッドを指定します。
</li>
</ul>

<hr>

&rarr; `favorite` プロパティと `favoriteTapped` メソッドを要素のプロトタイプに追加します。
 

```side-by-side
<!-- 以下のコードを追加 -->
<script>
Polymer({
  publish: {
    favorite: {
      value: false,
      reflect: true
    }
  },
  favoriteTapped: function(event, detail, sender) {
    this.favorite = !this.favorite;
    this.fire('favorite-tap');
  }
});
</script>
```

<ul class="side-by-side">
  <li><code>publish</code> オブジェクトは、前のステップで示した <code>attributes</code> 属性と同じく、公開プロパティを設定するもう一つの方法です。ここでは、<code>favorite</code> プロパティはデフォルトが <code>false</code> で、かつ <em>reflect</em>（反映）するになっています。つまりプロパティ値が変化するたびに、DOM 内で<code>favorite</code> 属性が更新されます。</li>
  <li><code>favoriteTapped</code> イベントは、<code>favorite</code> プロパティの状態（<code>this.favorite</code>）を切り替え、組み込まれている <code>fire</code> メソッドを使ってカスタム イベントを開始します。（Polymer が個々のカスタム要素のプロトタイプに追加するユーティリティ メソッドがいくつかありますが、<code>fire</code> は、そのうちの 1 つです。）</li>
</ul>

以上の変更を行うと、お気に入りボタンがタップされるとお気に入りプロパティが更新されるようになり、それに対応する属性が設定/設定解除になります。

この時点では、ボタン押下を視覚的に示すものはありません。

<hr>

&rarr; 以下の CSS を追加してお気に入りボタンのスタイルを設定します。

```side-by-side
<!-- 以下のコードを追加 -->
core-icon-button {
  position: absolute;
  top: 3px;
  right: 3px;
  color: #636363;
}
:host([favorite]) core-icon-button {
  color: #da4336;
}
</style>
```

<ul class="side-by-side">
  <li><code>color</code> プロパティは、アイコンの塗りつぶし色を設定します。</li>
  <li><code>:host([favorite])</code> <code>core-icon-button</code> セレクターは、 <code>favorite</code> 属性がカスタム要素上で設定されたときの塗りつぶし色を設定します。</li>
</ul>

<hr>

&rarr; `post-card.html` を保存します。
   
ここで、`index.html` をリロードすると、お気に入りボタンが機能するようになりますが、アプリを完成させるまでもう少し作業が残っています。

### app.js を編集する

<div class="yt-embed">
  <google-youtube
    videoid="prneaX8RwY0"
    width="16"
    height="9"
    rel="0"
    autoplay="0"
    fluid>
  </google-youtube>
</div>

&rarr; `app.js` を開き、ユーザーがタブを切り替えたときに `<post-list>` の表示を切り替えるタブ イベント ハンドラーを更新します。

    var tabs = document.querySelector('paper-tabs');

    /* 以下のコードを追加 */
    var list = document.querySelector('post-list');

    tabs.addEventListener('core-select', function() {
      list.show = tabs.selected;
    });

&rarr; `app.js` を保存します。

### post-list.html を編集する

&rarr; エディターで `post-list.html` を開きます。

&rarr; `<post-card>` 要素を作成するテンプレートを更新して、お気に入りを接続します。

```side-by-side
<template repeat="{{post in posts}}">
  <!-- 以下のコードを追加 -->
  <post-card
    favorite="{{post.favorite}}"
    on-favorite-tap="{{handleFavorite}}"
    hidden?="{{show == 'favorites' && !post.favorite}}">
  <!-- ここまで -->
    <img src="{{post.avatar}}" width="70" height="70">
    <h2>{{post.username}}</h2>
    <p>{{post.text}}</p>
  </post-card>
</template>
```

<ul class="side-by-side">
  <li><code>favorite=<wbr>"{{post.favorite}}"</code> は、カードの <code>favorite</code> 値を、<code>&lt;post-service&gt;</code> が所有する配列の値に結びつけます。</li>
  <li><code>on-favorite-tap</code> 属性は、<code>&lt;post-card&gt;</code> が起動する <code>favorite-tap</code> イベント用のハンドラーを設定します。</li>
  <li><code>hidden?=</code><wbr><code>"{{}}"</code> 式はブーリアン属性の特殊な構文で、バインディング式が真のとき、その属性を設定します。
 </li>
</ul>

`hidden` のバインディング式は、実際には、Messages タブと Favorites タブの切り替えを実施します。`hidden` 属性は標準的なHTML5 属性です。デフォルトのPolymer スタイルシートには、`hidden` をネイティブ サポートしていないブラウザのために、`hidden` を `display: none` としてスタイル化するルールが含まれています。

<hr>

<div class="yt-embed">
  <google-youtube
    videoid="aBbs3QUgFHs"
    width="16"
    height="9"
    rel="0"
    autoplay="0"
    fluid>
  </google-youtube>
</div>

&rarr; `favorite-tap` イベント用のイベント ハンドラーを `post-list.html` に追加します。

```side-by-side
<!-- 以下のコードを追加 -->
<script>
Polymer({
  handleFavorite: function(event, detail, sender) {
    var post = sender.templateInstance.model.post;
    this.$.service.setFavorite(post.uid, post.favorite);
  }
});
</script>
```

<ul class="side-by-side">
  <li><code>sender<wbr>.templateInstance<wbr>.model</code> は、テンプレート インスタンスの構築に使われるモデル データへの参照です。ここでは、<code>&lt;post-card&gt;</code> の作成に使われる <code>post</code> オブジェクトが含まれているので、その ID と <code>favorite</code>  値を取得することができます。</li>
  <li><code>this.$.service</code> は <code>&lt;post-service&gt;</code> 要素への参照を返します。カスタム要素の shadow DOM にある要素で、<code>id</code> 属性を持つものはすべて、<code>this.$</code> ディクショナリへ追加されます。このことを、<a href="//polymer-project.org/docs/polymer/polymer.html#automatic-node-finding">automatic node finding（自動ノード検索）</a>と呼びます。</li>
  <li>実際のソーシャル ネットワーキング サービスでは、<code>setFavorite</code> メソッドは、変更をサーバーに保存 します。ここではコンソール メッセージをログする以外は何もしません。</li>
</ul>

### アプリを実行する

`index.html` が開いていることを確認し、<img src="img/runbutton.png" class="icon"> ボタンをクリックします。これで終わりです！

うまくいっていれば、アプリケーションは以下のように表示されます。カードをもう一枚お気に入りに選んで、`Favorites` タブをクリックしてみてください。

<figure layout vertical center>
  <a href="//polymer-project.org/apps/polymer-tutorial/finished/" class="unquote-link">
    <img src="img/s5-app.png" alt="Finished tutorial">
  </a>
  <figcaption>
    スクリーンショットをクリックしてデモを表示
  </figcaption>
</figure>

うまく動かない場合は、`step-5` ディレクトリ内にある以下のファイルと自分のコードとを照らし合わせてみてください。

-   [`post-card.html`](https://github.com/robdodson/its-hackademic/blob/master/static/codelabs/1-polymer-first-app/PolymerApp/step-5/post-card.html)
-   [`post-list.html`](https://github.com/robdodson/its-hackademic/blob/master/static/codelabs/1-polymer-first-app/PolymerApp/step-5/post-list.html)
-   [`index.html`](https://github.com/robdodson/its-hackademic/blob/master/static/codelabs/1-polymer-first-app/PolymerApp/step-5/index.html)

### まとめ

このステップで学んだ内容:

- 宣言型のイベント ハンドラーを使う
- プロパティとメソッドを要素のプロトタイプに追加する
- 自動ノード検索を使う
