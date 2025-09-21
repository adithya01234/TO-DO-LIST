import { useState } from "react";
import axios from "axios";

function TaskInput({ onTaskAdded }) {
  const [title, setTitle] = useState("");
  const [priority, setPriority] = useState("Low");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim()) return;

    const res = await axios.post("http://localhost:5000/tasks", {
      title,
      priority,
    });
    onTaskAdded(res.data);
    setTitle("");
    setPriority("Low");
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Enter task..."
      />
      <select value={priority} onChange={(e) => setPriority(e.target.value)}>
        <option value="High">High</option>
        <option value="Medium">Medium</option>
        <option value="Low">Low</option>
      </select>
      <button type="submit">Add</button>
    </form>
  );
}

export default TaskInput;
