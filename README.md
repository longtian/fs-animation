# fs-animation
![](https://img.shields.io/travis/wyvernnot/fs-animation.svg)
![](https://img.shields.io/coveralls/wyvernnot/fs-animation.svg)

Realitime file system change animation which can also be played back. Built on [Immutable.JS](https://github.com/facebook/immutable-js/)


## Installation

```sh
npm install fs-animation -g
```

## Usage 

```
fs-animation
```

```sh
fs-animation /tmp/a /tmp/b
```

## Options

```sh
fs-animation -h
```

Options           |     Default     |     Description
------------------|-----------------|------------------
hostname          | 127.0.0.1       | Listening hostname
ignoreInitial     | true            | Existing files will not trigger evnets
ignoredDotFiles   | true            | Ignore file folds starts with dot, eg: .git
ignore            | null            | Directories to ignore
port              | 8001            | Listening port

## Development and Testing

```sh
npm test
```

## Example - Watch docker directory

![](doc/screenshot.png)

[Immutable.JS](https://github.com/facebook/immutable-js/) 真是个奇怪的鬼 :smiling_imp: ，一直不知道它是干什么的，理解起来也巨[费劲](http://www.zhihu.com/question/28016223)，
后来发现这货就是为这个项目而生的啊！

