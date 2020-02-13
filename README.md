### Breakout Game

## Deployed with surge

[https: http://break-out-j-g.surge.sh/](http://break-out-j-g.surge.sh/)

#### Packages installed
* Bundle.js
* Babel
* lite-server - not working currently

### Ways of compacting
* Bundler
* Minify.js
* Uglify.js
* bundle.js
* Babel.js

### Webpack setup

1. installing webpack

```
npm install --save-dev webpack webpack-cli
```

2. Then make these folders in root directory of project

* src (contains the code you write)
* dist (holds code you will distribute)

3. Then make a webpack.config.js file and add this to it. Don't worry it doesn't work yet because I don't have babel installed yet to convert es6 to es5.... (Go to the babel setup here right after this then come back) <strong>If you aren't using es6 then don't skip</strong>

```
const path = require('path');
module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
};
```

4. Welcome back from the babel setup :). Then Add this into the package.json in the scripts section like this....

```
{
 ...
 "scripts": {
 "test": "echo \"Error: no test specified\" && exit 1"
 "develop": "webpack --mode development --watch",
 "build": "webpack --mode production"
 },
 ...
}
```

5. Now lets deploy the application

* first lets build it
```
npm run build
```
* now lets deploy it with surge
```
npm install surge --save
```
* now put the CNAME file into dist folder and add a catchy title....
* Then run this command it'll work

```
surge dist
```

### babel setup with webpack vanilla js

1. Added in a .babelrc file to root directory
2. npm install these

```
npm install --save-dev @babel/core @babel/preset-env 
npm install --save-dev babel-loader
npm install @babel/plugin-proposal-class-properties --save-dev
```
3. Then update your webpack.configh.js file with if your src has a different name configure to your standard

```
const path = require('path');

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
  //this is what you add into it
  module: {
    rules: [
      {
        test: /\.(js)$/,
        exclude: /node_modules/,
        use: ['babel-loader'],
      },
    ],
  },
  //right here it adds in babel
};
```

4. Then update your .babelrc with this 

```
{
    "presets": [
      "@babel/preset-env"
    ],
    "plugins": [
        [
          "@babel/plugin-proposal-class-properties"
        ]
    ]
}
```
