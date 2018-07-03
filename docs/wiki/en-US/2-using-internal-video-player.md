# Using internal video player

There is an abstract wrapper class `VideoPlayerBase` in Bulletproof.

The video player can be accessed from `Bulletproof.videoPlayer`:

```javascript
var videoPlayer = bp.videoPlayer;
```

Load a video, and then play it:

```javascript
videoPlayer.load(videoUrl);
videoPlayer.play();
```

In current stage, there is only one concrete child class `Html5VideoPlayer`, using the advantage of `<video>` element. There will be support for WebChimera in the future.
