


/**
 * @description Returns true for devMode and false for production
 */
export const devModeTrueFalse: Function = (): boolean => {
  let devMode: boolean = false
  if (location.hostname === 'localhost' || location.hostname === '127.0.0.1') {
    devMode = true
  }

  return devMode
}

/**
 * @description Returns endpoint
 */
export const getEndpoint: Function = (): string => {
  let endpoint: string = 'https://r1.userto.com/dist/jsItemCarousel.json'
  if (devModeTrueFalse() === true) {
    // endpoint = 'http://localhost:8081/api/apiP2p/2.0'
    // endpoint = 'https://nd.userto.com/api/apiP2p/2.0'
    endpoint = 'http://127.0.0.1:3420/dist/dist/jsItemCarousel.json'
  }

  return endpoint
}


/**
 * @description Function to set the favicon
 */
export const setPageFavicon: Function = (w: Window, href: string): void => {
  let link: HTMLLinkElement = w.document.querySelector('link[rel*=\'icon\']')
  if (link === undefined || link === null) {
    link = w.document.createElement('link')
  }
  link.setAttribute('type', 'image/x-icon')
  link.setAttribute('rel', 'shortcut icon')
  link.setAttribute('href', href)
  w.document.getElementsByTagName('head')[0].appendChild(link)
}

/**
 * @description Function to serialize object or array for get request
 */
export const serialize: Function = (obj: any, prefix: string): string => {
  const arr: any[] = []
  Object.keys(obj).forEach((key: string) => {
    const k: string = prefix ? `${prefix}[${key}]` : key
    const v: any = obj[key]
    arr.push((v !== null && typeof v === 'object') ?
      serialize(v, k) :
        `${encodeURIComponent(k)}=${encodeURIComponent(v)}`,
    )
  })

  return arr.join('&')
}

