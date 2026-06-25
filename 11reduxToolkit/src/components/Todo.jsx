import React, { useState,useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { removeTodo, updateTodo } from "../features/todo/todoSlice";

function Todos() {
  const todos = useSelector((state) => state.todos);
  const dispatch = useDispatch();

  const [editingId, setEditingId] = useState(null);
  const [editText, setEditText] = useState("");

    useEffect(()=>{
      localStorage.setItem("todos",JSON.stringify(todos))
    // console.log(todos)
    },[todos])
  
    


  return (
    <ul className="list-none">
      {todos.map((todo) => (
        <li
          key={todo.id}
          className="mt-4 flex justify-between items-center bg-zinc-800 px-4 py-2 rounded"
        >
          {editingId === todo.id ? (
            <input
              type="text"
              value={editText}
              onChange={(e) => setEditText(e.target.value)}
              className="bg-zinc-700 text-white px-2 py-1 rounded w-full mr-4"
            />
          ) : (
            <div className="text-white">{todo.text}</div>
          )}

          <div className="flex gap-2">
            <button
              onClick={() => {
                if (editingId === todo.id) {
                  dispatch(
                    updateTodo({
                      id: todo.id,
                      text: editText,
                    })
                  );
                  setEditingId(null);
                } else {
                  setEditingId(todo.id);
                  setEditText(todo.text)
                }
              }}
              className="text-white bg-blue-500 border-0 py-1 px-4 hover:bg-blue-600 rounded text-md"
            >
              {editingId === todo.id ? "Save" : "Edit"}
            </button>

            <button
              onClick={() => dispatch(removeTodo(todo.id))}
              className="text-white bg-red-500 border-0 py-1 px-4 hover:bg-red-600 rounded text-md"
            >
              Delete
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
}

export default Todos;