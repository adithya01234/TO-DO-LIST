import { useState, useEffect } from "react";
import axios from "axios";
import TaskInput from "./components/TaskInput";
import TaskList from "./components/TaskList";
import "./App.css";

function App() {
  const [tasks, setTasks] = useState([]);
  const [darkMode, setDarkMode] = useState(false);

  // Fetch tasks from backend
  useEffect(() => {
    axios.get("http://localhost:5000/tasks").then((res) => setTasks(res.data));
  }, []);

  // Handlers
  const handleTaskAdded = (task) => {
    const newTask = { ...task, isNew: true };
    setTasks((prevTasks) => [...prevTasks, newTask]);

    setTimeout(() => {
      setTasks((prevTasks) =>
        prevTasks.map((t) =>
          t._id === newTask._id ? { ...t, isNew: false } : t
        )
      );
    }, 300);
  };

  const handleTaskDeleted = (id) =>
    setTasks((prevTasks) => prevTasks.filter((t) => t._id !== id));

  const handleTaskUpdated = (updated) =>
    setTasks((prevTasks) =>
      prevTasks.map((t) => (t._id === updated._id ? updated : t))
    );

  return (
    <div className={darkMode ? "container dark" : "container"}>
      <button className="toggle-btn" onClick={() => setDarkMode(!darkMode)}>
        {darkMode ? "Light Mode" : "Dark Mode"}
      </button>
      <h1>✨ My To-Do List ✨</h1>
      <TaskInput onTaskAdded={handleTaskAdded} />
      <TaskList
        tasks={tasks}
        onTaskDeleted={handleTaskDeleted}
        onTaskUpdated={handleTaskUpdated}
      />
    </div>
  );
}

export default App;
