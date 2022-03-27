// Account utils

class Account {
    // Copy Web3 account properties to instance

    constructor(web3, account) {
        this.web3 = web3
        for (const property in account) {
            this[property] = account[property]
        }
        this.nonce = 0
    }

    // Sign transaction from account and return raw transaction data

    async signTx(params, addNonce = true) {
        return (await this.signTransaction({
            from: this.address,
            nonce: addNonce ? this.nonce ++ : this.nonce,
            ...params
        })).rawTransaction
    }

    // Sign transaction from account and return full signature

    async signTxFull(params, addNonce = true) {
        return await this.signTransaction({
            from: this.address,
            nonce: addNonce ? this.nonce ++ : this.nonce,
            ...params
        })
    }

    // Update account nonce

    async updateNonce() {
        this.nonce = await this.web3.eth.getTransactionCount(this.address)
    }
}

module.exports = Account