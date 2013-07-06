var cryptic = require('../')
  , prompt = require('cli-prompt')

prompt('plain text: ', function (plaintext) {
  prompt.password('passphrase: ', function (passphrase) {
    console.log(cryptic(passphrase, plaintext).encrypt().toString('base64'));
  });
});
