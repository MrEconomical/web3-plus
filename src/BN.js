// Imports

const BN = require("bn.js")

/*
 * Utilities
 */

// Convert BigNumber to number string

BN.prototype.toParsed = function(decimals = 18) {
    if (decimals === 0) return this.toString()
    const padded = (this.isNeg() ? this.neg() : this).toString().padStart(decimals + 1, "0")
    const parsed = `${padded.slice(0, -decimals)}.${padded.slice(-decimals)}`.replace(/0+$/g, "")
    return `${this.isNeg() ? "-" : ""}${parsed.endsWith(".") ? parsed.slice(0, -1) : parsed}`
}

// Convert BigNumber to fixed precision number string

BN.prototype.toFixed = function(decimals = 18, precision = 2) {
    return (+this.toParsed(decimals)).toFixed(precision)
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

// Convert hex string to BigNumber

BN.fromHex = value => {
    return new BN(value.startsWith("0x") ? value.slice(2) : value, 16)
}

/*
 * Arithmetics
 */

// Multiply number by integer (fixed for negative)

BN.prototype.muln = function(num) {
    if (num < 0) {
        return this.clone().imuln(-num).neg()
    }
    return this.clone().imuln(num)
}

// Raise number to an integer power

BN.prototype.pown = function(num) {
    return this.pow(new BN(num))
}

// Divide number by integer (fixed for negative)

BN.prototype.divn = function(num) {
    if (num < 0) {
        return this.clone().idivn(-num).neg()
    }
    return this.clone().idivn(num)
}

// Multiply number by 10 to the power of BN `deg`

BN.prototype.e = function(deg) {
    return this.mul(new BN(10).pow(deg))
}

// Multiply number by 10 to the power of integer `deg`

BN.prototype.en = function(deg) {
    return this.mul(new BN(10).pow(new BN(deg)))
}

// Divide number by 10 to the power of BN `deg`

BN.prototype.ne = function(deg) {
    return this.div(new BN(10).pow(deg))
}

// Divide number by 10 to the power of integer `deg`

BN.prototype.nen = function(deg) {
    return this.div(new BN(10).pow(new BN(deg)))
}

// Export class and constructor function

module.exports = {
    _BN: BN,
    BN: (...params) => new BN(...params)
}