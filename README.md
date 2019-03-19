
## Summary

This example demonstrates the usage of a Kafka client written in NodeJS.

## Setup

1. Start a local Kafka instance (follow the instructions on http://kafka.apache.org/quickstart)
2. `git clone chargome/kafka-node-example`
3. `cd kafka-node-example`
4. `npm i`

### ExecuteEach of the following commands in a new terminal tab:
  1. `node ./coreBankingService.js`
  2. `node ./moneyLaunderingService.js`
  3. `node ./customerConsumer.js`
  4. `node ./transactionConsumer.js`
  5. `node ./balanceConsumer.js`
  
## Send new Messages:
There are three routes available on the express server:
####  1. [GET] /
  - Just confirms that the server is runnig correctly
####  2. [POST] /newCustomer
  - sends new Customer to the `customer`-topic
  - request-body: 
    ```json
      {
        "message":"[CUSTOMER_NAME]"
      }
    ``` 
####  3. [POST] /newTransaction
  - Sends a new transaction to the `transaction`-topic
  - request-body: 
    ```json
      {
        "message": {
          "tx": "[TX_ID]", 
          "amount": "[AMOUNT]", 
          "from": "[CUSTOMER_NAME]", 
          "to": "[CUSTOMER_NAME]"
        }
      }
    ```
  
