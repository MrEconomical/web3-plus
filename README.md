# Web3 Plus

A wrapper on top of web3.js with additional utilities, published to npm as `web3-p`

## Features
- BigNumber decimal and parsing utilities implemented with the `BN` class
- Additional account utilities with the `web3.eth.accounts.importAccount` wrapper
- Cached gas price with `web3.eth.gasPrice` and `web3.eth.updateGas`
- Transaction polling with `web3.eth.pollTransation`

## Usage

```
const { Web3Plus, BN, _BN } = require("web3-p");
const web3 = new Web3Plus();
```

Configure a Web3Plus instance with the `options` parameter in the constructor:
```
const { Web3Plus } = require("web3-p");
const web3 = new Web3Plus(null, {
    verbose: false,     // debug logging
    disableGas: false,  // disable the gas cache update loop
    gasInterval: 5000,  // loop time in ms of gas cache update
    pollInterval: 1000, // poll interval of web3.eth.pollTransaction
});
```