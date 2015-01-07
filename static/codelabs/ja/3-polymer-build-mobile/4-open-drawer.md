<toc-element></toc-element>

アプリをモバイル端末上で見ると、ドロワーはデフォルトで非表示になっていることに気づくでしょう。ユーザーがメニュー ボタンをクリックすると開き、外側をタップすると閉じるようにしましょう。

### モバイル端末使用時向けに、ドロワーを開く機能を追加する

この機能を追加する方法:

1. ID をドロワーに追加する
2. クリック イベント リスナーをメニューボタンに追加して、ドロワーが切り替わるようにする

&rarr; ID **drawerPanel** をドロワーに追加します。

    ...
    <core-drawer-panel id="drawerPanel">
    ...

<aside class="callout">
  <b>Web Components および Polymer における ID </b>
  <p>Web Components では、ID はローカルなもので、自身を含んでいる要素にスコープ されます。そのため、カスタム要素がページに複数回現れる場合でも、ID をカスタム要素内で安心して使用できます。Polymer も <code>this.$.myIdName</code> という便利なメソッドを提供していて、Polymer 要素内部の子を ID で簡単に見つけることができます。</p>
</aside>


&rarr; `on-click` リスナーを `<paper-icon-button icon="menu">` ボタンに追加します。これをルート要素の `toggleDrawer` メソッドにバインドします（メソッドはこの後で定義します）。

    ...
    <paper-icon-button icon="menu" on-click="{{toggleDrawer}}"></paper-icon-button>
    ...

<aside class="callout">
  <b>onClick ではなく、なぜ on-click なのか？</b>
  <p>
Polymer は、コンポーネントにおいてイベントとメソッドの宣言型バインディングをサポートしています。このバインディング動作のトリガーには、特殊な `on-event` 構文が使用されています。
詳しくは、[宣言型のイベント マッピング](http://www.polymer-project.org/docs/polymer/polymer.html#declarative-event-mapping)を参照してください。</p>
</aside>

&rarr; `toggleDrawer` メソッドを `codelab-app` 要素のプロトタイプに追加します。
Polymer の `this.$.myIdName` という簡略表記を使って `core-drawer-panel` 要素にアクセスします。その `togglePanel` メソッドを使い、ドロワーのオープンを委託します。`core-drawer-panel` の API について詳しくは、こちらの[ドキュメント](https://www.polymer-project.org/docs/elements/core-elements.html#core-drawer-panel)を参照してください。

    <script>
      Polymer({
        toggleDrawer: function() {
          this.$.drawerPanel.togglePanel();
        }
      });
    </script>

&rarr; **index.html** ファイルを選択して、<img src="img/runbutton.png" class="icon"> ボタンでアプリのプレビューを表示します。
*Developer Tools* の *Emulation* タブにて、ドロップダウンから *Nexus 5* を選び、*Emulate* をクリックします。

&rarr; ページを再読み込みします。ドロワーはデフォルトで非表示になっているはずです。ツールバーのメニュー ボタンをクリックしてみてください。その都度、ドロワーが開いたり閉じたりするはずです。

<aside class="callout">
<b>v0.5.1 の新機能</b>
<p>
`core-drawer-toggle` 属性を `paper-icon-button` に追加するだけで、ドロワーを切り替えられるようになりました。`core-drawer-toggle` を `paper-icon-button` に追加して、`on-click` と `toggleDrawer` メソッドを削除してみてください。そして、以前と同じ動きになるか確かめてください。
</p>
</aside>

### まとめ

このステップで学んだ内容:

- Polymer の要素コールバックを使って要素をインタラクティブにする
- `this.$.myIdName` 表記を使ってページ上で要素を探す
- 要素の API にてメソッドを使用する

## 次のステップ

ペーパー要素を追加して、アプリにメモ を表示させます。
