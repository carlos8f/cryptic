var cryptic = require('../')
  , passphrase = 'wombaT'
  , plaintext = 'my name is carlos'

var locked = cryptic(passphrase, plaintext).lock('base64');
console.log('locked:', locked);
var unlocked = cryptic(passphrase, locked, 'base64').unlock();
console.log('unlocked:', unlocked);
