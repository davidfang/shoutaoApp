import ScreenUtil from './ScreenUtil'
const type = {
  base: 'Avenir-Book',
  bold: 'Avenir-Black',
  emphasis: 'HelveticaNeue-Italic'
}

const size = {
  h1: ScreenUtil.setSpText(38),
  h2: ScreenUtil.setSpText(34),
  h3: ScreenUtil.setSpText(30),
  h4: ScreenUtil.setSpText(26),
  h5: ScreenUtil.setSpText(20),
  h6: ScreenUtil.setSpText(19),
  input: ScreenUtil.setSpText(18),
  regular: ScreenUtil.setSpText(17),
  medium: ScreenUtil.setSpText(14),
  small: ScreenUtil.setSpText(12),
  smaller: ScreenUtil.setSpText(10),
  tiny: ScreenUtil.setSpText(8.5)
}

const style = {
  h1: {
    fontFamily: type.base,
    fontSize: size.h1
  },
  h2: {
    fontWeight: 'bold',
    fontSize: size.h2
  },
  h3: {
    fontFamily: type.emphasis,
    fontSize: size.h3
  },
  h4: {
    fontFamily: type.base,
    fontSize: size.h4
  },
  h5: {
    fontFamily: type.base,
    fontSize: size.h5
  },
  h6: {
    fontFamily: type.emphasis,
    fontSize: size.h6
  },
  normal: {
    fontFamily: type.base,
    fontSize: size.medium
  },
  description: {
    fontFamily: type.base,
    fontSize: size.smaller
  }
}

export default {
  type,
  size,
  style
}
