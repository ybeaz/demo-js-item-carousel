export const REQUEST = 'REQUEST'
export const SUCCESS = 'SUCCESS'
export const FAILURE = 'FAILURE'

export const createRequestTypes = base =>
  [REQUEST, SUCCESS, FAILURE].reduce((acc, type) => {
    acc[type] = `${base}_${type}`
    return acc
  }, {})

// Asynchroneous actions for saga
export const GET_LOGIN_RES: any = createRequestTypes('GET_LOGIN_RES')
export const GET_TREE_DATA: any = createRequestTypes('GET_TREE_DATA')

// Synchroneours actions
export const SET_CAROUSEL_IND: string = 'SET_CAROUSEL_IND'
export const SET_PAGE_IND: string = 'SET_PAGE_IND'
export const CLOSE_MODAL_IMG_SIZED: string = 'CLOSE_MODAL_IMG_SIZED'
export const OPEN_MODAL_IMG_SIZED: string = 'OPEN_MODAL_IMG_SIZED'
export const DISPATCH_ACTION: string = 'DISPATCH_ACTION'
