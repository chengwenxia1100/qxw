var merge = require('webpack-merge')
var prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
   WX_API: '"https://api.zhihuiqinxue.com/public/wechat/"',
   //WX_API: '"https://www.sgmacwx.top/public/wechat/"',
})
