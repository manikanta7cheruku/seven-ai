// main.jsx — The entry point of the entire React application.
// This file renders the root <App /> component into the DOM.
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css' // Tailwind + custom styles

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)