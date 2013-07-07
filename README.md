cryptic
=======

easy two-way encryption

[![build status](https://secure.travis-ci.org/carlos8f/cryptic.png)](http://travis-ci.org/carlos8f/cryptic)

### cryptic(passphrase, plaintext | crypted, [encoding])

Creates an instance of `cryptic` using a plaintext or crypted buffer or string.

### Example

```js
var cryptic = require('cryptic');
var c = cryptic('my secret', 'some plaintext');
```

## Methods

### encrypt()

Encrypts the buffer and returns `this` (chainable).

### decrypt()

Decrypts the buffer and throws if the decryption fails, and returns `this` (chainable).

#### Example

```js
var cryptic = require('cryptic')
  , prompt = require('cli-prompt')

prompt('base64-encoded crypted text: ', function (crypted) {
  prompt.password('passphrase: ', function (passphrase) {
    console.log(cryptic(passphrase, crypted, 'base64').decrypt().toString());
  });
});
```

### toString([encoding])

Returns the buffer as a string, optionally converted using an encoding.

### lock([encoding])

Encrypts the buffer and returns as a string, optionally converted using an encoding.

### unlock([encoding])

Decrypts the buffer and returns as a string, optionally converted using an encoding,
or `false` if the decryption failed.

```js
var cryptic = require('cryptic')
  , prompt = require('cli-prompt')

prompt('base64-encoded crypted text: ', function (crypted) {
  prompt.password('passphrase: ', function (passphrase) {
    console.log(cryptic(passphrase, crypted, 'base64').unlock());
  });
});
```

### toFile(p, cb)

Writes the buffer to a file at path `p` and calls `cb` when done.

### cryptic.fromFile(passphrase, p, cb)

Reads a file at path `p` and calls `cb(err, c)` with a new instance of `cryptic`
based on the passphrase and contents of the file.

- - -

### Developed by [Terra Eclipse](http://www.terraeclipse.com)
Terra Eclipse, Inc. is a nationally recognized political technology and
strategy firm located in Aptos, CA and Washington, D.C.

- - -

### License: MIT

- Copyright (C) 2013 Carlos Rodriguez (http://s8f.org/)
- Copyright (C) 2013 Terra Eclipse, Inc. (http://www.terraeclipse.com/)

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the &quot;Software&quot;), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is furnished
to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED &quot;AS IS&quot;, WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
