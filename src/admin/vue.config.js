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
    port: 20204,
    proxy: 'http://localhost:20203'
  },

  outputDir: path.join(__dirname, '../../app/public/admin'),
  indexPath: path.join(__dirname, '../../app/view/admin.ejs'),
  publicPath: '/admin/'
}
