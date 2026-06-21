import { useEffect, useState } from "react";
import axios from "axios";

const API = "http://backend:5000/api/todos";

function App() {
  const [todos, setTodos] = useState([]);
  const [title, setTitle] = useState("");

  const fetchTodos = async () => {
    const res = await axios.get(API);
    setTodos(res.data);
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  const addTodo = async () => {
    if (!title.trim()) return;

    await axios.post(API, { title });

    setTitle("");
    fetchTodos();
  };

  const deleteTodo = async (id) => {
    await axios.delete(`${API}/${id}`);
    fetchTodos();
  };

  const toggleTodo = async (todo) => {
    await axios.put(`${API}/${todo._id}`, {
      completed: !todo.completed
    });

    fetchTodos();
  };

  return (
    <div
      style={{
        maxWidth: "600px",
        margin: "40px auto",
        fontFamily: "Arial"
      }}
    >
      <h1>Todo App</h1>

      <div>
        <input
          type="text"
          placeholder="Enter Todo"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <button onClick={addTodo}>
          Add Todo
        </button>
      </div>

      <ul>
        {todos.map((todo) => (
          <li
            key={todo._id}
            style={{
              marginTop: "10px",
              display: "flex",
              gap: "10px"
            }}
          >
            <span
              style={{
                textDecoration: todo.completed
                  ? "line-through"
                  : "none"
              }}
            >
              {todo.title}
            </span>

            <button
              onClick={() => toggleTodo(todo)}
            >
              {todo.completed
                ? "Undo"
                : "Complete"}
            </button>

            <button
              onClick={() =>
                deleteTodo(todo._id)
              }
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;