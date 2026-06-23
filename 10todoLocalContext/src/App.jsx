import { useState,useEffect } from 'react'
import './App.css'
import { TodoContextProvider } from './context/TodoContext'
import TodoItem from './components/TodoItem'
import TodoForm from './components/TodoForm'
function App() {
  const [todos, setTodos] = useState(() => {
  const savedTodos = localStorage.getItem("todos");

  return savedTodos ? JSON.parse(savedTodos) : [];
});
  const addTodo = (todo) => {
    setTodos((prev)=> [...prev,{id:Date.now(),todo,completed: false}])
  }
  const updateTodo = (id,todo)=>{
    setTodos((prev)=> prev.map((prevTodo=>(prevTodo.id === id)? todo:prevTodo)))
  }
  const deleteTodo = (id)=>{
    setTodos((prev)=> prev.filter((prevTodo)=> prevTodo.id !== id))
  }
  const toggleTodo = (id)=>{
    setTodos((prev)=>prev.map((prevTodo)=>prevTodo.id ===id ? {...prevTodo,completed: !prevTodo.completed}:prevTodo))
  }

  useEffect(()=>{
    localStorage.setItem("todos",JSON.stringify(todos))
  },[todos])

  useEffect(()=>{
    const todo = JSON.parse(localStorage.getItem("todos"))
    if(todo){
    setTodos(todo)
  }
  },[])

  


  return (
    <TodoContextProvider value={{todos,addTodo,updateTodo,deleteTodo,toggleTodo}}>
      <div className="bg-[#172842] min-h-screen py-8">
                <div className="w-full max-w-2xl mx-auto shadow-md rounded-lg px-4 py-3 text-white">
                    <h1 className="text-2xl font-bold text-center mb-8 mt-2">Manage Your Todos</h1>
                    <div className="mb-4">
                        <TodoForm/> 
                    </div>
                    <div className="flex flex-wrap gap-y-3">
                        {/*Loop and Add TodoItem here */}
                        {todos.map((todo)=>(
                          <div key={todo.id} className='w-full'>
                            <TodoItem todo={todo}/>
                          </div>
                        ))}
                    </div>
                </div>
            </div>
    </TodoContextProvider>
  )
}

export default App
