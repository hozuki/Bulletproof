# “防弹” HTML5 弹幕播放器

中文解释起来就没那么费劲了，因为在中国国内已经很常见了。[百度百科词条](//baike.baidu.com/subview/1885531/11304309.htm)

为什么要起“防弹”这个名称呢？因为[左舷弹幕太薄了](http://zh.moegirl.org/%E5%B7%A6%E8%88%B7%E5%BC%B9%E5%B9%95%E5%A4%AA%E8%96%84%E4%BA%86)。

## 尝鲜

为了能让各位能直接看到测试效果，代码已经编译了。您可以使用比较新的浏览器（别用老 IE 和那些国产浏览器）在当前的测试主页（`test/visual/index.html`）显示的示例中选择。当前包含的的示例有：

- 一个三维旋转的球（`3d-ball.js`）；
- 绿坝娘（`kanpai-green-dam.js`）；
- 小圆脸和她愉♀快的小伙伴们（`kanpai-madoka.js`）。

所有的测试样例都位于 `test/visual/test-scripts` 目录下。

如果想看看运行截图的话，[这里就是](../images/)。

## 构建

构建过程需要 [Node.js](https://nodejs.org/en/) 和 [NPM](https://www.npmjs.org/)。

### 坐山观虎斗（误）的构建

自动化构建采用的是 Gulp，各种配置已经完成。只需要几行命令就可以自动构建：

```bash
$ cd {项目路径}
$ npm install
$ gulp build
```

然后在项目的 `build` 目录下会生成编译文件，包括：

1. `build/node` 目录，其文件组织设计为了将整个项目作为一个 Node.js 模块调用；
2. 可供浏览器运行的 `Bulletproof-browser.js`；
3. 在生产环境下运行的 `Bulletproof-browser.min.js` 和对应的代码映射文件。

### 事必躬亲的构建

想和命令行多纠缠一阵子的同学可以使用 TypeScript 的命令行程序编译。

安装 TypeScript 编译器到全局：

```bash
$ npm install -g typescript
```

安装完毕后，编译 TypeScript 源文件：

```bash
$ cd {项目路径}
$ tsc -p .
```

不过，这样生成的 `.js` 文件在原来的 `.ts` 文件所在目录中，只适用于普通的引用。

## 使用方法

对于支持 Node.js 的环境（例如 NW.js），可以使用 `require()` 函数导入：

```javascript
var Bulletproof = require("./Bulletproof/build/node/index");
```

在普通环境下，请使用 `<script>` 标签：

```html
<script type="text/javascript" src="./Bulletproof/build/Bulletproof-browser.min.js"></script>
```

在任何一种导入方式完成后，全局域中会添加一个 `Bulletproof` 命名空间。之后的使用示例可以来[这里](../../test/visual/index.js)看看。

## 项目状态

目前是 alpha 状态。一些关键的 API 实现了，沙箱还没做。

## 致谢

[jabbany](//github.com/jabbany/)
