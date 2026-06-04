import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import React from 'react'


const reactElement = React.createElement(
  'a',
  {href: 'https://google.com',target: '__blank'},
  'Click me to visit google'
)
createRoot(document.getElementById('root')).render(
  
    reactElement
  
)
