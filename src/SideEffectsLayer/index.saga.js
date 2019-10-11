import { all, fork } from 'redux-saga/effects'

import getLoginRes from './getLoginRes.saga'
import getItemData from './getItemData.saga'

export default function* indexSaga() {
  yield all([
    fork(getLoginRes),
    fork(getItemData),
  ])
}