# reactStarter-HotMiddlewareExpressJs

**Checkout the full Documentation on my website!**  
[scriptworld.net/reactStarter](https://scriptworld.net/tutorial/React-Hot-Loader-Express.html)

To start a tiny [react-app](https://reactjs.org) (with the new [ES6](http://es6-features.org/) features) I wanted to have a basic [hot-reload](https://github.com/gaearon/react-hot-loader) development server with an [expressJS](http://expressjs.com/) backend server, to handle API calls in the future.  
This should be bundled with [webpack](https://webpack.js.org) because it's the most popular and kinda easy to handle react in my opinion.

Since I couldn't find any good documentation on the internet, I decided to put all of this together with the newest versions out there in 2018.

Many react apps are created with [create-react-app](https://github.com/facebook/create-react-app) nowadays. This is really easy to get started, but once you want to configure the build syste just a little bit, it's time to eject the project. At this point it get's confusing because many beginners cant handle the ejected code.

## GitHub Repository

If you don't wann see my config files or read any explanation, just go ahead and fork / clone my GitHub Repository to start your own react journey.

[GitHub Repo](https://github.com/scriptworld-git/reactStarter-WebpackHotMiddlewareExpressJs)

## Starting your Server

The [NodeJs]() server will compile the client via webpack and serve it.  
There is no need for a second console which is serving the bundle via webpack.

```bash
$ npm start
```

## package.json

[Click me to see the full file!](https://github.com/scriptworld-git/reactStarter-WebpackHotMiddlewareExpressJs/blob/master/package.json)

This is the entry point of the project. Remember: the server will compile and serve the client.

```json
{
    "main": "server/index.js"
}
```

The `start` script can be executed without the `run` parameter. We use [nodemon](http://nodemon.io) to watch in our `server` directory for changes so the server is able to restart every time we change a file.  
There is no need to watch in our client directory, that's going to be done by webpack.  
To enable our `.babelrc` file (ES6 support), we have to tell nodemon to execute the index.js with `babel-node`.

```json
{
    "scripts": {
        "start": "nodemon --watch server --exec babel-node -- server/index.js",
        "test": "echo \"Error: no test specified\" && exit 1"
    }
}
```

Normal dependencies.

```json
{
    "dependencies": {
        "body-parser": "^1.18.2",
        "classnames": "^2.2.5",
        "express": "^4.16.3",
        "history": "^4.7.2",
        "path": "^0.12.7",
        "react": "^16.3.2",
        "react-dom": "^16.3.2",
        "react-router": "^4.2.0",
        "react-router-dom": "^4.2.2"
    }
}
```

Build / development dependencies.

```json
{
    "devDependencies": {
        "babel-cli": "^6.26.0",
        "babel-core": "^6.26.3",
        "babel-loader": "^7.1.4",
        "babel-plugin-react-html-attrs": "^2.1.0",
        "babel-plugin-transform-class-properties": "^6.24.1",
        "babel-plugin-transform-decorators-legacy": "^1.3.4",
        "babel-preset-es2015": "^6.24.1",
        "babel-preset-react": "^6.24.1",
        "babel-preset-stage-0": "^6.24.1",
        "nodemon": "^1.17.4",
        "open": "0.0.5",
        "webpack": "^4.8.3",
        "webpack-cli": "^2.1.3",
        "webpack-dev-middleware": "^3.1.3",
        "webpack-hot-middleware": "^2.22.1"
    }
}
```

## webpack.config.js

[Click me to see the full file!](https://github.com/scriptworld-git/reactStarter-WebpackHotMiddlewareExpressJs/blob/master/webpack.config.js)

First of all we have to define a variable so we can change the config file depending on `production` or `development` mode.

```javascript
var dev = process.env.NODE_ENV !== 'production';
```

Sourc maps will make our `bundle.js` way bigger. By choosing `none` in production mode, we can reduce the bundled js file by 90%.  
Also the webpack `mode` will do some nice predefined steps for us like uglifying the code so it becomes even more reduced.

```javascript
mode: dev ? 'development' : 'production',
devtool: dev ? 'inline-source-map' : 'none'
```

In developement mode we have to add the `webpack-hot-middleware/client` to our entry so react is able to accept the hot-reload.

```javascript
entry: dev
    ? [
          'webpack-hot-middleware/client',
          path.resolve(__dirname, 'client/index.js')
      ]
    : [path.resolve(__dirname, 'client/index.js')];
```

As our module loader we use `babel-loader` so webpack knows how to handle ES6 code.

```javascript
module: {
    rules: [
        {
            test: /\.jsx?$/,
            use: ['babel-loader'],
            include: [path.resolve(__dirname, 'client')]
        }
    ];
}
```

It's very important to set the `publicPath` to `/` because that is the path where express will server the bundle.js file.

```javascript
output: {
    path: path.resolve(__dirname, 'public'),
    publicPath: '/',
    filename: 'bundle.js'
}
```

We need to use these Modules to enable the Hot-Module-Replacement in development mode.

```javascript
plugins: dev
    ? [
          new webpack.NamedModulesPlugin(),
          new webpack.HotModuleReplacementPlugin()
      ]
    : [];
```

## .babelrc

[Click me to see the file on GitHub!](https://github.com/scriptworld-git/reactStarter-WebpackHotMiddlewareExpressJs/blob/master/.babelrc)

All the presets for our ES6 support are going to be set here.  
We also enable the new decorators to use `@decorator` later in our code.

```json
{
    "presets": ["es2015", "react", "stage-0"],
    "plugins": [
        "transform-decorators-legacy",
        "react-html-attrs",
        "transform-class-properties"
    ]
}
```

## react index.js

[Click me to see the full file!](https://github.com/scriptworld-git/reactStarter-WebpackHotMiddlewareExpressJs/blob/master/client/index.js)

This code snippet needs to be added after the `render()` function in our react-app.  
It accepts hot-reload requests from the browser.

```javascript
if (process.env.NODE_ENV !== 'production') {
    if (module.hot) {
        module.hot.accept();
    }
}
```

## express index.js

[Click me to see the full file!](https://github.com/scriptworld-git/reactStarter-WebpackHotMiddlewareExpressJs/blob/master/server/index.js)

As before in our webpack config, we also have to define the `development` variable.  
After that we can import all modules needed for our hot-reload plugin.  
Even though we enabled ES6 code, it's time to use the `require`, because `ìmport` statements can only be done at the top of the file.  
Since we wrap these up in the if statement, they are not at the top anymore.

```javascript
var dev = process.env.NODE_ENV !== 'production';

if (dev) {
    var webpackDevMiddleware = require('webpack-dev-middleware');
    var webpackHotMiddleware = require('webpack-hot-middleware');
    var webpack = require('webpack');
    var config = require('../webpack.config');
}
```

After setting up the express app we can use another middleware depending on the mode.  
We inject the `webpack-dev-middleware` so express will compile and serve the bundle.js file.

```javascript
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
```

All set up! If you have any trouble getting this started, maybe so a fresh clone of the repository or feel free to contact me.
