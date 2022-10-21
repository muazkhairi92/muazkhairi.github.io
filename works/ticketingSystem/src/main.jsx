import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import React from 'react'
import ReactDOM from 'react-dom/client'
import {Provider as ReduxProvider} from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import App from './App'
import store from './store'
import './index.css'
import AuthProvider from './providers/AuthProvider'

const queryClient = new QueryClient;

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
    <QueryClientProvider client={queryClient}>
    <ReduxProvider store={store}>
    <AuthProvider>
    <App />
    </AuthProvider>
    </ReduxProvider>
    </QueryClientProvider>
    </BrowserRouter>
  </React.StrictMode>
)
