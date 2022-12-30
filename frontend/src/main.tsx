import { PublicApi } from '@react-three/cannon'
import React from 'react'
import ReactDOM from 'react-dom/client'
import dotenv from 'dotenv-defaults';

import App from './App'
import './index.css'

// MyContext -> useMyContext
import { MyProvider } from './Utils/useMyContext'

import { GoogleOAuthProvider } from '@react-oauth/google';


ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <GoogleOAuthProvider clientId="400363191853-gjef8qplkajcu781n791f6eonffkcfq3.apps.googleusercontent.com">

      <MyProvider>
        <App />
      </MyProvider>

    </GoogleOAuthProvider>
  </React.StrictMode>,
)


