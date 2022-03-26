const Web3Utils = require("web3-utils")
const BN = Web3Utils.BN

function assert(val, msg) {
    if (!val) throw new Error(msg || "Assertion failed")
}

BN.prototype.toParsed = function(decimals = 18) {
    const padded = this.toString(10, decimals + 1)
    const parsed = `${padded.slice(0, -decimals)}.${padded.slice(-decimals)}`.replace(/0+$/g, "")
    return parsed.endsWith(".") ? parsed.slice(0, -1) : parsed
}

BN.prototype.pown = function(num) {
    assert(typeof num === "number")
    return this.pow(new BN(num))
}

module.exports = (...params) => new BN(...params)