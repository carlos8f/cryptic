var fs = require('fs')
  , crypto = require('crypto')

function Cryptic (passphrase, data, encoding) {
  this.passphrase = passphrase;
  if (Buffer.isBuffer(data)) this.buf = data;
  else this.buf = Buffer(data, encoding);
}

module.exports = function (passphrase, data, encoding) {
  return new Cryptic(passphrase, data, encoding);
};

module.exports.fromFile = function (passphrase, p, cb) {
  fs.readFile(p, function (err, data) {
    if (err) return cb(err);
    cb(null, new Cryptic(passphrase, data));
  });
};

Cryptic.prototype.encrypt = function () {
  var cipher = crypto.createCipher('aes-256-cbc', this.passphrase);
  var encrypted = Buffer(cipher.update(this.buf), 'binary');
  this.buf = Buffer.concat([encrypted, Buffer(cipher.final(), 'binary')]);
  return this;
};
Cryptic.prototype.decrypt = function () {
  try {
    var decipher = crypto.createDecipher('aes-256-cbc', this.passphrase);
    var decrypted = Buffer(decipher.update(this.buf), 'utf8');
    this.buf = Buffer.concat([decrypted, Buffer(decipher.final(), 'utf8')]);
  }
  catch (e) {
    if (e.message.match(/bad decrypt|wrong final block length|DecipherFinal fail/)) {
      e = new Error('bad passphrase');
      e.code = 'BAD_PASSPHRASE';
    }
    throw e;
  }
  return this;
};
Cryptic.prototype.lock = function (encoding) {
  return this.encrypt().toString(encoding);
};
Cryptic.prototype.unlock = function (encoding) {
  try {
    var decrypted = this.decrypt().toString(encoding);
  }
  catch (e) {
    return false;
  }
  return decrypted;
};
Cryptic.prototype.toString = function (encoding) {
  return this.buf.toString(encoding);
};
Cryptic.prototype.toFile = function (p, cb) {
  fs.writeFile(p, this.buf, cb);
};
