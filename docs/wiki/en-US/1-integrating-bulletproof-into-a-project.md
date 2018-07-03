# Import Bulletproof into a project

Bulletproof follows CommonJS module specification (as Node.js does) and is packed for common browsers using [Browserify](?). So Bulletproof provides 2 versions of code distribution, one for Node.js, and one for all modern browsers.

## The Node.js version

This version is for browsers with integrated Node.js environments, such as [NW.js](http://nwjs.io/) and [Electron](?).

These browsers can use Node.js modules. First install Bulletproof using NPM:

```bash
$ npm install bulletproof --save
```

After installing, it can be imported as a module:

```javascript
var Bulletproof = require("bulletproof");
```

Now you can use the `Bulletproof` namespace in your code.

## The common version

This version is for all modern browsers. It is also suitable for browsers with integrated Node.js environments. However, common modern browsers, such as Chrome and Firefox, must use this version.

There is a `Bulletproof-browser.js` and a `Bulletproof-browser.min.js` in the `build` directory of Bulletproof. They can be imported using `<script>` tag:

```html
<script type="text/javascript" src="bulletproof/build/Bulletproof-browser.min.js"></script>
```

When the page is loaded, Bulletproof will automatically mount the `Bulletproof` namespace to the global scope.
