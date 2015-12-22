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

您可以在当前的测试主页（`test/index.html`）显示的示例中选择。当前包含的的示例有：

- 一个三维旋转的球（`3d-ball.js`）；
- 绿坝娘（`kanpai-lbn.js`）；
- 小圆脸和她愉快(?)的小伙伴们（`kanpai-madoka.js`）。

所有的测试样例都位于 `test/script/` 目录下。

## 编译

编译需要 [Node.js](https://nodejs.org/en/) 和 [TypeScript](http://www.typescriptlang.org/)。

TypeScript 可以通过 [NPM](https://www.npmjs.org/)（较新版本的 Node.js 自带 NPM）安装：

```
npm install -g typescript
```

安装完毕后，编译 TypeScript 源文件：

```
cd {项目路径}
tsc -p .
```

## 项目状态

目前是 pre-alpha 状态。实现进度较低，只有一些关键的 API 实现了。另外，现在对类的实现也比较混乱，沙箱还没做，代码中还有一些hack。

## 许可

[MIT 许可](http://mitlicense.org)

## 致谢

[jabbany](//github.com/jabbany/)
