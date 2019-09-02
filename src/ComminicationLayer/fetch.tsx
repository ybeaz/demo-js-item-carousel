import * as serviceFunc from '../Shared/serviceFunc'

export const fetchPost: Function = (endpoint: string, payload: any): any => {
  // console.info('fetch.js->fetchPost [0]', { endpoint, payload })

  return fetch(endpoint, {
    method: 'POST', // *GET, POST, PUT, DELETE, etc.
    mode: 'cors', // no-cors, cors, *same-origin
    cache: 'default', // *default, no-cache, reload, force-cache, only-if-cached
    credentials: 'omit', //(devModeTrueFalse() ? 'omit' : 'include'), // include, *same-origin, omit
    headers: {
      Accept: 'application/json, application/x-www-form-urlencoded, text/plain, */*',
      'access-control-allow-origin': '.userto.com',
      //'access-control-allow-headers': 'content-type, access-control-allow-origin, access-control-allow-methods, content-type',
      'content-type': 'application/json',
      // 'Content-Type': 'application/x-www-form-urlencoded', text/plain, application/json
    },
    redirect: 'follow', // manual, *follow, error
    referrer: 'no-referrer', // no-referrer, *client
    body: JSON.stringify(payload), // body data type must match 'Content-Type' header
  })
}

export const fetchGet: Function = (endpoint: string, payload: any): any => {

  const payloadString: string = serviceFunc.serialize(payload, '')
  const endpointPayload: string = `${endpoint}`
  // console.info('fetch.js->fetchGet [5]', { endpointPayload, payload })

  return fetch(endpointPayload, {
    method: 'GET', // *GET, POST, PUT, DELETE, etc.
    mode: 'cors', // no-cors, cors, *same-origin
    cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
    credentials: 'omit', // (devModeTrueFalse() ? 'omit' : 'include'), // include, *same-origin, omit  //Should include to preserve PHPSESSID
    headers: {
      Accept: 'application/json, application/x-www-form-urlencoded, text/plain, */*',
      'access-control-allow-origin': '.westelm.com',
      'Content-Type': 'application/json',
      // 'Content-Type': 'application/x-www-form-urlencoded', text/plain, application/json
      // 'Access-Control-Allow-Credentials': true,
    },
    redirect: 'follow', // manual, *follow, error
    referrer: 'client', // no-referrer, *client
  })

}
