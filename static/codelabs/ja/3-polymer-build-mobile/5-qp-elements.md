<toc-element></toc-element>

このステップではアプリのメイン セクションに手を加え、メモの追加機能と一覧表示機能を追加します。


### メモ追加機能をサポートする

この機能を追加する方法:

1. メモを新規作成するカラフルな FAB（floating action button: フローティング アクション ボタン）を追加する
2. ペーパー入力フィールドを追加してメモの本体を定義する
3. 作成されたメモを保持するリスト データ構造を、ルート要素に追加する

&rarr; `codelab-app.html` にて、`paper-fab` 用の HTML Import を追加します。
    
    ...
    <link rel="import" href="bower_components/paper-fab/paper-fab.html">

&rarr; `paper-fab` ボタンを `main` セクションのツールバーに追加します。ボタンの `on-click` イベントを `showNewNoteInput` コールバックにバインドします。

    ...
    <core-header-panel main>
      <core-toolbar>
        ...
        <paper-fab icon="icons:add" on-click="{{showNewNoteInput}}"></paper-fab>
      </core-toolbar>
    </core-header-panel>

&rarr; `paper-fab` 用のルールを `styles.css` に追加します。

    paper-fab {
      background-color: #e0a30b;
      position: absolute !important;
      bottom: -27px;
      right: 1em;
      z-index: 10;
    }

&rarr; `.content` div を、`main` セクションの `<core-toolbar>` の後に追加します。

    <core-header-panel main>
      <core-toolbar>
        ...
      </core-toolbar>
      <div class="content"></div>
    </core-header-panel>

&rarr; `paper-input` 依存関係をインストールし、`paper-input` 要素を `.content` div に追加します。input 要素の ID は **newNoteInput** とします。`label` 属性を使って、input のラベルを定義します。`floatingLabel` 属性を使い、アクティブ時にはラベルがフィールド上に美しく浮くようにします。

    ...
    <link rel="import" href="bower_components/paper-input/paper-input.html">
    ...
    <div class="content">
      <paper-input id="newNoteInput"
                   floatingLabel
                   label="Add a new note"></paper-input>
    </div>

&rarr; `ready` コールバックにて、入力を非表示にします。この入力の非表示を解除する `showNewNoteInput` コールバックを定義します。

    <script>
      Polymer({
        ...
        ready: function() {
          this.$.newNoteInput.style.display = 'none';
        },
        showNewNoteInput: function() {
          this.$.newNoteInput.style.display = 'block';
        }
      });
    </script>

<aside class="callout">
  <b>コンポーネントのライフサイクル コールバック</b>
  <p>`Ready` は、あらかじめ定義されている [コンポーネントのライフサイクル コールバック](http://www.polymer-project.org/docs/polymer/polymer.html#lifecyclemethods)の一例です。要素のインスタンスが作成されるとコールされます。
</p>
</aside>

&rarr; input の値を変数 `newNote` にバインドします。`on-change` イベントを `add` コールバックにバインドします。

    ...
    <paper-input id="newNoteInput"
                 floatingLabel
                 label="Add a new note"
                 on-change="{{add}}"
                 value="{{newNote}}"></paper-input>
    ...

&rarr; `data` という名称の配列を要素のプロトタイプに追加し、すべてのメモを保持するようにします。メモは 1つ 1 つがオブジェクトで、`body` と `done` という 2 つのプロパティを持っています。

    <script>
      Polymer({
        data: [],
        ...
      });
    </script>

&rarr; `add` コールバックを追加して、新しいメモを `data` 配列に追加するようにします。
`newNote` バインディングを使って、メモ本体を入力から取得します。最後には入力フィールドをクリアして非表示にします。

    <script>
      Polymer({
        data: [],
        ...
        add: function() {
          if (this.newNote) {
            this.data.unshift({
              body: this.newNote,
              done: false
            });
            this.$.newNoteInput.style.display = 'none';
            this.$.newNoteInput.value = null;
          }
        }
      });
    </script>

&rarr; `index.html` を開き、<img src="img/runbutton.png" class="icon"> をクリックしてアプリのプレビューを表示します。`paper-fab` をクリックすると、`paper-input` が表示されるはずです。

<figure>
  <img src="img/s5-preview.png">
  <figcaption>アプリがだんだん形になってきました</figcaption>
</figure>

`data` 配列の値は、デベロッパー ツールのコンソールを使って調べることができます。

    document.querySelector('codelab-app').data;

### メモの一覧を表示する

`data` 配列にメモがいくつか追加されているとき、repeat ありの template を使用することで、アプリの `main` セクションにそれらのメモを表示させることができます。

&rarr; `codelab-app.html` にて、`paper-checkbox` 依存関係をインストールします。

    ...
    <link rel="import" href="bower_components/paper-checkbox/paper-checkbox.html">
    ...

&rarr; `paper-input` フィールドの後に、repeat ありの template を追加します。そこに `paper-checkbox` と `.card` div を入力して、メモを `data` 配列から表示させるようにします。
このテンプレートは、リストにあるアイテムごとに繰り返されます。それぞれのアイテムはオブジェクトで、その `body` と `done` プロパティは、それぞれ {{body}} と {{done}} としてアクセス可能です。これらの変数を使用して、`paper-checkbox` の `checked` 属性と、`.card` div の中身を追加します。

    <div class="content">
      ...
      <template repeat="{{data}}" >
        <div center horizontal layout class="item">
          <paper-checkbox checked="{{done}}"></paper-checkbox>
          <div flex class="card">
            <p>{{body}}</p>
          </div>
        </div>
      </template>
    </div>

&rarr; `.item` と `.card` div のスタイルを `styles.css` に追加します。

    .item {
      margin: 1em;
    }

    .card {
      width: 300px;
      background-color: #fff;
      padding: 1em;
      position: relative;
    }

&rarr; `index.html` を開き、<img src="img/runbutton.png" class="icon"> ボタンでアプリのプレビューを表示します。メモ一覧を持つテンプレートは要素の `data` 属性にバインドされているため、新しいメモを追加すると自動的に一覧表示されます。

<figure>
  <img src="img/s5-listtasks.png">
  <figcaption>アプリに一覧表示されたメモ</figcaption>
</figure>

### まとめ

このステップで学んだ内容:

- `paper-fab`、`paper-input`、`paper-checkbox` 要素を使用する
- repeat ありの template を使ってアイテムの一覧を表示する
- データ バインディングを使い、表示されている一覧を自動更新する

## 次のステップ

ページの再読み込みのたびに新しいメモを追加するのは面倒なので、メモをローカル ストレージに保存するようにしましょう。
