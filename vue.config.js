const path = require('path')
const fs = require('fs')

// ngrokで取得したURLを共有するファイル
const hostFile = path.resolve(process.env.NGROK_FILE)

let publicHost = ''
let port = '8080'
try {
  const data = fs.readFileSync(hostFile, 'utf8')
  if (data) {
    publicHost = data.replace(/^https:\/\//, '').replace(/:\d+$/, '')
    port = data.replace(/^.*:/, '')
  }
} catch (error) {
  // ファイルがない場合のエラーはキャッチするが、ない場合はない場合で、そのまま処理を進めるため、無視していく
  // console.log(error)
}

module.exports = {
  devServer: {
    public: publicHost,
    port: port
  }
}
