// 事前にngrokのダウンロードとauthtoken処理を行ってください。
// https://ngrok.com/

// 引数に転送元のポート番号を求める。未設定ならデフォルト「8080」を指定する
let port = 8080
if (process.argv[2]) {
  port = process.argv[2]
}

// 情報を共有するためのファイル名は、環境変数から取得する
const path = require('path')
const hostFile = path.resolve(process.env.NGROK_FILE)

// ngrokの実行前に、Ctrl-Cで終了された場合のエラーハンドリングを設定します。
const fs = require('fs');
process.on('SIGINT', async (err) => {
  const errUnlink = await fs.unlinkSync(hostFile)
  if(errUnlink) {
    console.log(errUnlink)
  }
});


const ngrok = require('ngrok');
(async () => {
  // ngrokを起動する
  const url = await ngrok.connect(port)
  // 起動後のURLをコンソール出力する
  console.log(url)
  // ファイルに書き出す(ngrokで公開中のURL + port番号)
  fs.writeFileSync(hostFile, url + ':' + port, err => {
    if (err) {
      console.log(err)
    }
  })
})();