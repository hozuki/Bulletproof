# Bulletproof: An HTML5 Danmaku Player

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

The homepage for testing (`test/index.html`) already included current tests. They are:

- A spinning 3-D ball (`3d-ball.js`);
- Green Dam Musume (`kanpai-lbn.js`);
- Madoka and other Mahou Shoujos (`kanpai-madoka.js`).

You are able to select the tests from the homepage. Source code of the tests can be found in `/test/scripts/`.

## Building

Before building, you will need [Node.js](https://nodejs.org/en/) and [TypeScript](http://www.typescriptlang.org/).

TypeScript may be installed via [NPM](https://www.npmjs.org/) (which is bundled with latest versions of Node.js):

```
npm install -g typescript
```

After installing, please compile the TypeScript files:

```
cd {path-to-project}
tsc -p .
```

## Project Status

The project is pre-alpha now. The classes are not fully implemented yet, and there are code hacks crawling.

## License

[MIT License](http://mitlicense.org/)

## Credits

[jabbany](//github.com/jabbany/)
