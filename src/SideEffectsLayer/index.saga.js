import { all, fork } from 'redux-saga/effects'

import getItemData from './getItemData.saga'

export default function* indexSaga() {
  yield all([
    fork(getItemData),
  ])
}