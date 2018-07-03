# Basic requirements

Bulletproof is written in TypeScript and compiled into JavaScript, so it is ideal to run on browsers. You need a modern browser to run Bulletproof, that is to say, avoid Internet Explorer when it is possible.

Bulletproof employs WebGL as foundation of visual presentation (which requires `<canvas>`). It also uses native `Map` and `Set` classes. So please, be sure to use a modern browser.

If you are not so sure, please use `Bulletproof.isSupported()` function to test availability.

The following browsers are tested, with successful outcomes:

- Mozilla Firefox 44
- Google Chrome 48
- Microsoft Internet Explorer 11
- Microsoft Edge 25
- NW.js 0.12.3 (core version Chrome 41)

Performance differ on browsers. My tests show that Chrome and NW.js have the best performance, Firefox is so-so, IE and Edge can hardly breathe. The details of WebGL on browsers are not clear, so Chrome is suggested at the time being.
