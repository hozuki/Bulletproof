# Bulletproof: An HTML5 Danmaku Player

Danmaku (弾幕) is a Japanese word for "live comment", a way video watchers interact with each other.
The meaning, coming from [bullet hell](//en.wikipedia.org/wiki/Shoot_%27em_up#Bullet_hell), is
a analogy of "live" comments going through the player like barrages. The original word danmaku
also means barrage (of military). With some technical support provided by some specific players
(usually web players), a skilled danamku maker can write programs to create special danmakus,
which started a kind of art of creating splendid danmakus. It was all started in [Niconico](http://www.nicovideo.jp/).

The target of this project is to create a danmaku player based on HTML5. Currently the whole project and
tests run on nw.js (node-webkit).

## Playing with Bulletproof

The source files are compiled. Browse `test/visual/index.html` in modern browsers to start selecting
test cases. The test cases are:

- A spinning 3-D ball (`3d-ball.js`);
- Green Dam Musume (`kanpai-green-dam.js`);
- Madoka and her friends (`kanpai-madoka.js`).

You are able to select the tests from the homepage. Source code of the tests can be found in `test/visual/test-scripts/`.

Want to see some screenshots? [Here they are.](../images/)

## Building

Before building, you will need [Node.js](https://nodejs.org/en/) and [NPM](https://www.npmjs.org/).

### Automated Building with Gulp

Gulp options are configured, so using Gulp is simple:

```bash
cd /path/to/project
npm install
gulp build
```

Generated files will be in `build` directory, with:

1. a `build/node` directory for using as a Node.js module;
2. a `Bulletproof-browser.js` for browsers;
3. a `Bulletproof-browser.min.js` and corresponding source mapping for
browsers under production environments.

### Manual Building with `tsc`

If you prefer the old-fashioned way, you have to obtain TypeScript via NPM:

```bash
$ npm install -g typescript
```

After installing, compile the TypeScript files:

```
$ cd /path/to/project
$ tsc -p .
```

Generated files will be in the same position where the TypeScript sources are.
Note that there are only loose CommonJS style JavaScript files generated in this way.

## Using Bulletproof in Projects

If the environment supports Node.js (e.g. NW.js), please `require()` the entry JavaScript file:

```javascript
var Bulletproof = require("./Bulletproof/build/node/index");
```

In other cases, please import the files using `<script>` tag:

```html
<script type="text/javascript" src="./Bulletproof/build/Bulletproof-browser.min.js"></script>
```

After either way of importing, the `Bulletproof` namespace can be accessed in global scope.
An example usage can be found [here](../../test/visual/index.js).

## Project Status

The project is in its alpha age now (oh yeah no pre-alpha again). The classes are not fully implemented yet,
but main features are active.

## Credits

[jabbany](//github.com/jabbany/)
