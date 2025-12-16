import React, { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { Toaster } from 'sonner'
import { Provider } from 'react-redux'
import ReactDOM from 'react-dom/client'
import store from './redux/store'
import { persistStore } from 'redux-persist'
import { PersistGate } from 'redux-persist/integration/react'
import AuthChecker from './components/AuthChecker.jsx'


const persistor=persistStore(store);


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <AuthChecker>
        <App />
      </AuthChecker>
    </PersistGate>
    </Provider>
    <Toaster/>
  </React.StrictMode>,
)
