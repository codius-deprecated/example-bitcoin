console.log('example-bitcoin');

var Bitcoin = require('bitcoinjs');

var key = Bitcoin.ECKey.fromWIF('5J5CvkZJiw5H1WdRx52ZtysSmaRrKmUN4NXKWkXwx8zaAvpgMEB');

var tx = new Bitcoin.Transaction();

tx.addInput("aa94ab02c182214f090e99a0d57021caffd0f195a81c24602b1028b130b63e31", 0);

tx.addOutput("1Gokm82v6DmtwKEB8AiVhm82hyFSsEvBDK", 15000);

tx.sign(0, key);

console.log(tx.toHex());
