export const REQUEST = 'REQUEST'
export const SUCCESS = 'SUCCESS'
export const FAILURE = 'FAILURE'

export const createRequestTypes = base =>
  [REQUEST, SUCCESS, FAILURE].reduce((acc, type) => {
    acc[type] = `${base}_${type}`
    return acc
  }, {})

// Asynchroneous actions for saga
export const GET_TREE_DATA: any = createRequestTypes('GET_TREE_DATA')

// Synchroneours actions
export const DISPATCH_ACTION: string = 'DISPATCH_ACTION'
