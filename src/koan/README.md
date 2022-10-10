# シラバス検索のやり方

KOAN では未ログインであってもシラバス検索を行うことができる。

KOAN にシラバス検索リクエストを送る際は、Session Cookie (`Campus-Osaka`, `JSESSIONID`) に加えて`_flowExecutionKey`と呼ばれる値を送る必要がある。
Cookie はセッション毎に一定だが、`_flowExecutionKey`は POST リクエストを送るたびに変化する。

## 1. Session Cookie と最初の`_flowExecutionKey`を得るには

1. `https://koan.osaka-u.ac.jp/campusweb/campussquare.do?_flowId=SYW4201600-flow&locale=ja_JP`に GET リクエストを送る
2. `302 Found` が返ってくる
3. レスポンスヘッダから Cookie が得られる
4. レスポンスの`Location`ヘッダから `_flowExecutionKey` が得られる

## 2-a. シラバス検索ページの HTML を取得するには

`_flowExecutionKey`を得たときのリダイレクトを辿ると取得できる。手動で行う場合は以下の手順。

1. `https://koan.osaka-u.ac.jp/campusweb/campussquare.do?_flowExecutionKey=xxx`に GET リクエストを送る
   - Cookie を含める
2. `200 OK` が返ってくる

## 2-b. シラバス検索結果ページの HTML を取得するには

1. `https://koan.osaka-u.ac.jp/campusweb/campussquare.do`に`POST`リクエストを送る
   - `Content-Type`は`application/x-www-form-urlencoded`
   - Cookie を含める
   - リクエストボディに`_flowExecutionKey`を含める
2. `302 Found`が帰ってくる
3. レスポンスの`Location`ヘッダから新しい `_flowExecutionKey` が得られる

このリダイレクトを辿ると検索結果を取得できる。手動で行う場合は、得られた`_flowExecutionKey`を使って 2-a の手順を行う。
