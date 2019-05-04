import React from 'react'
import ReactDOM from 'react-dom'
import { AppContainer } from 'react-hot-loader'
import { BrowserRouter } from 'react-router-dom'

import App from 'containers/App'

import 'styles/main.scss'

const render = (Component: number) => {
  ReactDOM.render(
    <AppContainer>
      <BrowserRouter>
        <Component />
      </BrowserRouter>
    </AppContainer>,
    document.getElementById('root')
  )
}

render(App)

if ((module as object).hot) {
  (module as object).hot.accept('containers/App', () => render(App))
} 
