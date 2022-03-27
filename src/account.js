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

    // Sign transaction from account

    async signTx(params) {
        return await this.signTransaction({
            from: this.address,
            nonce: account.nonce,
            ...params
        })
    }

    // Update account nonce

    async updateNonce() {
        this.nonce = await web3.eth.getTransactionCount(this.address)
    }
}

module.exports = Account