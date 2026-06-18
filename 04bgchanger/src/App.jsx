import { useState } from "react"


function App() {
  const [color,setColor] = useState("olive")
  return (
    <div className="w-full h-screen duration-200"
    style={{backgroundColor: color}}>
      <div className="fixed flex flex-wrap 
      justify-center bottom-15 inset-x-0 px-2">
        <div className="fixed flex flex-wrap 
      justify-center gap-3 shadow-lg bg-white px-3 py-2 rounded-xl">
        <button className={"outline-none px-4 py-1 rounded-full text-white shadow-lg text-shadow-lg"}
        style={{backgroundColor:"Red"}}
        onClick={()=>{
          setColor("Red")
        }}>Red</button>
        <button className={"outline-none px-4 py-1 rounded-full text-white shadow-lg text-shadow-lg"}
        style={{backgroundColor:"Olive"}}
        onClick={()=>{
          setColor("Olive")
        }}
        >Olive</button>
        <button className={"outline-none px-4 py-1 rounded-full text-white shadow-lg text-shadow-lg"}
        style={{backgroundColor:"Green"}}
         onClick={()=>{
          setColor("Green")
        }}>Green</button>
        <button className={"outline-none px-4 py-1 rounded-full text-white shadow-lg text-shadow-lg"}
        style={{backgroundColor:"Blue"}}
         onClick={()=>{
          setColor("Blue")
        }}>Blue</button>
        <button className={"outline-none px-4 py-1 rounded-full text-white shadow-lg text-shadow-lg"}
        style={{backgroundColor:"Yellow"}}
         onClick={()=>{
          setColor("Yellow")
        }}>Yellow</button>
      </div>
      </div>
    </div>
  );
}

export default App
