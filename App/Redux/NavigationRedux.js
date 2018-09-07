import AppNavigation from '../Navigation/AppNavigation'
import {onPageStart,onPageEnd} from '../Lib/UMAnalyticsUtil'
import last from 'lodash/last'
export const reducer = (state, action) => {
  const newState = AppNavigation.router.getStateForAction(action, state)

  const {type=null} = action
  if(type == 'Navigation/NAVIGATE'  ){
    //console.log('开始：' + action.routeName)
    //console.log(newState,state,action)
    onPageStart(action.routeName)
    //
  }
  if(type == 'Navigation/BACK'  ){
    //console.log('开始 back：'+ last(newState.routes).routeName)
    //console.log(newState,state,action)
    onPageStart(last(newState.routes).routeName)
    //
  }
  if(type == 'Navigation/COMPLETE_TRANSITION'){
    //console.log('结束：'+ last(newState.routes).routeName)
    //console.log(newState,state,action)
    onPageEnd(last(newState.routes).routeName)
  }

  return newState || state
}
