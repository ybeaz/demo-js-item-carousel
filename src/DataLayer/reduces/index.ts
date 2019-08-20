import { combineReducers } from 'redux'
import * as Interfaces from '../../Shared/interfaces'

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
    treeData,
  },
)

export default appCombineReducers
