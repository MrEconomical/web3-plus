// Web3 modules

const Web3 = require("web3")
const Account = require("./account.js")
const { _BN, BN } = require("./BN.js")

// Web3 plus class

class Web3Plus extends Web3 {
    
}

// Export BN and class

module.exports = {
    _BN,
    BN,
    Web3Plus
}