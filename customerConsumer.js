var kafka = require('kafka-node');
var constants = require('./constants');




var Consumer = kafka.Consumer;
var consumer;
var client = new kafka.KafkaClient();


var consumer = new Consumer(client,
  [{ topic: constants.TOPIC_CUSTOMERS, offset: 0}],
  { autoCommit: false, fromOffset: true }
);


console.log("Customer consumer online");

consumer.on('message', function (message) {
    console.log('New customer: ', message.value);
});


consumer.on('error', function (err) {
    console.log('Error:',err);
})


consumer.on('offsetOutOfRange', function (err) {
    console.log('offsetOutOfRange:',err);
})

