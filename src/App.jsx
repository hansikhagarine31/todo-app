import { useState } from 'react';
import './App.css';

function App() {
  const [tasks, setTasks] = useState([
    { id: 1, text: "Task 1", completed: false }
  ]);
  const [text, setText] = useState("");
  const [filter, setFilter] = useState("All");

  const addTask = () => {
    if (!text.trim()) return;
    setTasks([{ id: Date.now(), text, completed: false }, ...tasks]);
    setText("");
  };

  const toggleTask = (id) => {
    setTasks(tasks.map(t =>
      t.id === id ? { ...t, completed: !t.completed } : t
    ));
  };

  const filtered = tasks.filter(t =>
    filter === "All" ? true :
    filter === "Pending" ? !t.completed :
    t.completed
  );

  return (
    <div id="center">
      <h2>TODO App</h2>

      <div>
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Enter task"
        />
        <button onClick={addTask}>Add</button>
      </div>

      <div style={{ marginTop: "10px" }}>
        {["All", "Pending", "Completed"].map(f => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            style={{ marginRight: "10px" }}
          >
            {f}
          </button>
        ))}
      </div>

      <div style={{ marginTop: "20px" }}>
        {filtered.map(t => (
          <div
            key={t.id}
            onClick={() => toggleTask(t.id)}
            style={{
              cursor: "pointer",
              marginBottom: "10px",
              textDecoration: t.completed ? "line-through" : "none"
            }}
          >
            {t.text} {t.completed && "✔"}
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;