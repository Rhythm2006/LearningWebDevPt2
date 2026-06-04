import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'
import Card10 from './components/Card'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <h1 className='bg-green-400 text-black p-4 rounded'>Tailwind Test</h1>
      <Card10 username="R" someObj='0.21'/>
      <Card10 username="M" someObj='0.31'/>
    </>
  )
}

export default App
