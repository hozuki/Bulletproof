# Set up the environment

Before using Bulletproof, it is essential to set up the correct environment for it. As I have mentioned, Bulletproof employs several new web features, so it is a good way to carefully perform initialization.

In the last section, we have imported Bulletproof to a project. Now the `Bulletproof` namespace is available in the global scope.

```javascript
if (typeof Bulletproof === "undefined") {
    console.warn("Bulletproof is not successfully imported.");
}
```

Bulletproof has a fantastic feature to detect whether itself is functional under current browser.

```javascript
if (Bulletproof.isSupported()) {
    // Normal initialization here
} else {
    console.warn("It seems that the browser does not support Bulletproof.");
}
```

Bulletproof provides several options. Correct values should be set before creating the main `Bulletproof` object. For example, if you want to remove code danmaku support for security reasons, just disable it:

```javascript
Bulletproof.configuration.scriptedDanmakuEnabled = false;
```

For the full list and description of options, please see [Bulletproof options](3-bulletproof-options.md). Once after a `Bulletproof` object is created, it has its own copy of global configuration as the `config` property.

Now create a `Bulletproof` object and initialize it. It is a little confusing that `Bulletproof` is the name of namespace, as well as the main class `Bulletproof.Bulletproof`. Just remember, everything in Bulletproof is under `Bulletproof` namespace, so adding a `Bulletproof.` prefix is a defensive way.

```javascript
var bp = new Bulletproof.Bulletproof();
bp.initialize(682, 483);
```

The two arguments are the width and height of stage. I chose `(682, 483)` because it is the default stage size of BiliBili's player.

Assume that there is a `<div>` element whose ID is `bulletproof-container`, just like this:

```html
<div id="bulletproof-container"></div>
```

We are going to insert the HTML elements created by Bulletproof to the page.

```javascript
var container = document.getElementById("bulletproof-container");
container.appendChild(bp.videoView);
bp.videoView.style.position = "absolute";
bp.videoView.style.zIndex = "1";
container.appendChild(bp.view);
bp.view.style.position = "absolute";
bp.view.style.zIndex = "9999";
```

Remember that we did not disable the creation of video player, so we inserted `bp.videoView` in addition to `bp.view`. If you only need the danmaku layer, you can disable the creation of video player and ignore the insertion of `bp.videoView`.

And why should we set the `style` properties? Can we ignore those lines? Unfortunately, you have to keep them if you are using the video player. Those styles are set for keeping correct layer composition order, so that the danmaku layer will float on the video layer. Again, if you do not want to use the video player, you can just simply insert `bp.view`, and ignore the rest.

With a final line, we will fuel up and start Bulletproof:

```javascript
bp.startAnimation();
```

Hurray! However, at this point, you will only see a blank area on the page. Next time we should start adding danmakus into the stage.

For a better visual experience, you can use a black `<div>` for background so it will tell where to expect for danmakus, especially when you are not playing a video. Here is an example.

HTML:

```html
<div id="bulletproof-container">
    <div class="absolute black-background" style="width: 682px; height: 438px; z-index: 0;"></div>
</div>
```

CSS:

```css
.black-background {
    background-color: black;
}

.absolute {
    position: absolute;
}

#bulletproof-container {
    display: inline-block;
    position: relative;
}
```

JavaScript (after `<div>`):

```javascript
if (typeof Bulletproof === "undefined") {
    console.warn("Bulletproof is not successfully imported.");
} else {
    if (!Bulletproof.isSupported()) {
        console.warn("It seems that the browser does not support Bulletproof.");
    } else {
        var bp = new Bulletproof.Bulletproof();
        bp.initialize(682, 483);
        var container = document.getElementById("bulletproof-container");
        container.appendChild(bp.videoView);
        bp.videoView.style.position = "absolute";
        bp.videoView.style.zIndex = "1";
        container.appendChild(bp.view);
        bp.view.style.position = "absolute";
        bp.view.style.zIndex = "9999";
        bp.startAnimation();
    }
}
```
