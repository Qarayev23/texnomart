import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './assets/css/main.css'
import { ApiProvider } from "@reduxjs/toolkit/query/react";
import { productsApi } from './redux/productApi.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ApiProvider api={productsApi}>
      <App />
    </ApiProvider>
  </React.StrictMode>,
)
