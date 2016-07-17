
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

To preview, at least one of the modern browsers is required: Chrome, Firefox, IE11,
Edge, NW.js, Electron<sup>i</sup>.

<sup>i</sup> Has not been tested, but should work.

## Features

- [X] High speed rendering
- [X] Cross browser compatibility (Chrome, Firefox, IE11, Edge)
- [ ] Web video player interface
  - [X] `<video>`
  - [ ] WebChimera
- [ ] Basic text danmakus
  - [ ] Flying
  - [ ] Anchored
- [ ] Custom text danmakus
- [ ] Scripted danmakus
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

Bulletproof employs [The MIT License](http://mitlicense.org). A copy of it can be found [here](LICENSE.md).

Part of Bulletproof uses modifications based on [`webgl-utils.js`](//github.com/KhronosGroup/WebGL/blob/master/sdk/demos/common/webgl-utils.js). Its license file
can be found [here](docs/license/webgl-utils.txt).
