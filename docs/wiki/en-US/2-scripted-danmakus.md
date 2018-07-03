# Scripted danmakus

When Bulletproof started the animation loop, you can create and add danmakus to the stage.

Scripted danmaku is a kind of danmaku that runs a custom script. These scripts usually contains source code for low-level rendering control.

Scripts in scripted danmakus uses the syntax of ActionScript 3. The scripts can only access a limited set of Flash APIs, mostly provided by the web player.

**WARNING: KEEP SECURITY IN MIND WHEN EVALUATING SCRIPTS IN SCRIPTED DANMAKUS!**

Creating scripted danmakus is also easy. This time we shall get the `ScriptedDanmakuProvider` instance:

```javascript
var provider.danmakuCoordinator.getDanmakuProvider(Bulletproof.danmaku.DanmakuKind.Scripted);
```

Assume that a script is loaded into a string `script`. Now create a scripted danmaku using `script` as its content:

```javascript
provider.addDanmaku(script);
```

The script is instantly evaluated by default. Optional extra creating parameter has only one field `bornTime`. This field controls the time when the scripted danmaku is evaluated, in milliseconds. For example, to create a scripted danmaku which will be evaluated at 00:04 of playback:

```javascript
provider.addDanmaku(script, {bornTime: 4000});
```

Again, it is highly recommended to sanitize the submitted code to ensure that there are no potential security breach.
