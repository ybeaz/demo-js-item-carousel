import { takeEvery, call, put } from 'redux-saga/effects'

import * as serviceFunc from '../Shared/serviceFunc'
import { fetchGet, fetchPost } from '../ComminicationLayer/fetch'
import * as actions from '../DataLayer/actions/index'

function* getItemData(payload) {
  // console.info('getItemData [0]', { payload })
  const payloadNext = payload
  delete payloadNext.type
  const endpoint = serviceFunc.getEndpoint()

  try {

    fetchGet(endpoint, payloadNext)
    const response = yield fetchGet(endpoint, payloadNext)
    // console.info('getItemData [5]', { response, endpoint })

    const data = yield call([response, response.json])  // response.json()
    // console.info('getItemData [7]', { data })

    yield put(actions.getActionAsync('GET_TREE_DATA', 'SUCCESS', { data }))
    // console.info('getItemData [9]', { data })

  }
  catch (error) {
    yield call(() => {})
  }
}

export default function* getItemDataWatcher() {
  // console.info('getSavedUserVisitActionsMdbWatcher START_USER_SESSION', )
  yield takeEvery(['GET_TREE_DATA_REQUEST'],
  getItemData)
}
