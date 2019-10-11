import { combineReducers } from 'redux'
import * as Interfaces from '../../Shared/interfaces'


const indexCollection: any = (
  state: any = { loginRes: false, pagination: 0, carousel: 0 },
  action: Interfaces.Action,
): any => {

  switch (action.type) { 

    case 'GET_LOGIN_RES_SUCCESS': {
      // console.info(`reducer->indexCollection type: ${action.type}`, { state, action })
      const stateNext: any = { ...state, loginRes: true }
      return stateNext
    }

    case 'SET_CAROUSEL_IND': {
      const stateNext: any = { ...state, carousel: 0 }
      return stateNext
    }

    case 'SET_PAGE_IND': {
      const { pagination } = action.data
      const stateNext: any = { ...state, pagination }
      // console.info(`reducer->indexCollection type: ${action.type}`, { stateNext, state, action })
      return stateNext
    }

    default: {
      return state
    }
  }
}

const modalWindows: any = (
  state: any = { display: false },
  action: Interfaces.Action,
): any => {

  switch (action.type) {

    case 'CLOSE_MODAL_IMG_SIZED': {
      const stateNext: any = { display: false }
      return stateNext
    }

    case 'OPEN_MODAL_IMG_SIZED': {
      const stateNext: any = { display: true }
      // console.info(`reducer->modalWindows type: ${action.type}`, { stateNext, state, action })
      return stateNext
    }

    default: {
      return state
    }
  }
}

const treeData: any = (state: any = {}, action: Interfaces.Action): any => {

  switch (action.type) {
    case 'GET_TREE_DATA_SUCCESS': {
      // console.info(`reducer->treeData type: ${action.type}`, { state, action })
      return action.data
    }

    default: {
      return state
    }
  }
}

// Main application reducers
// tslint:disable-next-line: export-name
const appCombineReducers = combineReducers(
  {
    indexCollection,
    modalWindows,
    treeData,
  },
)

export default appCombineReducers
