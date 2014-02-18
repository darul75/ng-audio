Ng-audio [![NPM version](https://badge.fury.io/js/ng-audio.png)](http://badge.fury.io/js/ng-audio) [![Build Status](https://travis-ci.org/darul75/ng-audio.png?branch=master)](https://travis-ci.org/darul75/ng-slider) [![Total views](https://sourcegraph.com/api/repos/github.com/darul75/ng-audio/counters/views.png)](https://sourcegraph.com/github.com/darul75/ng-audio)
=====================

Angular audio control directive.

Now that we can play with webaudio html5 api, here a small directive.

Why
-------------

Your want some background music on your website. Start/Stop buttons included.

Sceenshot
-------------

![angular audio demo](http://darul75.github.io/ng-slider/images/pause.png "angular audio demo screenshot")
![angular audio demo](http://darul75.github.io/ng-slider/images/play.png "angular audio demo screenshot")

Demo
-------------
http://darul-demo.herokuapp.com/audio

Installation
------------

Using npm:

```
npm install ng-audio
```

How to use it
-------------

You should already have script required for Angular, note sanitize module use.

```html
<script type="text/javascript" src="angular.min.js"></script>
```

to the list above, you should add:

```html
<link rel="stylesheet" type="text/css" href="ng-audio.min.css">
```

```html
<script type="text/javascript" src="ng-audio.min.js"></script>
```

Then, inject `ngAudio` in your application module:

```javascript
angular.module('myApp', ['ngAudio']);
```

and then just add an `div` with `audio` directive name attribute, `options` scope variable attribute.

```html
<div audio options="options" />
```

'options' slider scope options value as json.

```javascript
$scope.options = {
  playlist: ['/sound/SoundHelix-Song-1.mp3', '/sound/SoundHelix-Song-1.mp3'],
  loop: true
};
```

### Options

Options for your audio in json format {playlist:.....}

* `playlist`: list of sound url to load ( CORS, so be careful delivered by your server )
* `loop`: loop sound
* `start`: TODO : start sound

### Build

You can run the tests by running

```
npm install
```
or
```
npm test
```

assuming you already have `grunt` installed, otherwise you also need to do:

```
npm install -g grunt-cli
```

## License

The MIT License (MIT)

Copyright (c) 2013 Julien Valéry

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.




