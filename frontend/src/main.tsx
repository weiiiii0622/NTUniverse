import { PublicApi } from '@react-three/cannon'
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'

// MyContext -> useMyContext
import { MyProvider } from './Utils/useMyContext'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <MyProvider>
      <App />
    </MyProvider>
  </React.StrictMode>,
)


