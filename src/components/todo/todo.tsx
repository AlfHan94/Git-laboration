import { useState, useEffect } from "react";
import type { TodoType } from "../../types/todo";

function Todo() {
  const [todos, setTodos] = useState<TodoType[]>([]);
  const [newTodo, setNewTodo] = useState("");
  const [deletedTodo, setDeletedTodo] = useState<TodoType | null>(null);
  const [filterCompletedTodos, setFilterCompletedTodos] = useState(true);
  const visiblesTodos = filterCompletedTodos ? todos.filter((todo) => !todo.completed) : todos
  useEffect(() => {
    fetch("src/mockdata/todo.json")
      .then((res) => res.json())
      .then((data) => {
        setTodos(data.todos);
      });



    // if (filterCompletedTodos == false) {
    //   setTodos((prevTodos) =>
    //     prevTodos.filter((todo) => todo.completed !== true)
    //   );
    // } else {
    //   setTodos(todos)
    // }


  }, [filterCompletedTodos]);

  function setCompleted(selectedTodo: TodoType) {
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo.title === selectedTodo.title
          ? { ...todo, completed: !todo.completed }
          : todo,
      ),
    );
  }

  function addTodo() {
    if (newTodo.trim() !== "") {
      const todo: TodoType = {
        id: todos.length + 1,
        title: newTodo,
        description: "",
        completed: false,
      };
      setTodos([...todos, todo]);
      setNewTodo("");
    }
  }
  function deleteTodo(selectedTodo: TodoType) {
    setDeletedTodo(selectedTodo);
    setTodos((prevTodos) =>
      prevTodos.filter((todo) => todo.title !== selectedTodo.title),
    );
  }

  return (
    <>
      <h1>Todo</h1>
      <div className="todos-container">
        <button onClick={() => setFilterCompletedTodos(!filterCompletedTodos)}>
          {filterCompletedTodos ? "Visa alla" : "Dölj slutförda"}
        </button>
        {visiblesTodos.map((todo) => (
          <div key={todo.id}>
            <span className="todo-title">{todo.title}</span>

            <input
              type="checkbox"
              checked={todo.completed}
              onChange={() => setCompleted(todo)}
            />
            <button onClick={() => deleteTodo(todo)}>Delete</button>
          </div>
        ))}
        <div className="add-todo">
          <input
            type="text"
            value={newTodo}
            onChange={(e) => setNewTodo(e.target.value)}
            placeholder="Add a new todo"
          />
          <button onClick={addTodo}>Add</button>
        </div>
      </div>
    </>
  );
}

export default Todo;
