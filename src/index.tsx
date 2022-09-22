import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import App from './App'
import { persistor, store } from './app/store'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import { Loader } from './components/Loader/Loader'

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
)
root.render(
  <Provider store={store}>
    <PersistGate loading={<Loader />} persistor={persistor}>
      <App />
    </PersistGate>
  </Provider>
)
