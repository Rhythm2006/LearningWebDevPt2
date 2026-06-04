import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'
// https://github.com/acdlite/react-fiber-architecture
//read this to know about reactfibre and reconciliation.
function App() {
  let [count, setCount] = useState(0)
  const addValue = () =>{
    if(count<20){
      setCount(count+1)
      setCount(count+1)
      setCount(count+1)
      setCount(count+1) 
      setCount(count+1)
      setCount(count+1)
      setCount(count+1) 
      // Because all four calls use the same old value of counter, React batches them together and ends up setting the state to 1 only once, not incrementing it four times.
      // To increment multiple times, use:

      // setCounter(c => c + 1);
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
