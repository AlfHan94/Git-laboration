import { useState, useEffect } from "react"
import type { TodoType } from "../../types/todo"

function Todo() {
  const [todos, setTodos] = useState<TodoType[]>([]);

  useState(() => {
    fetch("src/mockdata/todo.json")
      .then((res) => res.json())
      .then((data) => {
        setTodos(data.todos)

      });
    todos?.map((todo: TodoType, index: number) => {
      console.log(todo)
    })
  },)



  function setCompleted(e: any) {
    console.log("selected todo " + e)

  }

  return (
    <>
      <h1>Todo</h1>
      <div className="todos-container">
        {
          todos?.map((todo: TodoType, index: number) => (
            <div className="todos" key={index}>
              <span className="todo-title">{todo.title}</span>
              <input type="checkbox" onChange={(e) => setCompleted(todo)} />
            </div>
          ))
        }
      </div>

    </>
  )
}


export default Todo;
