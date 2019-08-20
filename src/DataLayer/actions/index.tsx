import * as actionTypes from './actionTypes'

// tslint:disable-next-line: no-reserved-keywords
export const action: any = (type: string, payload: any = {}): any => {
  // console.info('action-index.js action()', { type, ...payload })
  return ({ type, ...payload })
}

// Not used now
// tslint:disable-next-line: no-reserved-keywords
export const getAction: any = (type: string): any => ({
  request: (data: any): any => action(actionTypes[type].REQUEST, data),
  success: (data: any): any => action(actionTypes[type].SUCCESS, data),
  failure: (data: any): any => action(actionTypes[type].FAILURE, data),
})

// Get asynchroneous actions for saga
// tslint:disable-next-line: no-reserved-keywords
export const getActionAsync: any = (type: string, stage: string, data: any): any => {
  // console.info('action-index.js action()', { actionTS: actionTypes[type][stage], actionT: actionTypes[type], type })
  return action(actionTypes[type][stage], data)
}

// Get synchroneours actions
// Template export const : any = (data: any): any => action(actionTypes., data)
export const DISPATCH_ACTION: any = (data: any): any => action(actionTypes.DISPATCH_ACTION, data)
