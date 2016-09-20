# Contributing Guide

## Making Pull Requests

1. Fork [hozuki/Bulletproof](https://github.com/hozuki/Bulletproof).
2. Clone the forked repository (which is in your account) to your computer and install dependencies.

```shell
$ git clone https://github.com/<username>/Bulletproof.git <preferred cloning destination>
$ cd <preferred cloning destination>
$ npm install
$ git submodule update --init --recursive
$ cd <preferred cloning destination>/lib/glantern
$ npm install
```

3. Create a branch for modifications.

```shell
$ git checkout -b modification_description
```

4. Do coding work in the `modification_description` branch.
5. Push the `modification_description` branch to your account.

```shell
$ git push origin modification_description
```

6. Create a pull request from your account and describe the changes.
