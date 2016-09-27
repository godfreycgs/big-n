'use strict'

exports.mul = mul

function mul(a, b) {
  let bignumA = parse(a)
  let bignumB = parse(b)
  let bignumResult = { positive: true }

  for (let digitB in bignumB) {
    for (let digitA in bignumA) {
      if (!isNumber(digitA)) {
        continue
      }

      if (!isNumber(digitB)) {
        continue
      }

      let aValueOfDigit = bignumA[digitA]
      let bValueOfDigit = bignumB[digitB]

      let digit = Number(digitB) + Number(digitA) - 1
      let value = Number(aValueOfDigit) * Number(bValueOfDigit)

      if (bignumResult[digit] === undefined) {
        bignumResult[digit] = value
      } else {
        bignumResult[digit] += value
      }
    }
  }

  if (bignumA.positive === true && bignumB.positive === false) {
    bignumResult.positive = false
  }

  if (bignumA.positive === false && bignumB.positive === true) {
    bignumResult.positive = false
  }

  normalize(bignumResult)

  return toString(bignumResult)
}

/**
 * Parse number string to BigNum object
 *
 * The main idea of this module is to do the caculation base on the bignum object,
 * this function is to parse the number string.
 *
 * Here is a example of bignum object:
 * var bignum = {
 *   1: 7,
 *   2: 8,
 *   3: 9,
 *   positive: true
 * }
 *
 * where 1 means digit one, 3 means digit 1's value,
 * so the string value of above is "987"
 */
function parse(numStr) {
  var bignum = { positive: true }

  if (isNegative(numStr)) {
    bignum.positive = false
  }

  for (let i = 0; i < numStr.length; i++) {
    let digit = numStr.length - i
    let valueOfDigit = numStr[i]

    if (!isNumber(valueOfDigit)) {
      continue
    }

    bignum[digit] = valueOfDigit
  }

  return bignum
}

function normalize(bignum) {
  let maxDigit = getMaxDigit(bignum)

  if (maxDigit === 1) {
    return
  }

  if (Number(bignum[maxDigit]) === 0) {
    delete bignum[maxDigit]
    normalize(bignum)
  }
}

function toString(bignum) {
  let maxDigit = getMaxDigit(bignum)
  let result = ''

  for (let digit = 1; digit <= maxDigit; digit++) {
    let value = bignum[digit]

    if (value < 10) {
      result = String(value) + result
    } else {
      let i = Math.floor(value / 10)

      if (bignum[digit + 1] === undefined) {
        bignum[digit + 1] = 0
      }

      if (digit === maxDigit) {
        maxDigit++
      }

      bignum[digit + 1] += i
      result = String(value % 10) + result
    }
  }

  if (bignum.positive === false) {
    result = '-' + result
  }

  return result
}

function isNumber(n) {
  return /[0-9]+/.test(n)
}

function isNegative(n) {
  return /^\-[0-9]+/.test(n)
}

function getMaxDigit(bignum) {
  let maxDigit = 0

  for (let i in bignum) {
    if (isNumber(i)) {
      if (i > maxDigit) {
        maxDigit = i
      }
    }
  }

  return Number(maxDigit)
}