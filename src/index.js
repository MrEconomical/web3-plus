// Imports

const Web3 = require("web3")
const eth = require("./eth.js")
const { _BN, BN } = require("./BN.js")

// Web3 plus class

class Web3Plus extends Web3 {
    // Construct Web3 and add methods

    constructor(provider, options) {
        // Initialize Web3 instance

        super(provider)
        this.options = {
            verbose: false,
            disableGas: false,
            gasInterval: 5000,
            pollInterval: 1000,
            ...options
        }

        this.eth.getParams = eth.getParams.bind(this)
        this.eth.pollTransaction = eth.pollTransaction.bind(this)
        this.eth.updateGas = eth.updateGas.bind(this)
        this.eth._pollTxs = eth._pollTxs.bind(this)
        this.eth.accounts.importAccount = eth.accounts.importAccount.bind(this)

        // Run gas price update loop

        if (!this.options.disableGas) {
            this.eth.gasPrice = BN(0)
            this.eth.updateGas()
            this._gasInterval = setInterval(this.eth.updateGas, this.options.gasInterval)
        }

        // Run transaction confirmation polling interval

        this.eth._pollingTxs = {}
        this.eth._pollInterval = setInterval(this.eth._pollTxs, this.options.pollInterval)
    }
}

// Export Web3Plus and BN utils

module.exports = {
    Web3Plus,
    _BN,
    BN
}