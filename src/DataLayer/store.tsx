import { createStore, applyMiddleware } from 'redux'
import createSagaMiddleware from 'redux-saga'
import { loggerDispatch } from './middleware'
import appCombineReducers from './reduces/index'
import indexSaga from '../SideEffectsLayer/index.saga'
import * as actionSet from './actions/index'

const configureStore = (): any => {
  const sagaMiddleware = createSagaMiddleware()
  const middlewares = [sagaMiddleware, loggerDispatch]
  //[ middleware.logger, middleware.logger, middleware.crashReporter ]
  const store = createStore(appCombineReducers, applyMiddleware(...middlewares))
  //console.info('index.js->configureStore', indexSaga)
  sagaMiddleware.run(indexSaga)
  return store
}

export default configureStore()