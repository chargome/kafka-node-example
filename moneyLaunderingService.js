const ProducerStream = require('kafka-node').ProducerStream;
const ConsumerGroupStream = require('kafka-node').ConsumerGroupStream;
const Transform = require('stream').Transform;
const resultProducer = new ProducerStream();
const constants = require('./constants');
 
const consumerOptions = {
  kafkaHost: '127.0.0.1:9092',
  groupId: 'MoneyLaunderingServiceGroup',
  sessionTimeout: 15000,
  protocol: ['roundrobin'],
  asyncPush: false,
  id: 'consumer1',
  fromOffset: 'latest'
};
 
const consumerGroup = new ConsumerGroupStream(consumerOptions, constants.TOPIC_TRANSACTIONS);
 
const messageTransform = new Transform({
  objectMode: true,
  decodeStrings: true,
  transform (message, encoding, callback) {
    console.log("Received message: ", message.value);
    var moneyLaunderingRisk = fancyAiAlgorithm();
    var values = JSON.parse(message.value)
    let msg = { 
      tx: values.tx, 
      amount: values.amount, 
      from: values.from, 
      to: values.to, 
      risk: moneyLaunderingRisk 
    };
    callback(null, {
      topic: constants.TOPIC_FILTERED_TRANSACTIONS,
      messages: JSON.stringify(msg)
    });
  }
});

const fancyAiAlgorithm = () => {
  return Math.random() >= 0.5;
}

console.log("Money Laundering Service online");
 
consumerGroup.pipe(messageTransform).pipe(resultProducer);