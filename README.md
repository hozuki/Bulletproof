
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

## Building and Running

You will need [TypeScript](http://www.typescriptlang.org/) and [nw.js](http://nwjs.io). After installing, please
compile the TypeScript files:

```
tsc {path-to-project}/core/lib/bd.ts
tsc {path-to-project}/core/lib/fl.ts
tsc {path-to-project}/core/lib/flash.ts
tsc {path-to-project}/core/lib/mx.ts
tsc {path-to-project}/core/lib/mic.ts
tsc {path-to-project}/core/lib/org.ts
tsc {path-to-project}/core/lib/thirdparty.ts
```

And all the work is done.

You can launch with nw.js executable:

Windows:

```
nw.exe C:\path\to\Bulletproof\
```

(Or, just drag the project directory onto `nw.exe` and release the mouse.)

Mac/Linux:

```
nw /path/to/Bulletproof/
```

## Testing

The default page (`/core/index.html`) already included current testing code. One of the tests will show
up at launch.

Tests are:

- A spinning 3-D ball (`3d-ball.js`);
- Green Dam Musume (`kanpai-lbn.js`);
- Madoka and other Mahou Shoujos (`kanpai-madoka.js`).

Testing code samples can be found at `/test/` directory. You can view the tests by commenting and/or
uncommenting the `<script>` labels in `/core/index.html`.

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

## 安装与使用

请下载并安装 [TypeScript](http://www.typescriptlang.org/) 和 [nw.js](http://nwjs.io)。安装完毕后，首先编译 TypeScript 源文件：

```
tsc {项目路径}/core/lib/bd.ts
tsc {项目路径}/core/lib/fl.ts
tsc {项目路径}/core/lib/flash.ts
tsc {项目路径}/core/lib/mx.ts
tsc {项目路径}/core/lib/mic.ts
tsc {项目路径}/core/lib/org.ts
tsc {项目路径}/core/lib/thirdparty.ts
```

完成后就可以运行了。使用以下命令运行：

Windows:

```
nw.exe C:\path\to\Bulletproof\
```

（或者直接将工程目录拖放到 `nw.exe` 上，松开鼠标。）

Mac/Linux:

```
nw /path/to/Bulletproof/
```

## 测试

当前的主页（`/core/index.html`）就包含了各测试代码的引用。工程启动时就会运行测试样例。

当前包含的的测试样例有：

- 一个三维旋转的球（`3d-ball.js`）；
- 绿坝娘（`kanpai-lbn.js`）；
- 小圆脸和她愉快(?)的小伙伴们（`kanpai-madoka.js`）。

所有的测试样例都位于 `/test/` 目录下。如果想切换显示的样例，请注释、解除注释 `/core/index.html` 中的各 `<script>` 标签。

## 项目状态

目前是 pre-alpha 状态。实现进度较低，只有一些关键的 API 实现了。另外，现在对类的实现也比较混乱，沙箱还没做，代码中还有一些hack。

## 许可

[MIT 许可](http://mitlicense.org)

## 致谢

[jabbany](//github.com/jabbany/)
