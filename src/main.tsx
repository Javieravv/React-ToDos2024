import React from 'react'
import ReactDOM from 'react-dom/client'
import { KindeProvider } from '@kinde-oss/kinde-auth-react'

import './styles/stylestodos.scss'
import '../node_modules/react-toastify/scss/main.scss'
import { App } from './App'

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <KindeProvider
            clientId="030ac841e52e461283cef708c918adb4"
            domain="https://xavierinc.kinde.com"
            redirectUri="http://localhost:5173"
            logoutUri="http://localhost:5173"
        >
            <App />
        </KindeProvider>
    </React.StrictMode>,
)
