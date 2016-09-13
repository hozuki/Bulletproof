
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

- [X] High speed rendering
- [X] Cross browser compatibility
- [ ] Web video player interface
  - [X] `<video>`
  - [ ] WebChimera
- [ ] <del>Basic text danmakus</del> (ref: CommentCoreLibrary)
  - [ ] <del>Flying *(mode0)*</del>
  - [ ] <del>Anchored *(mode1 - mode6)*</del>
- [ ] <del>Custom text danmakus *(mode7)*</del> (ref: BiliBili HTML5 Player)
- [ ] Scripted danmakus *(mode8)*
  - [X] `Display`
  - [X] `Functions`
  - [X] `Global`
  - [ ] `Tween`
  - [ ] `Player`
  - [ ] `ScriptManager`
  - [X] `Utils`
  - [ ] External library: `Bitmap`
  - [ ] External library: `Storage`
  - [ ] Safety sandbox
- [ ] BiliBili XML parser

## License

Bulletproof uses [The MIT License](http://mitlicense.org). A copy of it can be found [here](LICENSE.md).

A part of Bulletproof uses modifications based on [`webgl-utils.js`](//github.com/KhronosGroup/WebGL/blob/master/sdk/demos/common/webgl-utils.js). Its license file
can be found [here](docs/license/webgl-utils.txt).
