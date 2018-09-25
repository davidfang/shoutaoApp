/**
 * 友盟统计
 */
import {NativeModules} from 'react-native'
var UMTJ = NativeModules.UMAnalyticsModule
//console.log(UMTJ)
export const onPageStart = pageName => {
  //用于统计单个自定义页面的起始和onPageEnd同时使用，不可单独使用
  // if(Platform.OS === 'ios') {
  //   return UMTJ.onPageBegin(pageName);
  // }else {
    return UMTJ.onPageStart(pageName);
  // }
};
export const onPageEnd = pageName => {
  //用于统计单个Activity页面结束时间
  return UMTJ.onPageEnd(pageName);
};
export const onEvent = eventId => {
  //用于统计自定义事件的发生次数

  return UMTJ.onEvent(eventId);
};
export const onEventWithLable = (eventId, eventLabel) => {
  //用于统计自定义事件的发生次数

  return UMTJ.onEventWithLabel(eventId, eventLabel);
};
export const onEventWithMap = (eventId, eventData) => {
  //用于统计数值型变量的累计值、均值及分布。

  return UMTJ.onEventWithMap(eventId, eventData);
};
