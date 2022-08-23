// Ethereum utils

const { BN } = require("./util/BN.js")

// Wait for transaction confirmation

function pollTransaction(hash) {
    return new Promise(resolve => {
        if (!this.eth._pollingTxs[hash]) {
            this.eth._pollingTxs[hash] = []
        }
        this.eth._pollingTxs[hash].push(resolve)
    })
}

// Update cached gas price

async function updateGas() {
    try {
        if (!this.currentProvider) return
        this.eth.gasPrice = BN(await this.eth.getGasPrice())
    } catch(error) {
        if (this.options.verbose) {
            console.error(error)
        }
    }
}

// Poll pending transactions

async function _pollTxs() {
    const txs = Object.keys(this.eth._pollingTxs)
    if (!txs.length) return
    const batch = new this.eth.BatchRequest()
    for (const tx of txs) {
        batch.add(this.eth.getTransactionReceipt.request(tx, (error, receipt) => {
            if (error && this.options.verbose) {
                console.error(error)
            }
            if (!receipt || !this.eth._pollingTxs[tx]) return
            for (const handler of this.eth._pollingTxs[tx]) {
                handler(receipt)
            }
            delete this.eth._pollingTxs[tx]
        }))
    }
    batch.execute()
}

// Export web3.eth methods

module.exports = {
    pollTransaction,
    updateGas,
    _pollTxs,
}