# Basic danmaku layer controls

Each kind of danmaku has its own layer. Danmaku layer classes are derived from `DisplayObject`, so operations that can be done on `DisplayObject` can also apply on danmaku layers.

Danmaku layers can be accessed via `DanmakuProviderBase`. For example, to access the layer of simple danmakus:

```javascript
var provider = bp.danmakuCoordinator.getDanmakuProvider(Bulletproof.danmaku.DanmakuKind.Simple);
var layer = provider.danmakuLayer;
```

Common operations, such as tweaking alpha (opacity), applying filters, doing tranlation transforms, are all possible on danmaku layers.

```javascript
layer.alpha = 0.5; // semi-transparent
layer.y = bp.stage.stageHeight / 2; // moves to +50% stage height
```
