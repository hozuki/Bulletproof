
# Bulletproof

**Advanced danmaku render engine based on WebGL and other HTML 5 technologies**

**以 WebGL 和其他 HTML 5 技术为核心的高级弹幕渲染引擎**

You can also check out the live demo from <http://hozuki.github.io/Bulletproof>.

## Details

Coming soon...

## Building & Testing

Git, Node.js, NPM and Gulp are required.

```shell
$ git clone https://github.com/hozuki/Bulletproof.git
$ npm install
$ git submodule update --init --recursive
$ cd lib/glantern
$ npm install
$ cd ../../
$ gulp
```

To preview, at least one of modern browsers is required:
- Chrome (50-60 fps)
- NW.js (50-60 fps)
- Electron <sup>Has not been tested, but should work.</sup>
- Firefox (40-60 fps)
- Edge (~24 fps)
- IE 11 (~20 fps)
- Chrome for Android (~16 fps)

Although all these browsers are supported, the order of the list shows the how the
experience will be. Chrome is greatly suggested since the performance on it is the best;
Firefox sometimes is slow; Edge and IE 11 always have serious performance degeneration.

## Features

- [x] High speed rendering
- [x] Cross browser compatibility
- [ ] Web video player interface
  - [x] `<video>`
  - [ ] WebChimera
- [ ] <del>Basic text danmakus</del> (ref: [CommentCoreLibrary](https://github.com/jabbany/CommentCoreLibrary))
  - [ ] <del>Flying *(mode 0)*</del>
  - [ ] <del>Anchored *(mode 1 - mode 6)*</del>
- [ ] <del>Custom text danmakus *(mode 7)*</del> (ref: [BiliBili HTML5 Player](http://www.bilibili.com/html/help.html#p))
- [ ] Scripted danmakus *(mode 8)*
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
