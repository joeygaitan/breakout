### Breakout Game

## Deployed with surge

url: breakout-j-g.surge.sh

#### Packages installed
* Bundle.js
* Babel
* lite-server

### Ways of compacting
* Bundler
* Minify.js
* Uglify.js
* bundle.js
* Babel.js

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