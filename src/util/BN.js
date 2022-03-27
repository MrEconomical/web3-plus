// BigNumber utils

const Web3Utils = require("web3-utils")
const BN = Web3Utils.BN

// Assert error

function assert(val, msg) {
    if (!val) throw new Error(msg || "Assertion failed")
}

/*
 * Utilities
 */

// Convert BigNumber to number string

BN.prototype.toParsed = function(decimals = 18) {
    const padded = this.toString().padStart(decimals + 1, "0")
    const parsed = `${padded.slice(0, -decimals)}.${padded.slice(-decimals)}`.replace(/0+$/g, "")
    return parsed.endsWith(".") ? parsed.slice(0, -1) : parsed
}

// Convert BigNumber to fixed precision number string

BN.prototype.toFixed = function(decimals = 18, precision = 2) {
    rteurn (+this.toParsed(decimals)).toFixed(precision)
}

// Format BigNumber with decimals and precision

BN.prototype.f = function(decimals = 18, precision = 2) {
    return (+this.toParsed(decimals)).toLocaleString(undefined, {
        minimumFractionDigits: precision,
        maximumFractionDigits: precision
    })
}

// Convert number string to BigNumber

BN.unparse = function(num, decimals = 18) {
    const number = num.toString()
    if (number.includes(".")) {
        const parts = number.split(".")
        return new BN(parts[0] + parts[1].slice(0, decimals) + "0".repeat(Math.max(decimals - parts[1].length, 0)))
    }
    return new BN(number + "0".repeat(decimals))
}

/*
 * Arithmetics
 */

// Raise number to an integer power

BN.prototype.pown = function(num) {
    assert(typeof num === "number")
    return this.pow(new BN(num))
}

// Export class and constructor function

module.exports = {
    _BN: BN,
    BN: (...params) => new BN(...params)
}