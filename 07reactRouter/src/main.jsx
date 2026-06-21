import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { RouterProvider, createBrowserRouter,createRoutesFromElements,Route } from 'react-router-dom'
import Layout from '../Layout.jsx'
import Home from './components/Home/Home.jsx'
import About from './components/About/About.jsx'
import Contact from './components/Contact/Contact.jsx'
import User from './components/User/User.jsx'
import Github, { githubInfoLoader } from './components/Github/Github.jsx'

const routes = [{
  path: '',
  element: <Home/>
},{
  path: 'about',
  element: <About/>
},{
  path: 'contact',
  element: <Contact/>
},{
  path: 'user/:userid',
  element: <User/>
},{
  path: 'github',
  element: <Github/>,
  loader: githubInfoLoader
}]
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<Layout/>}>
      {routes.map((routes,index)=>{
        return(
        <Route key={index}
        path={routes.path}
        element={routes.element}
        loader={routes.loader}
        />)
      })}
    </Route>
  )
)


createRoot(document.getElementById('root')).render(
  <StrictMode>
   <RouterProvider router={router}/>
  </StrictMode>,
)
