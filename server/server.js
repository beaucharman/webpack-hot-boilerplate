import express from 'express';
import path from 'path';
import webpack from 'webpack';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import webpackConfig from '../config/webpack.config';

const host = process.env.HOST || 'localhost';
const port = process.env.PORT || 4000;
const compiler = webpack(webpackConfig);
const app = express();

app.use(require('serve-static')(path.join(__dirname, '..', 'public')));

app.use(webpackDevMiddleware(compiler, {
  noInfo: true,
  publicPath: webpackConfig.output.publicPath,
}));
app.use(webpackHotMiddleware(compiler));

app.get('*', (req, res) => {
  res.status(200).sendFile(path.join(__dirname, '..', 'public', 'index.html'));
});

app.listen(port, host, (error) => {
  if (error) {
    console.error(error); //eslint-disable-line
    return;
  }
  console.info(`==> 🌎  Listening on port ${port}. Open up http://${host}:${port}/ in your browser.`); //eslint-disable-line
});
