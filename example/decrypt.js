var cryptic = require('../')
  , prompt = require('cli-prompt')

prompt('base64-encoded crypted text: ', function (crypted) {
  prompt.password('passphrase: ', function (passphrase) {
    console.log(cryptic(passphrase, crypted, 'base64').decrypt().toString());
  });
});
