const Web3Utils = require("web3-utils")
const BigNumber = Web3Utils.BN

class _BN extends BigNumber {

    add(num) {
        if (BigNumber.isBN(num)) {
            return super.add(num)
        }
        return super.add(new BigNumber(num))
    }

    sub(num) {
        if (BigNumber.isBN(num)) {
            return super.sub(num)
        }
        return super.sub(new BigNumber(num))
    }

    mul(num) {
        if (BigNumber.isBN(num)) {
            return super.mul(num)
        }
        return super.mul(new BigNumber(num))
    }

    pow(num) {
        if (BigNumber.isBN(num)) {
            return super.pow(num)
        }
        return super.pow(new BigNumber(num))
    }

    div(num) {
        if (BigNumber.isBN(num)) {
            return super.div(num)
        }
        return super.div(new BigNumber(num))
    }

    mod(num) {
        if (BigNumber.isBN(num)) {
            return super.mod(num)
        }
        return super.mod(new BigNumber(num))
    }

    divmod(num) {
        if (BigNumber.isBN(num)) {
            return super.divmod(num)
        }
        return super.divmod(new BigNumber(num))
    }

    divRound(num) {
        if (BigNumber.isBN(num)) {
            return super.divRound(num)
        }
        return super.divRound(new BigNumber(num))
    }

}

module.exports = {
    _BN,
    BN: (...params) => new _BN(...params)
}