# Anno

> A parser for embedded annotations of functions and modules

[![Build Status](https://travis-ci.org/rasshofer/anno.svg)](https://travis-ci.org/rasshofer/anno)
[![Coverage Status](https://coveralls.io/repos/github/rasshofer/anno/badge.svg)](https://coveralls.io/github/rasshofer/anno)
[![Dependency Status](https://david-dm.org/rasshofer/anno/status.svg)](https://david-dm.org/rasshofer/anno)
[![Dependency Status](https://david-dm.org/rasshofer/anno/dev-status.svg)](https://david-dm.org/rasshofer/anno)

Anno parses DocBlocks, ignores any regular comment, and returns an object containing the parsed annotations.

## Installation

```shell
npm install anno --save-dev
```

## Usage

```
/**
 * This function does something.
 * @hello world
 * @valueless
 */
function doSomething () {
  console.log('Did something.');
}
```

```js
var anno = require('anno');
var result = anno(fs.readFileSync('test.js', 'utf8'));
  console.log(result);
});
```

```json
{
  "doSomething": {
    "hello": "world",
    "valueless": true
  }
}
```

## Supported syntax

- `function <name> (…) { … }`
- `var <name> = function (…) { … }`
- `let <name> = function (…) { … }`
- `const <name> = function (…) { … }`
- `var <name> = new Function (…)`
- `let <name> = new Function (…)`
- `const <name> = new Function (…)`
- `var <name> = (…) => { … }`
- `let <name> = (…) => { … }`
- `const <name> = (…) => { … }`
- `module.exports = function (…) { … }`
- `exports.<name> = function (…) { … }`
- `exports[<name>] = function (…) { … }`

## Changelog

* 0.0.2
  * README fixes
* 0.0.1
  * Initial version

## License

Copyright (c) 2016 [Thomas Rasshofer](http://thomasrasshofer.com/)  
Licensed under the MIT license.

See LICENSE for more info.
