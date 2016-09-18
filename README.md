
# Bulletproof

**Advanced danmaku render engine based on WebGL and other HTML 5 technologies**

**以 WebGL 和其他 HTML 5 技术为核心的高级弹幕渲染引擎**

You can also check out the live demo from <http://hozuki.github.io/Bulletproof>.

## Details

Coming soon...

## Building & Testing

Git, Node.js, NPM and Gulp are required.

```bash
$ git clone https://github.com/Hozuki/Bulletproof.git
$ git submodule update --init --recursive
$ npm install
$ gulp
```

To preview, at least one of modern browsers is required:
- Chrome
- NW.js
- Electron <sup>Has not been tested, but should work.</sup>
- Firefox
- Edge
- IE 11

Although all these browsers are supported, the order of the list shows the how the
experience will be. Chrome is greatly suggested since the performance on it is the best;
Firefox sometimes is slow; Edge and IE 11 always have serious performance degeneration.

## Features

- [x] High speed rendering
- [x] Cross browser compatibility
- [ ] Web video player interface
  - [x] `<video>`
  - [ ] WebChimera
- [ ] <del>Basic text danmakus</del> (ref: CommentCoreLibrary)
  - [ ] <del>Flying *(mode0)*</del>
  - [ ] <del>Anchored *(mode1 - mode6)*</del>
- [ ] <del>Custom text danmakus *(mode7)*</del> (ref: BiliBili HTML5 Player)
- [ ] Scripted danmakus *(mode8)*
  - [x] `Display`
  - [x] `Functions`
  - [x] `Global`
  - [ ] `Tween`
  - [x] `Player` (almost, `createSound()` and `setMask()` are in progress)
  - [x] `ScriptManager`
  - [x] `Utils`
  - [ ] External library: `Bitmap`
  - [ ] External library: `Storage`
  - [ ] Safety sandbox
- [ ] BiliBili XML parser

## TODO

- `DisplayObject.mask` (`Player.setMask()`)
- Easing (`Tween` and `ITween`, `$object.motion.easing`)
- Linking `Player` to [VideoPlayer](http://help.adobe.com/en_US/FlashPlatform/reference/actionscript/3/fl/video/VideoPlayer.html)
- `Player.createSound()`
- `Display.createButton()`
- Library: `Bitmap`
- `Display.createCanvas()`

## License

Bulletproof uses [The MIT License](http://mitlicense.org). A copy of it can be found [here](LICENSE.md).

A part of Bulletproof uses modifications based on [`webgl-utils.js`](//github.com/KhronosGroup/WebGL/blob/master/sdk/demos/common/webgl-utils.js). Its license file
can be found [here](docs/license/webgl-utils.txt).
