const Web3Utils = require("web3-utils")
const BN = Web3Utils.BN

// Assert error

function assert(val, msg) {
    if (!val) throw new Error(msg || "Assertion failed")
}

// Utilities

BN.prototype.toParsed = function(decimals = 18) {
    const padded = this.toString().padStart(decimals + 1, "0")
    const parsed = `${padded.slice(0, -decimals)}.${padded.slice(-decimals)}`.replace(/0+$/g, "")
    return parsed.endsWith(".") ? parsed.slice(0, -1) : parsed
}

// Arithmetics

BN.prototype.pown = function(num) {
    assert(typeof num === "number")
    return this.pow(new BN(num))
}

module.exports = (...params) => new BN(...params)