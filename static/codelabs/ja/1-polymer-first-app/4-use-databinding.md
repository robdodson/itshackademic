<toc-element></toc-element>

アプリに投稿が 1 件表示されましたが、少しさみしい感じがします。このステップでは、ウェブ サービスからデータを引っ張って来て、Polymer のデータ バインディングを使用してデータを一連のカードにして表示させます。

データの取得には、スターター アプリの中で提供されている `<post-service>` 要素を使用します。この要素は、架空のソーシャル ネットワーク用の非常にシンプルな API です。 このセクションでは、`posts` プロパティを使います。このプロパティは、以下のような `post` オブジェクトの配列を返します。


    {
      "uid": 2,
      "text" : "Loving this Polymer thing.",
      "username" : "Rob",
      "avatar" : "../images/avatar-02.svg",
      "favorite": false
    }

このステップで学ぶ内容:

-   データ バインディングを使用する
-   プロパティを公開する

### `<post-list>` 要素を編集する

<div class="yt-embed">
  <google-youtube
    videoid="kbluOc97TJk"
    width="16"
    height="9"
    rel="0"
    autoplay="0"
    fluid>
  </google-youtube>
</div>

&rarr; エディターで `post-list.html` ファイルを開きます。

```side-by-side
<link rel="import" href="../components/polymer/polymer.html">
<link rel="import" href="../post-service/post-service.html">
<link rel="import" href="post-card.html">

<polymer-element name="post-list" attributes="show">
  <template>
    <style>
    :host {
      display: block;
      width: 100%;
    }
    post-card {
      margin-bottom: 30px;
    }
    </style>
    
    <!-- マークアップをここに追加 -->
...
```

<ul class="side-by-side">
  <li>ファイルには <code>&lt;post-service&gt;</code> 要素用のインポートがすでに含まれていますので、すぐに使用できる状態です。</li>
  <li><code>attributes="show"</code> 属性は、<code>show</code> という名前の<a href="//polymer-project.org/docs/polymer/polymer.html#published-properties"> <em>published property（公開プロパティ）</em></a>を作成します。
  </li>
</ul>

<a href="//polymer-project.org/docs/polymer/polymer.html#published-properties"> <em>公開プロパティ</em></a> は、属性を使用してマークアップで設定することもできれば、双方向のデータ バインディングを使用して別のプロパティに接続することもできます。この `show` プロパティは後のステップで使用します。

<hr>

#### `<post-service>` を接続する

<div class="yt-embed">
  <google-youtube
    videoid="Eia83Eg1A5c"
    width="16"
    height="9"
    rel="0"
    autoplay="0"
    fluid>
  </google-youtube>
</div>

&rarr; `<post-service>` 要素を、要素の `<template>` の中に追加します。

```side-by-side
<!-- マークアップをここに追加 -->
<post-service id="service" posts="{{posts}}">
</post-service>
```

<ul class="side-by-side">
  <li>
    <code>posts="{{posts}}"</code> 属性は、<code>&lt;post-service&gt;</code> 要素と <code>&lt;post-list&gt;</code> 要素との間に双方向のデータ バインディングを追加します。
  </li>
</ul>

[_データ バインディング_](//polymer-project.org/docs/polymer/databinding.html) は、サービス要素の `posts` プロパティをローカル プロパティ（これもここでは `posts` と呼ばれる）にリンクさせます。カスタム要素に定義するメソッドはいずれも `this.posts` として、そのレスポンスにアクセスできます。

<hr>

#### カードのダイナミックリストを表示する

&rarr; 以下の `<div>` と `<template>` タグを追加します。

```side-by-side
<post-service id="service" posts="{{posts}}">
</post-service>

<!-- 以下のコードを追加: -->
<div layout vertical center>

  <template repeat="{{post in posts}}">
    <post-card>
      <img src="{{post.avatar}}" width="70" height="70">
      <h2>{{post.username}}</h2>
      <p>{{post.text}}</p>
    </post-card>
  </template>
  
</div>
```

 <ul class="side-by-side">
   <li>この新しい構文 <code>repeat="{{post in posts}}"</code> は、テンプレートに対し、 <code>posts</code> 配列の各項目について新しいインスタンスを作成するよう指示します。</li>
   <li>それぞれのテンプレート インスタンスでは、個々のバインディング（<code>{{post.avatar}}</code>など）は、その項目の該当する値によって置き換えられます。</li>
 </ul>

<hr>

#### `<post-list>` 要素を `index.html` にインポートする

<div class="yt-embed">
  <google-youtube
    videoid="Uwl8GtxLJCQ"
    width="16"
    height="9"
    rel="0"
    autoplay="0"
    fluid>
  </google-youtube>
</div>

&rarr; `index.html` を開き、`post-list.html` のインポート リンクを追加します。以下のように、`post-card` の既存のリンクを置き換えることができます。

```
<link rel="import" href="../components/paper-tabs/paper-tabs.html">
<!-- 以下のインポートを追加 -->
<link rel="import" href="post-list.html">
```

<hr>

#### `<post-list>` 要素を使用する

&rarr; 前のステップで追加した `<post-card>` 要素を探し、これを `<post-list>` で置き換えます。

    <div class="container" layout vertical center>
      <!-- post-card を post-list で置き換える -->
      <post-list show="messages"></post-list>
    </div>


### アプリを実行する

`index.html` が開いていることを確認し、<img src="img/runbutton.png" class="icon"> ボタンをクリックします。アプリケーションは以下のように表示されるはずです。

<div layout vertical center>
  <img class="sample" src="img/s4-app.png">
</div>

何か問題がある場合は、`step-4` フォルダー内にある以下のファイルと自分のコードとを照らし合わせてみてください。

-   [`post-list.html`](https://github.com/robdodson/its-hackademic/blob/master/static/codelabs/1-polymer-first-app/PolymerApp/step-4/post-list.html)
-   [`index.html`](https://github.com/robdodson/its-hackademic/blob/master/static/codelabs/1-polymer-first-app/PolymerApp/step-4/index.html)

<aside class="callout">
  <b>さらに試してみる:</b>

  <p>`post-service.html` を開いて、コンポーネントがどのように動くか確認してください。内部的には、<code> <a href="//polymer-project.org/docs/elements/core-elements.html#core-ajax">&lt;core-ajax&gt;</a></code> 要素を使って HTTP リクエストを行っています。</p>
</aside>

### まとめ

このステップで学んだ内容:

- データ バインディングを使用する
- プロパティを公開する

### 次のステップ

仕上げをします。
