import {history, Page} from '@doce/core'
import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import * as serviceWorker from './serviceWorker'

import 'client/pages'

Page.reAuthenticate().then(() => {

}).catch(e => {
  history.push('/login')
  console.log(location.pathname)
})

ReactDOM.render(
  Page.renderRoot(),
  document.getElementById('root'),
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
