# openrec-chat-client

![trimOPENREC](https://user-images.githubusercontent.com/41167277/77768287-9ae6ce00-7085-11ea-9f92-092b7985a39a.gif)

### これは何か
OPENRECのコメントを放送画面に流したり、エールが届くと画面に演出を出すことができるツールです。

### 設定方法
* [URL Generator](https://tokjin.github.io/openrec-chat-client/)で、設定を入力します。
* 画面下部のOUTPUT URLをコピーします。
* OBSにブラウザソースとして読み込み、幅/高さを1920x1080に設定します。

### 仕様
* コメントが画面の右側から流れてくる。
* エールは画面の上側から落ちてくる。

### おまけ
* 副産物として[コメントビュワー](https://tokjin.github.io/openrec-chat-client/viewer.html)ができました。
* viewerにAutoStart=trueと渡すと、起動時に自動で接続を開始します。
* viewerにbouyomi=trueと渡すと、棒読みちゃん連携ができます。（棒読みちゃんに[WebSocketプラグイン](https://github.com/chocoa/BouyomiChan-WebSocket-Plugin)の導入が必要。更にローカル環境で実行する必要があるので、ダウンロードしてお使いください）

### 問い合わせ
[こちらのサイト](https://tokaisodachi.com/archives/2295)で詳しい使用方法を解説しております。

Issuesやプルリク気軽にして下さい。ただ私はエンジニアではないので期待に沿えるかはわかりません…！！

他、不明な点や追加してほしい機能などがあれば、気軽に[Twitter](https://twitter.com/jintokai)までご連絡ください。