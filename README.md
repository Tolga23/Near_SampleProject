# Flight Ticket APP

### Flight Ticket app on NEAR blockchain helps people book flight ticket with NEAR wallet.
- [x] You can buy ticket with your wallet.

## Usage

### Prerequisites:

- Current version of [Node.js](https://nodejs.org/) <=v16.14.2
- Install dependencies: `yarn install`
- [near-cli] is a command line interface (CLI) for interacting with the NEAR blockchain. 
```npm install -g near-cli``` 

### Getting started

1. clone this repo to a local folder
2. run `yarn build:release` to build the app
3. run `yarn deploy` to deploy the app to the NEAR testnet
4. run `export CONTRACT=YOUR_DEV_ACCOUNT_HERE` 

### Functions

### **create**<br>

* This function creates flight information on the NEAR blockchain.

Usage:<br>

```
near call $CONTRACT create '{"origin": "İstanbul","destination": "İzmir","price":5,"date":"3 Mart","availableSeats":13 }' --accountId $OWNER
```

### **buyTicket**<br>

* This function buys ticket with your NEAR wallet. For the buy the ticket, you need to deposit the amount of ticket price. 
Since the price is defined as an int during development, you will not get an error unless you type 0.
If you type amount like ```--amount $1``` the error occurs.

Usage:<br>

```
near call $CONTRACT buyTicket '{"accountId": "Your_testnet_account","id":1441379057}' --accountId $OWNER --amount 1
```
### **update**<br>

* This function updates flight information on the NEAR blockchain. Origin, destination, price and date can be updated.

Usage:<br>

```
near call $CONTRACT update '{"id":1441379057,"origin":"İstanbul","destination":"İzmir","price":1,"date":"19 Temmuz"}' --accountId $OWNER
```

### **getAll**<br>

* This function returns all flight information on the NEAR blockchain. 

Usage:<br>

```
near view $CONTRACT getAll '{"offset":0}' --accountId $OWNER
```

### **getFlightById**<br>

* This function returns flight information by id on the NEAR blockchain.

Usage:<br>

```
near view $CONTRACT getById '{"id":1441379057}' --accountId $OWNER
```

### **getFlightCount**<br>

* This function returns flight count on the NEAR blockchain.

Usage:<br>

```
near view $CONTRACT getFlightCount '{}' --accountId $OWNER
```

### **deleteById**<br>

* This function deletes flight information by id on the NEAR blockchain.

Usage:<br>

```
near call $CONTRACT deleteById '{"id":1441379057}' --accountId $OWNER
```

### **deleteAllFlights**<br>

* This function deletes all flight information on the NEAR blockchain.

Usage:<br>

```
near call $CONTRACT deleteAllFlights '{}' --accountId $OWNER
```
