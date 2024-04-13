import React from 'react'
import ReactDOM from 'react-dom/client'
import { KindeProvider } from '@kinde-oss/kinde-auth-react'

import './styles/stylestodos.scss'
import '../node_modules/react-toastify/scss/main.scss'
import { App } from './App'

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <KindeProvider
            clientId={import.meta.env.VITE_REACT_APP_CLIENTID}
            domain={import.meta.env.VITE_REACT_APP_DOMAIN}
            redirectUri={import.meta.env.VITE_REACT_APP_REDIRECTURI}
            logoutUri={import.meta.env.VITE_REACT_APP_LOGOUTURI}
        >
            <App />
        </KindeProvider>
    </React.StrictMode>,
)
