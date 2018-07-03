# Simple danmakus

When Bulletproof started the animation loop, you can create and add danmakus to the stage.

Simple danmaku is a kind of danmaku that contains only text information. They are displayed as raw text, flying through the stage or fixing at a relative position.

## Creating simple danmakus

Creating a simple danmaku is quite easy. First, get the `SimpleDanmakuProvider` instance:

```javascript
var provider = bp.danmakuCoordinator.getDanmakuProvider(Bulletproof.danmaku.DanmakuKind.Simple);
```

This call returns a `SimpleDanmakuProvider` instance. `SimpleDanmakuProvider` a derived class of `DanmakuProviderBase`. In Bulletproof, there are various kinds of `DanmakuProviderBase` for managing different kinds of danmakus. They are registered and instantiated during `DanmakuCoordinator`'s initialization, and we should use the `DanmakuCoordinator.getDanmakuProvider()` function to retrieve the instance of a specific kind. In this example, we use `SimpleDanmakuProvider` to create text danmakus. The `DanmakuKind.Simple` enum declares that we want to retrieve the danmaku provider that manages simple danmakus.

Next we can add a simple danmaku to the stage:

```javascript
provider.addDanmaku("My first simple danmaku!");
```

If everything goes well, you will see a danmaku flying from right to left through the stage, and disappearing after 10 seconds. That's it.

## Styles of simple danmakus

You can control the danmaku style by giving different creating parameters. The `ISimpleDanmakuCreateParams` interface is defined as below:

```javascript
interface ISimpleDanmakuCreateParams {
    bornTime?:number;
    fontName?:string;
    fontStyle?:string;
    fontSize?:number;
    type?:SimpleDanmakuType;
    border?:boolean;
    borderColor?:number;
    borderThickness?:number;
    background?:boolean;
    backgroundColor?:number;
    textColor?:number;
    outline?:boolean;
    outlineColor?:number;
    outlineThickness?:number;
}
```

For example, you can call with:

```javascript
provider.addDanmaku("Styled danmaku", {
    textColor: 0xaa0000,
    outlineColor: 0xffffff
});
```

This time you will see a flying danmaku with white outline and red text, rather than the default black outline and white text. Detailed information of these fields are described below.

### `bornTime`

Manually overrides the time of appearance, in millisecods. For example, `15000` means this danmaku will enter the stage when the playback time is at 00:15.

If this parameter is not set, the danmaku will appear soon after it is created.

Example:

```javascript
{bornTime: 15000}
```

### `fontName`

Specifies the font name used for this danmaku. The name follows CSS font convention. Please note that quotes are not needed for font names with multiple words, because this situation is handled internally.

Default value is `"SimHei"` (the default sans-serif font for Simplified Chinese).

Example:

```javascript
{fontName: "Times New Roman"}
```

### `fontStyle`

Specifies the font style used for this danmaku. It follows CSS font convention.

Default value is `"bold"`.

Example:

```javascript
{fontStyle: "italic bold"}
```

### `fontSize`

Specifies the font size used for this danmaku.

Default value is `18`.

Example:

```javascript
{fontSize: 20}
```

### `type`

Specifies the danmaku type. This parameter controls how a simple danmaku is displayed on the stage. It is a value of `Bulletproof.danmaku.simple.SimpleDanmakuType` enum:

```javascript
enum SimpleDanmakuType {
    Flying = 0,
    Top = 1,
    Bottom = 2,
    TopLeft = 3,
    TopRight = 4,
    BottomLeft = 5,
    BottomRight = 6
}
```

The value `Flying` means the danmaku flies from right to left, and the rest means the danmaku fixes at that position.

Default value is `SimpleDanmakuType.Flying`.

Example:

```javascript
{type: Bulletproof.danmaku.simple.SimpleDanmakuType.Top}
```

### `border`

Specifies whether to display the border for this danmaku.

Default value is `false`.

Example:

```javascript
{border: false}
```

### `borderColor`

Specifies the color of the border of this danmaku. Please note that, if `border` is `false`, or `borderThickness` is less than or equals to `0`, this parameter is ignored because the border will not be drawn.

Default value is `0x000000` (black).

Example:

```javascript
{borderColor: 0xff00ff} // purple
```

### `borderThickness`

Specifies the thickness of the border of this danmaku. Please note that, when it is less than or equals to `0`, the border will not be drawn even if `border` is `true`.

Default value is `1`.

Example:

```javascript
{borderThickness: 1}
```

### `background`

Specifies whether to display a solid background for this danmaku.

Default value is `false`.

Example:

```javascript
{background: false}
```

### `backgroundColor`

Specifies the background color of this danmaku. Please note that, if `background` is `false`, this parameter is ignored because the background will not be drawn.

Default value is `0x000000` (black).

Example:

```javascript
{backgroundColor: 0x00ff00} // green
```

### `textColor`

Specifies the text color of this danmaku.

Default value is `0xffffff` (white).

Example:

```javascript
{textColor: 0x000055} // dark blue
```

### `outline`

Specifies whether to display the text outline for this danmaku.

Default value is `true`.

Example:

```javascript
{outline: true}
```

### `outlineColor`

Specifies the color of the text outline of this danmaku. Please note that, if `outline` is `false`, or `outlineThickness` is less than or equals to `0`, this parameter is ignored because the text outline will not be drawn.

Default value is `0x000000` (black).

Example:

```javascript
{outlineColor: 0xff00ff} // purple
```

### `outlineThickness`

Specifies the thickness of the text outline of this danmaku. Please note that, when it is less than or equals to `0`, the text outline will not be drawn even if `outline` is `true`.

Default value is `1`.

Example:

```javascript
{outlineThickness: 1}
```
