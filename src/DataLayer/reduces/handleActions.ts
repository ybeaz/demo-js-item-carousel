import { bindActionCreators } from 'redux'
import * as actionSet from '../actions/index'
import store from '../store'
const { dispatch } = store
const actions: any = bindActionCreators(actionSet, dispatch)

import * as Interfaces from '../../Shared/interfaces'

export const handleActions: Function = (e: object, action: Interfaces.Action): void => {
  // console.info(`handleActions.js [0] type->${action.type}`, { type: action.type, action, e })
  let data: any = {}

  switch (action.type) {

    case 'GET_LOGIN_RES':
    {
      data = action.data
      // console.info(`handleActions.js type: ${action.type}`, { data, action, e })
      actions.getActionAsync('GET_LOGIN_RES', 'REQUEST', data)
    }
    break

    case 'SET_CAROUSEL_IND':
    {
      data = action.data
      actions.SET_CAROUSEL_IND({ data })
    }
    break

    case 'SET_PAGE_IND':
    {
      data = action.data
      actions.SET_PAGE_IND({ data })
    }
    break

    case 'CLOSE_MODAL_IMG_SIZED':
    {
      data = action.data
      actions.CLOSE_MODAL_IMG_SIZED({})
    }
    break

    case 'OPEN_MODAL_IMG_SIZED':
    {
      data = action.data
      actions.OPEN_MODAL_IMG_SIZED({})
    }
    break

    case 'GET_TREE_DATA':
    {
      data = action.data
      actions.getActionAsync('GET_TREE_DATA', 'REQUEST', '')
    }
    break

    case 'DISPATCH_ACTION':
    {
      data = action.data
      actions.DISPATCH_ACTION(data)
    }
    break

    default:
    {
      console.info('handleActions.js unexpected action', { action })
    }
  }
}