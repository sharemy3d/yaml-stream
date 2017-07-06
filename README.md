# yaml-stream

A simple package for handling streams of YAML documents.

## Usage

#### `yamlstream.loadAll(stream, callback, done = undefined)`

```js
const yamlstream = require('yaml-stream');

yamlstream.loadAll( process.stdin, function(document) {
  // handle each YAML document here
}, function(err) {
  // called after every document has been read and stream has been closed
})
```
