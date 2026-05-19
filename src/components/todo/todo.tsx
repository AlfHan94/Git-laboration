import { useState } from "react"
import type TodoType from "../../types/todo"

function Todo() {
    const [todos, setTodos] = useState<typeof TodoType>()

    useState(() => {
        const todos = fetch("src/mockdata/todo.json")
        console.log(todos)
    }, )

  return (
    <>
        <h1>Todo</h1>
        
        
    </>
  )
}

export default Todo
