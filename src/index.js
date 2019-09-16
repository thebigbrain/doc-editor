import { Page } from '@doce/core'
import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import * as serviceWorker from './serviceWorker'

import './pages'

import Landing from 'components/Landing/Landing'

Page.setLanding(Landing)

ReactDOM.render(
  Page.getRoot(),
  document.getElementById('root'),
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
