// Web3 modules

const Web3 = require("web3")
const Account = require("./account.js")
const { _BN, BN } = require("./BN.js")

// Web3 plus class

class Web3Plus extends Web3 {
    // Construct Web3 and add methods

    constructor() {
        super(...arguments)
        this.eth.accounts.importAccount = importAccount.bind(this)
    }
}

// Import account from private key

function importAccount(privateKey) {
    const account = this.eth.accounts.privateKeyToAccount(privateKey)
    return new Account(this, account)
}

// Export BN and class

module.exports = {
    _BN,
    BN,
    Web3Plus
}