# realm-util

> JavaScript helper utilities for realm

[![NPM][npm-icon] ][npm-url]

[![Build status][ci-image] ][ci-url]
[![semantic-release][semantic-image] ][semantic-url]
[![js-standard-style][standard-image]][standard-url]

## Overview

[Realm](https://realm.io/docs/get-started/) is a platform for building offline-first, reactive mobile experiences.

### The problem

When building schemas for Realm you'll quickly find that there are two strange parts.

1. You often [repeat the name of the class](https://realm.io/docs/javascript/latest/#models) that you're decorating with the schema.
2. When making relationships in Realm's schema, you use a string to reference another model.

There is (I think) a reason for this. Your class name and the name of the model might be different
so effectively requiring a name property on a schema makes it possible to alias a class.

The problem with using a string is that at least in JavaScript it is hard for tooling to help you. If, instead we use an actual variable to reference to other class in the relationship, then we get all of the tooling help that we want.

### Solution

We can pull a name off of a class dynamically then use that to pre-populate the schema field's name property. This helps us for both problems 1 & 2 above. Take a look at the example below to see how we can use `react-util`'s `withSchema` and `named` functions to decorator the class.

## Getting Started

### Installation

```
npm install --save realm-util
```

### Usage (ES5)

Decorate your classes using `withSchema` and link complex relationships with `named`.

```js
const ru = require('realm-util');

class Recording { }
const DecoratedRecording = ru.withSchema(Recording, {
  properties: {
    label: { type: 'string' },
    duration: { type: 'int' }
  }
});

console.log(DecoratedRecording.schema);
/*
  {
    name: 'Recording',
    properties: {
      label: { type: 'string' },
      duration: { type: 'int' }
    }
  }
 */

class RecordingSet {}
DecoratedRecordingSet = ru.withSchema(RecordingSet, {
  properties: {
    name: { type: 'string' },
    recordings: { type: 'list', objectType: ru.named(Recording) }
  }
});

console.log(DecoratedRecordingSet.schema);
/*
  {
    name: 'RecordingSet',
    properties: {
      name: { type: 'string' },
      recordings: { type: 'list', objectType: 'Recording' }
    }
  }
 */

```

### Usage (babel-decorators-legacy)

Install babel-plugin-transform-decorators-legacy

```
npm install --save-dev babel-plugin-transform-decorators-legacy
```

Use the realmSchema decorator


```js
const ru = require('realm-util');
const realmSchema = ru.realmSchema;

@realmSchema({
  properties: {
    name: { type: 'string' },
    age: { type: 'int' }
  }
})
class Artist {
  hello() {
    console.log('hi');
  }
}

console.log(Artist.schema);
/*
  {
    name: 'Artist',
    properties: {
      name: { type: 'string' },
      age: { type: 'int' }
    }
  }
 */
```

### Small print

Author: Jim Cummins &lt;jimthedev@gmail.com&gt; &copy; 2017

License: MIT - do anything with the code, but don't blame me if it does not work.

Support: if you find any problems with this module, email / tweet /
[open issue](https://github.com/jimthedev/realm-util/issues) on Github

## MIT License

Copyright (c) 2017 Jim Cummins &lt;jimthedev@gmail.com&gt;

Permission is hereby granted, free of charge, to any person
obtaining a copy of this software and associated documentation
files (the "Software"), to deal in the Software without
restriction, including without limitation the rights to use,
copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the
Software is furnished to do so, subject to the following
conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
OTHER DEALINGS IN THE SOFTWARE.

[npm-icon]: https://nodei.co/npm/realm-util.svg?downloads=true
[npm-url]: https://npmjs.org/package/realm-util
[ci-image]: https://travis-ci.org/jimthedev/realm-util.svg?branch=master
[ci-url]: https://travis-ci.org/jimthedev/realm-util
[semantic-image]: https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg
[semantic-url]: https://github.com/semantic-release/semantic-release
[standard-image]: https://img.shields.io/badge/code%20style-standard-brightgreen.svg
[standard-url]: http://standardjs.com/
