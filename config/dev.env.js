var merge = require('webpack-merge')
var prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  WX_API: '"https://cs-api.chuanshui.com/mall/"',
})
