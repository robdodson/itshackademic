<toc-element></toc-element>

アプリに使用できるコントロールをいくつか見てみましょう。

### 依存関係をインストールする

&rarr; まず、このステップで使用する依存関係をすべて一度にインストールします。以下のインポートを `codelab-app.html` に追加します。

    ...
    <link rel="import" href="bower_components/core-item/core-item.html">
    <link rel="import" href="bower_components/paper-toggle-button/paper-toggle-button.html">
    <link rel="import" href="bower_components/paper-icon-button/paper-icon-button.html">
    <link rel="import" href="bower_components/paper-slider/paper-slider.html">
    <link rel="import" href="bower_components/paper-toast/paper-toast.html">
    <link rel="import" href="bower_components/paper-button/paper-button.html">
    ...

### 選択されたメモの不透明度をpaper-toggle-button で切り替える

このボタンは、checked のとき、 選択されているメモの色を少し暗くします。

&rarr; `core-item` をドロワーに追加します。中には `paper-toggle-button` を入れます。
クラス `blue` を追加して、デフォルトのスタイルに少し変更を加えます。トグルの checked 状態を `fadeSelected` 変数にバインドします。

    <core-header-panel drawer>
      ...
      <core-item>
        <label flex>Fade out selected</label>
        <paper-toggle-button class="blue" checked="{{fadeSelected}}">
        </paper-toggle-button>
      </core-item>
    </core-header-panel>

&rarr; `data-fade-selected` 属性を `.content` div に追加し、これを `fadeSelected` 変数にバインドします。

    <div class="content" data-fade-selected="{{fadeSelected}}">

&rarr; `data-done` 属性を `.item` div に追加し、これを `done` 変数にバインドします。

    <template repeat="{{data}}" >
      <div ... class="item" data-done="{{done}}">
        ...
      </div>
    </template>

&rarr; 以下のルールを `styles.css` に追加します。

    *[data-fade-selected="true"] .item[data-done="true"] {
      opacity: 0.3;
    }

このルールは、`data-fade-selected` の値が true に設定されているコンテナ内の各メモについて、選択されている（"done" 状態の）各メモの不透明度を 0.3 に設定します。

<figure>
  <img src="img/s9-fade.png">
  <figcaption>トグル ボタンがオンのとき、選択されているカードが暗くなる</figcaption>
</figure>

### 削除ボタンを追加する

&rarr; `core-item` をもう1つ、`paper-icon-button` と共にドロワー内部に追加します。ボタンの `icon` 属性を `delete` に設定し、その `on-click` イベントを `delete` という名称のコールバックにバインドします。
    
    <core-item>
      <label flex>Delete selected</label>
      <paper-icon-button icon="delete" on-click="{{delete}}"></paper-icon-button>
    </core-item>

&rarr; `delete` コールバックをルート要素のプロトタイプに追加します。
これは、`data` 配列をフィルタリングし、「done」にまだなっていないメモだけを残す関数です。

    <script>
      Polymer({
        ...
        delete: function(e) {
          this.data = this.data.filter(function(item) {
            return !item.done;
          })
        }
      });
    </script>

&rarr; <img src="img/runbutton.png" class="icon"> ボタンでアプリのプレビューを表示します。
メモをいくつか選択して、ボタンを使って削除してみてください。

<figure>
  <img src="img/s9-delete.png">
  <figcaption>ごみ箱をクリックして、チェックの入ったカードを削除</figcaption>
</figure>


### フォント サイズ変更用のスライダーを追加する

&rarr; さらにもう 1 つ `core-item` を追加し、その中に `paper-slider` を入れます。
スライダーは div で囲み、`center horizontal layout` 属性を加えて水平に美しく配置されるようにします。
スライダーの `max` 属性を `32` に設定し、その `value` プロパティを `fontSize` 変数にバインドします。

    <core-item>
      <div center horizontal layout>
        <div>Font size</div>
        <paper-slider value="{{fontSize}}" max="32" editable></paper-slider>
      </div>
    </core-item>

&rarr; `fontSize` プロパティをルート要素のプロトタイプに追加します。`fontSizeChanged` コールバックを追加します。このコールバックは、すべての `.card` 要素を選択して、該当するフォントサイズにスタイルを変更します。
このコールバックは、`fontSize` の値が変わるたびに自動的に起動します。

    <script>
       Polymer({
        ...
        fontSize: 14,
        ...
        fontSizeChanged: function() {
          var cards = this.shadowRoot.querySelectorAll('.card');
          for (var i = 0; i < cards.length; i++) {
            cards[i].style.fontSize = this.fontSize + 'px';
          }
        }
      });
    </script>

&rarr; <img src="img/runbutton.png" class="icon"> ボタンでアプリのプレビューを表示します。
スライダーを使ってフォントサイズを変更してみて、カード表示が変わるのを確認してください。

<figure>
  <img src="img/s9-fontsize.png">
</figure>

### リセット ボタンを追加する

&rarr; 最後にもう1つ `core-item` を追加し、その中に `paper-button` を入れます。
`raised` 属性をボタンに追加し、そのテキストの中身を "reset" に設定します。
ボタンの `on-click` リスナーを、`reset` という名称のコールバックにバインドします。

    <core-item>
      <paper-button raised class="colored" on-click="{{reset}}">
        reset
      </paper-button>
    </core-item>

&rarr; `styles.css` を編集して、新しいボタン用のルールを追加します。

    paper-button[raised].colored {
      width: 100%;
      background: #4285f4;
      color: #fff;
      fill: #fff;
    }

&rarr; ルート要素のプロトタイプに `reset` コールバックを定義します。これは `fontSize` と `fadeSelected` を元の値に戻すものです。

    <script>
       Polymer({
        ...
        reset: function() {
          this.fontSize = 14;
          this.fadeSelected = false;
        }
      });
    </script>

### 通知を表示する

&rarr; ドロワー セクションの最後に `<paper-toast>` 要素を追加します。
ID を **toast** に、クラスを **capsule** にします。その `text` 属性を **'Settings have been reset!'**（設定はリセットされました！）に、`duration` 属性を 800 ミリ秒に設定します。

    <core-header-panel drawer>
      ...
      <paper-toast id="toast" class="capsule" text="Settings have been reset!"
                   duration="800"></paper-toast>
    </core-header-panel>

&rarr; `reset` コールバックにて、設定がリセットされるたびに toast 要素を起動するようにします。

    <script>
       Polymer({
        ...
        reset: function() {
          ...
          this.$.toast.show();
        }
      });
    </script>

&rarr; `index.html` を開き、<img src="img/runbutton.png" class="icon"> ボタンでアプリのプレビューを表示します。
リセット ボタンを押すと設定が元の値に戻り、通知がページの下部に表示されるはずです。

<figure>
  <img src="img/s9-reset.png" height="350px;">
  <figcaption>通知がポップアップする</figcaption>
</figure>

### まとめ

このステップで学んだ内容:

- `paper-toggle-button` コントロールを使う
- 美しくスタイル設定されたアイコン コントロール用の `paper-icon-button` を使う
- `paper-slider` コントロールを使って数値を変更する
- `paper-button` コントロールを使う
- `paper-toast` を使って通知を表示する

## 次のステップ

要素にペーパー効果を適用します。

