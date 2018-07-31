import {Big} from 'big.js';

export default MyMath = {
  /**
   ** 加
   **/
  add: (arg1, arg2) => {
    let x = new Big(arg1)
    let y = new Big(arg2)
    return x.plus(y).toString()                 // '0.3'
  },

  /**
   ** 减
   **/
  subtract: (arg1, arg2) => {
    let x = new Big(arg1)
    let y = new Big(arg2)
    return x.minus(y).toString()
  },

  /**
   ** 乘
   **/
  multiply: (arg1, arg2) => {
    let x = new Big(arg1)
    let y = new Big(arg2)
    return x.multipliedBy(y).toString()//'
  },

  /**
   ** 除
   **/
  divide: (arg1, arg2) => {
    let x = new Big(arg1)
    let y = new Big(arg2)
    return x.dividedBy(y).toString()                  // '3.14159292035398230088'
    x.div(5)
  }
}
