import React from 'react'
import ReactDOM from 'react-dom'

import './index.css'
import App from './App'
import reportWebVitals from './reportWebVitals'

import * as themes from './theme/schema.json'
import { setToLS } from './utils/storage'
/**
 * Use setToLS function to store data to the browser’s localStorage and to retrieve from there.
 * Load the themes into the browser’s localStorage when the app comes up for the first time.
 */

const Index = () => {
  setToLS('all-themes', themes.default)
  return(
    <App />
  )
}

ReactDOM.render(
  <React.StrictMode>
    <Index />
  </React.StrictMode>,
  document.getElementById('root')
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
