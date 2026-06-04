import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'

function App() {
  let [count, setCount] = useState(0)
  const addValue = () =>{
    if(count<20){
      setCount(count+1)
    }
    
  }
  const subtractValue = () =>{
    if(count>0){
      setCount(count-1)
    }
  }
  return (
    <>
      <h1>Count Value {count}</h1>
      <button onClick={addValue}>Add value</button>
      <br />
      <button onClick={subtractValue}>Subtract Value</button>
    </>
  )
}

export default App
