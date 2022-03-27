// Account utils

const Account = require("./util/account.js")

// Import account from private key

function importAccount(privateKey) {
    const account = this.eth.accounts.privateKeyToAccount(privateKey)
    return new Account(this, account)
}

// Export accounts methods

module.exports = {
    importAccount
}