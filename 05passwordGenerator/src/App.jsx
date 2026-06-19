import { useCallback, useState,useEffect,useRef } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'

function App() {
  const [length, setLength] = useState(8)
  const [numberAllowed,setNumberAllowed] = useState(false)
  const [charAllowed,setCharAllowed] = useState(false)
  const [password,setPassword] = useState("")
  const passRef = useRef(null)
  const passwordGenerator = useCallback(()=>{
    let pass = ""
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
    let numbers = "1234567890"
    let chars = "!@#$%&^*_><?|"
    if(numberAllowed) str+=numbers 
    if(charAllowed) str+=chars 
    for (let index = 1; index <= length; index++) {
      let char = Math.floor(Math.random()* str.length + 1)
      pass += str.charAt(char)
      
    }
    setPassword(pass)
  },[length,numberAllowed,charAllowed,setPassword])
  const copyToClipboard = useCallback(()=>{
    passRef.current?.select()
    window.navigator.clipboard.writeText(password)
  },[password])
  useEffect(()=>{
    passwordGenerator()
  },[length,numberAllowed,charAllowed,passwordGenerator])
  
  
  return (
    <div className="bg-gray-900 min-h-screen p-5">
  <div className="bg-gray-700 rounded-xl p-4">
    <h1 className="text-4xl text-center text-white my-3">
      Password Generator
    </h1>
    <div className='flex flex-wrap'>
    <input
      type="text"
      value={password}
      placeholder="password"
      className="outline-none flex-1 py-3 px-4 text-black bg-white rounded-xl "
      ref={passRef}
      readOnly
    />
    <button className='outline-none py-3 px-4 bg-blue-400 text-white rounded-xl'
    onClick={copyToClipboard}>copy</button>
    </div>
    <div
    className='flex text-sm gap-x-4 py-2'>
      <div className='flex items-center gap-x-1'>
        <input type="range"
        min={8}
        max={25}
        value={length}
        className='curson-pointer'
        onChange={(e)=>{setLength(e.target.value)}}
         />
         <label className='text-orange-500 text-lg'>Length:{length}</label>
      </div>
      <div className='flex items-center gap-x-1'>
      <input type="checkbox"
      defaultChecked={numberAllowed}
      id='numberInput'
      onChange={()=>{
        setNumberAllowed((prev)=> !prev)
      }} />
      <label className='text-orange-500 text-lg' htmlFor='numberInput'>Numbers</label>
      </div>
      <div className='flex items-center gap-x-1'>
      <input type="checkbox"
      defaultChecked={charAllowed}
      id='charInput'
      onChange={()=>{
        setCharAllowed((prev)=> !prev)
      }} />
      <label className='text-orange-500 text-lg' htmlFor='charInput'>Characters</label>
      </div>
    </div>
  </div>
</div>
  )
}

export default App


//Theory:

// useRef: "I want to store something between renders, but I don't want React to re-render the component."
// Used for:
// Accessing DOM elements
// const inputRef = useRef();

// <input ref={inputRef} />

// button → inputRef.current.focus()

// Storing values that survive re-renders
// const timerRef = useRef();

// useState → stores value + re-renders

// useRef → stores value + NO re-render

// ------------------------------------------------------

// useEffect: "I need to do something AFTER React renders."

// Render UI
// ↓
// useEffect runs
// ↓
// Do side effects

// --------------------------------------------------------

// useCallback: "React keeps creating a new function every render and it's causing unnecessary work."
// Without useCallback
// Every render:

// new function
// new function
// new function

// With useCallback
// Used for:
// optimization
// preventing unnecessary child re-renders
// stable function references