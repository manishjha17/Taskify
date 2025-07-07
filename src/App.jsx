import { useState, useEffect } from 'react'
import Navbar from './components/Navbar'
import './App.css'

function App() {
  const [todos, setTodos] = useState(() => {
    const storedTodos = localStorage.getItem("todos")
    return storedTodos ? JSON.parse(storedTodos) : []
  })

  const [todo, setTodo] = useState("")

  const [page, setPage] = useState(() => {
    const storedPage = localStorage.getItem("page")
    return storedPage || "home"
  })

  // 🚀 Save todos to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos))
  }, [todos])

  // 🚀 Save page to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("page", page)
  }, [page])

  const addTodo = () => {
    if (todo.trim() === "") return
    setTodos([...todos, { text: todo, completed: false }])
    setTodo("")
  }

  const deleteTodo = (index) => {
    setTodos(todos.filter((_, i) => i !== index))
  }

  const toggleTodo = (index) => {
    const updated = [...todos]
    updated[index].completed = !updated[index].completed
    setTodos(updated)
  }

  const editTodo = (index) => {
    const newText = prompt("Edit task:", todos[index].text)
    if (newText?.trim()) {
      const updated = [...todos]
      updated[index].text = newText
      setTodos(updated)
    }
  }

  const completedCount = todos.filter(t => t.completed).length
  const remainingCount = todos.length - completedCount

  return (
    <>
      <Navbar page={page} setPage={setPage} />

      <div className="container mx-auto my-5 rounded-xl p-5 bg-slate-200 min-h-[80vh]">

        {/* 🏠 Home Page */}
        {page === "home" && (
          <div className="home my-5 text-center">
            <h1 className='text-3xl font-bold'>🏠 Welcome!</h1>
            <p className='text-gray-700 mt-2'>Here’s your task summary:</p>
            <div className='mt-4 text-lg'>
              ✅ Completed: <span className='font-bold'>{completedCount}</span><br />
              📋 Remaining: <span className='font-bold'>{remainingCount}</span><br />
              📑 Total: <span className='font-bold'>{todos.length}</span>
            </div>
          </div>
        )}

        {/* 📝 Tasks Page */}
        {page === "tasks" && (
          <>
            <div className="addTodo my-5">
              <h2 className='text-lg font-bold'>Add a Task</h2>
              <input
                value={todo}
                onChange={(e) => setTodo(e.target.value)}
                type="text"
                placeholder="Write your task here..."
                className='w-1/2 bg-amber-50 rounded-md p-1'
              />
              <button
                onClick={addTodo}
                className='bg-green-600 hover:bg-green-700 p-2 py-1 text-sm font-bold text-white rounded-md mx-1'
              >
                Add
              </button>
            </div>

            <h2 className='text-lg font-bold'>📋 Your Tasks</h2>

            <div className="todos space-y-2">
              {todos.length === 0 && <p className='text-gray-600'>No tasks yet. Start adding some!</p>}

              {todos.map((item, index) => (
                <div
                  key={index}
                  className="todo flex items-center justify-between bg-white p-2 rounded shadow"
                >
                  <div
                    onClick={() => toggleTodo(index)}
                    className={`cursor-pointer ${item.completed ? "line-through text-gray-500" : ""}`}
                  >
                    {item.text}
                  </div>

                  <div className="buttons">
                    <button
                      onClick={() => editTodo(index)}
                      className='bg-blue-500 hover:bg-blue-700 p-2 py-1 text-sm font-bold text-white rounded-md mx-1'
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => deleteTodo(index)}
                      className='bg-red-500 hover:bg-red-700 p-2 py-1 text-sm font-bold text-white rounded-md mx-1'
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </>
  )
}

export default App
