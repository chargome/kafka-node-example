var kafka = require('kafka-node');
var constants = require('./constants');

var Consumer = kafka.Consumer;
var client = new kafka.KafkaClient();


var txConsumer = new Consumer(client,
  [{ topic: constants.TOPIC_FILTERED_TRANSACTIONS, offset: 6}],
  { autoCommit: false, fromOffset: true }
);

var customerBalance = new Map();

console.log("Balance consumer online");

txConsumer.on('message', function (message) {
    var msg = JSON.parse(message.value);
    setBalances(msg);
});


function setBalances(msg) {

  if(!customerBalance.get(msg.from)) {
    customerBalance.set(msg.from, 1000000);
  }

  if(!customerBalance.get(msg.to)) {
    customerBalance.set(msg.to, 1000000);
  }
  
  var fromBalance = customerBalance.get(msg.from);
  var toBalance = customerBalance.get(msg.to);
  customerBalance.set(msg.from, fromBalance - Number(msg.amount));
  customerBalance.set(msg.to, toBalance + Number(msg.amount));
  console.log("\n\n### Balances ###");
  customerBalance.forEach(printBalance);
}


function printBalance(value, key, map) {
  console.log(`${key}: ${value}`);
}


txConsumer.on('error', function (err) {
    console.log('Error:',err);
})


txConsumer.on('offsetOutOfRange', function (err) {
    console.log('offsetOutOfRange:',err);
})

