var kafka = require('kafka-node');
var constants = require('./constants');

var Consumer = kafka.Consumer;
var client = new kafka.KafkaClient();
var consumer = new Consumer(client,
  [{ topic: constants.TOPIC_FILTERED_TRANSACTIONS, offset: 6}],
  { autoCommit: false, fromOffset: true }
);

console.log("Transaction consumer online");


consumer.on('message', function (message) {
    var msg = JSON.parse(message.value);
    console.log(`Tx:${msg.tx}, Amount: ${msg.amount}, From: ${msg.from}, To: ${msg.to}, Risk:${msg.risk}`);
});


consumer.on('error', function (err) {
    console.log('Error:',err);
})


consumer.on('offsetOutOfRange', function (err) {
    console.log('offsetOutOfRange:',err);
})

