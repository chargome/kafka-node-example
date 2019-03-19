var express = require('express');
var kafka = require('kafka-node');
var app = express();
var bodyParser = require('body-parser');
var constants = require('./constants');


app.use( bodyParser.json() );      
app.use(bodyParser.urlencoded({    
  extended: true
})); 


var Producer = kafka.Producer,
    client = new kafka.KafkaClient(),
    producer = new Producer(client);


producer.on('ready', function () {
  producer.createTopics([
    constants.TOPIC_CUSTOMERS, 
    constants.TOPIC_TRANSACTIONS, 
    constants.TOPIC_FILTERED_TRANSACTIONS
  ], false, function (err, data) {
    if(err) {console.log(err)}
  });
  console.log('Kafka client is ready');
});
  

producer.on('error', function (err) {
    console.log('Kafka client is in an error state: ');
    console.log(err);
});


app.get('/',function(req,res){
  res.json({success:'Core Banking Service is running'})
});


app.post('/newCustomer',function(req,res){
  payloads = [{ topic: constants.TOPIC_CUSTOMERS, messages:req.body.message , partition: 0 }];
  producer.send(payloads, function (err, data) {
    res.json(data);
  });
});


app.post('/newTransaction',function(req,res){
  var msg = JSON.stringify(req.body.message);
  payloads = [{ topic: constants.TOPIC_TRANSACTIONS, messages:msg , partition: 0 }];
  console.log(payloads);
  producer.send(payloads, function (err, data) {
    res.json(data);
  });
});


// start server
app.listen(5001,function(){
  console.log('Core Banking Service running at 5001')
});