// Imports

const Web3 = require("web3")
const { pollTransaction, updateGas, _pollTxs } = require("./eth.js")
const { importAccount } = require("./accounts.js")
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

        this.eth.pollTransaction = pollTransaction.bind(this)
        this.eth.updateGas = updateGas.bind(this)
        this.eth._pollTxs = _pollTxs.bind(this)
        this.eth.accounts.importAccount = importAccount.bind(this)

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