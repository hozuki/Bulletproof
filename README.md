
This readme contains both English and Simplified Chinese versions. 本说明包括英文和简体中文两个版本。

# Bulletproof: An HTML5 Danmaku Player (English)

Danmaku (弾幕) is a Japanese word for "live comment", a way video watchers interact with each other.
The meaning, coming from [bullet hell](//en.wikipedia.org/wiki/Shoot_%27em_up#Bullet_hell), is
a analogy of "live" comments going through the player like barrages. The original word danmaku
also means barrage (of military). With some technical support provided by some specific players
(usually web players), a skilled danamku maker can write programs to create special danmakus,
which started a kind of art of creating splendid danmakus. All started in [Niconico](http://www.nicovideo.jp/).

The target of this project is to create a danmaku player based on HTML5. Currently the whole project and
tests run on nw.js (node-webkit).

## Playing with Bulletproof

The source files are compiled. However, playing with the tests needs [nw.js](http://nwjs.io).
You can get it from its homepage. 

You can launch the tests with nw.js executable:

Windows:

```
nw.exe C:\path\to\Bulletproof\
```

(Or, just drag the project directory onto `nw.exe` and release the mouse.)

Mac/Linux:

```
nw /path/to/Bulletproof/
```

The homepage for testing (`/test/index.html`) already included current tests. They are:

- A spinning 3-D ball (`3d-ball.js`);
- Green Dam Musume (`kanpai-lbn.js`);
- Madoka and other Mahou Shoujos (`kanpai-madoka.js`).

You are able to select the tests from the homepage. Source code of the tests can be found in `/test/scripts/`.

## Building

Before building, you will need [Node.js](https://nodejs.org/en/) and [TypeScript](http://www.typescriptlang.org/).
TypeScript may be installed via [NPM](https://www.npmjs.org/):

```
npm install -g typescript
```

After installing, please compile the TypeScript files:

```
tsc {path-to-project}/core/lib/bulletproof.ts --out {path-to-project}/build/bulletproof.js --sourcemap --module commonjs --target es5
tsc {path-to-project}/core/lib/bulletproof-bilidanmaku.ts --out {path-to-project}/build/bulletproof-bilidanmaku.js --sourcemap --module commonjs --target es5
tsc {path-to-project}/core/lib/bulletproof-data-interface.ts --out {path-to-project}/build/bulletproof-data-interface.js --sourcemap --module commonjs --target es5
tsc {path-to-project}/core/lib/bulletproof-fl.ts --out {path-to-project}/build/bulletproof-fl.js --sourcemap --module commonjs --target es5
tsc {path-to-project}/core/lib/bulletproof-flash.ts --out {path-to-project}/build/bulletproof-flash.js --sourcemap --module commonjs --target es5
tsc {path-to-project}/core/lib/bulletproof-injector.ts --out {path-to-project}/build/bulletproof-injector.js --sourcemap --module commonjs --target es5
tsc {path-to-project}/core/lib/bulletproof-mic.ts --out {path-to-project}/build/bulletproof-mic.js --sourcemap --module commonjs --target es5
tsc {path-to-project}/core/lib/bulletproof-mx.ts --out {path-to-project}/build/bulletproof-mx.js --sourcemap --module commonjs --target es5
tsc {path-to-project}/core/lib/bulletproof-org.ts --out {path-to-project}/build/bulletproof-org.js --sourcemap --module commonjs --target es5
tsc {path-to-project}/core/lib/bulletproof-thirdparty.ts --out {path-to-project}/build/bulletproof-thirdparty.js --sourcemap --module commonjs --target es5
```

Generated files will be found in `/build/`.

## Project Status

The project is pre-alpha now. The classes are not fully implemented yet, and there are code hacks crawling.

## License

[MIT License](http://mitlicense.org/)

## Credits

[jabbany](//github.com/jabbany/)

# “防弹” HTML5 弹幕播放器 (中文)

中文解释起来就没那么费劲了，因为在中国国内已经很常见了。[百度百科词条](//baike.baidu.com/subview/1885531/11304309.htm)

为什么要起“防弹”这个名称呢？因为[左舷弹幕太薄了](http://zh.moegirl.org/%E5%B7%A6%E8%88%B7%E5%BC%B9%E5%B9%95%E5%A4%AA%E8%96%84%E4%BA%86)。

目前项目和测试的运行环境为 nw.js（node-webkit）。

## 尝鲜

为了各位能直接看到测试效果，代码已经编译了。您可以使用 [nw.js](http://nwjs.io) 来浏览。运行方式是：

Windows:

```
nw.exe C:\path\to\Bulletproof\
```

（或者直接将工程目录拖放到 `nw.exe` 上，松开鼠标。）

Mac/Linux:

```
nw /path/to/Bulletproof/
```

您可以在当前的测试主页（`/test/index.html`）显示的示例中选择。当前包含的的示例有：

- 一个三维旋转的球（`3d-ball.js`）；
- 绿坝娘（`kanpai-lbn.js`）；
- 小圆脸和她愉快(?)的小伙伴们（`kanpai-madoka.js`）。

所有的测试样例都位于 `/test/script/` 目录下。

## 编译

编译需要 [Node.js](https://nodejs.org/en/) 和 [TypeScript](http://www.typescriptlang.org/)。其中 TypeScript 可以通过 [NPM](https://www.npmjs.org/) 安装：

```
npm install -g typescript
```

安装完毕后，首先编译 TypeScript 源文件：

```
tsc {项目路径}/core/lib/bulletproof.ts --out {项目路径}/build/bulletproof.js --sourcemap --module commonjs --target es5
tsc {项目路径}/core/lib/bulletproof-bilidanmaku.ts --out {项目路径}/build/bulletproof-bilidanmaku.js --sourcemap --module commonjs --target es5
tsc {项目路径}/core/lib/bulletproof-data-interface.ts --out {项目路径}/build/bulletproof-data-interface.js --sourcemap --module commonjs --target es5
tsc {项目路径}/core/lib/bulletproof-fl.ts --out {项目路径}/build/bulletproof-fl.js --sourcemap --module commonjs --target es5
tsc {项目路径}/core/lib/bulletproof-flash.ts --out {项目路径}/build/bulletproof-flash.js --sourcemap --module commonjs --target es5
tsc {项目路径}/core/lib/bulletproof-injector.ts --out {项目路径}/build/bulletproof-injector.js --sourcemap --module commonjs --target es5
tsc {项目路径}/core/lib/bulletproof-mic.ts --out {项目路径}/build/bulletproof-mic.js --sourcemap --module commonjs --target es5
tsc {项目路径}/core/lib/bulletproof-mx.ts --out {项目路径}/build/bulletproof-mx.js --sourcemap --module commonjs --target es5
tsc {项目路径}/core/lib/bulletproof-org.ts --out {项目路径}/build/bulletproof-org.js --sourcemap --module commonjs --target es5
tsc {项目路径}/core/lib/bulletproof-thirdparty.ts --out {项目路径}/build/bulletproof-thirdparty.js --sourcemap --module commonjs --target es5
```

编译完成后，结果会保存在 `/build/` 目录。

## 项目状态

目前是 pre-alpha 状态。实现进度较低，只有一些关键的 API 实现了。另外，现在对类的实现也比较混乱，沙箱还没做，代码中还有一些hack。

## 许可

[MIT 许可](http://mitlicense.org)

## 致谢

[jabbany](//github.com/jabbany/)
