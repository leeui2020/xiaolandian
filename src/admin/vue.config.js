const path = require('path')

module.exports = {
  pluginOptions: {
    'style-resources-loader': {
      preProcessor: 'scss',
      patterns: [
        path.join(__dirname, 'src/styles/variables.scss')
      ]
    }
  },

  devServer: {
    proxy: 'http://localhost:20203'
  }
}
