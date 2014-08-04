console.log('\nExample Bitcoin Contract');

var crypto     = require('crypto');
var Bitcoin    = require('bitcoinjs-lib');
var BigInteger = require('bigi');
var Promise    = require('bluebird');
var secrets    = Promise.promisifyAll(require('secrets'));
var input      = Promise.promisifyAll(require('input'));

function getBitcoinTransaction(){
  return input.getAsync()
    .then(function(data){
      return Bitcoin.Transaction.fromHex(data);
    }).catch(function(error){
      console.log('Invalid Bitcoin Transaction. ' + error);
    });
}

function getMyKeypair(){
  return secrets.getKeypairAsync('ec_secp256k1');
}

Promise.join(getBitcoinTransaction(), getMyKeypair())
  .spread(function(tx, keypair){
    var key = new Bitcoin.ECKey(new BigInteger(keypair.private, 16), false);
    var signature = tx.sign(0, key);
    return {
      public_key: keypair.public,
      tx_signature: signature,
      host_signature: keypair.signature
    };
  })
  .catch(function(error){
    console.log('Error signing bitcoin transaction: ' + error);
  })
  .then(function(result){
    if (result) {
      console.log(JSON.stringify(result));
    }
  });

