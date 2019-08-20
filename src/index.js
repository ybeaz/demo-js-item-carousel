import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter, Route, Switch, Redirect  } from 'react-router-dom'
import { Provider } from 'react-redux'
import uuidv4 from 'uuid/v4'

import './ViewLayer/CssStyles/index.less'
// import './Shared/styles.less' 

import * as actions from './DataLayer/actions/index'
import store from './DataLayer/store'
import * as serviceFunc from './Shared/serviceFunc'
import { ItemCard } from './ViewLayer/Pages/ItemCard.react'
import { Error404Page } from './ViewLayer/Pages/Error404.react'

const PAGES = {
  ItemCard,
}

const rootPart = 'demo-js-item-carousel.html'
const { router } = {
  router: {
    routes: [
      { path: '/', exact: true, page: 'ItemCard' },
      { path: 'item0', exact: true, page: 'ItemCard' },
    ],
    redirects: [
      { from: `/${rootPart}`, to: 'item0', exact: true },
    ],
  },
}

const { routes, redirects } = router


const getRedirects = () => redirects
  .map(redirect => {
    const { from, to: pagePart, exact } = redirect
    const to = `/${rootPart}/${pagePart}`
    return (
      <Route
        key={from}
        {...{ path: from, exact }}
      >
        <Redirect {...{ from, to }} />
      </Route>
    )
  })

const getRoutes = () => routes
  .map((route, i) => {
    const { path: pagePart, exact, page } = route
    const Page = PAGES[page]
    const path = `/${rootPart}/${pagePart}`
    // console.info('App->getRoutes', { path, rootPart, pagePart, exact, page, Page })
    return (
      <Route
        key={i}
        {...{ path, exact }}
        component={() => <Page />}
      />
    )
  })


const App = () => {

  // Section to set the favicon
  serviceFunc.setPageFavicon(global, 'https://userto.com/img/favicon.ico')

  // Section for store and data 
  // store.dispatch(actions.INIT_TREE_DATA({ treeData: {} }))

  return (
    <Provider store={store}>
      <BrowserRouter>
        <Switch>
          {getRedirects()}
          {getRoutes()}
          <Route component={Error404Page} />
        </Switch>
      </BrowserRouter>
    </Provider>
  )
}

const rootElement = document.getElementById('root')
ReactDOM.render(<App />, rootElement)
