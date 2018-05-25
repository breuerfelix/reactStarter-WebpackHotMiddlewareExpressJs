import express from 'express';
import path from 'path';
import open from 'open';

import bodyParser from 'body-parser';

var dev = process.env.NODE_ENV !== 'production';

if (dev) {
    var webpackDevMiddleware = require('webpack-dev-middleware');
    var webpackHotMiddleware = require('webpack-hot-middleware');
    var webpack = require('webpack');
    var config = require('../webpack.config');
}

const port = 3000;
const app = express();
app.listen(port, function(error) {
    if (error) {
        console.log(error);
    } else {
        open(`http://localhost:${port}`);
    }
});

if (dev) {
    const compiler = webpack(config);

    app.use(
        webpackDevMiddleware(compiler, {
            hot: true,
            noInfo: true,
            publicPath: config.output.publicPath
        })
    );

    app.use(webpackHotMiddleware(compiler));
}

app.use(bodyParser.json());

//static files
app.use(express.static(path.resolve(__dirname, '../public')));

//all other requests
app.get('/*', function(req, res) {
    res.sendFile(path.join(__dirname, '../public/index.html'));
});
