describe('basic test', function () {
  it('encrypts', function () {
    var encrypted = cryptic('wombaT', 'my name is carlos').encrypt().toString('base64');
    assert.equal(encrypted, 'ulak1KSyjv+pBKiOlWb3RCtImHUgKJV5rXJQbJBWw88=');
  });
  it('decrypts', function () {
    var decrypted = cryptic('wombaT', 'ulak1KSyjv+pBKiOlWb3RCtImHUgKJV5rXJQbJBWw88=', 'base64').decrypt().toString();
    assert.equal(decrypted, 'my name is carlos');
  });
  it('bad passphrase', function () {
    assert.throws(function () {
      cryptic('wombat', 'ulak1KSyjv+pBKiOlWb3RCtImHUgKJV5rXJQbJBWw88=').decrypt();
    }, /bad passphrase/);
  });
  it('file i/o', function (done) {
    var p = '/tmp/cryptic-test-' + idgen();
    cryptic('wishy Washy', 'to\n\n\nday').encrypt().toFile(p, function (err) {
      assert.ifError(err);
      cryptic.fromFile('wishy Washy', p, function (err, c) {
        assert.ifError(err);
        assert.equal(c.toString('base64'), 'O6SvJWb7OB/aT0FQiRjNEA==');
        assert.equal(c.decrypt().toString(), 'to\n\n\nday');
        done();
      });
    });
  });
});
