import React from 'react'
import ReactDOM from 'react-dom/client'
import './styles/stylestodos.scss'
import '../node_modules/react-toastify/scss/main.scss'
import { App } from './App'

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <App />
    </React.StrictMode>,
)
