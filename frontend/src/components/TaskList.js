import { FaTrash } from "react-icons/fa";
import axios from "axios";

function TaskList({ tasks, onTaskDeleted, onTaskUpdated }) {
  const toggleComplete = async (task) => {
    const res = await axios.put(`http://localhost:5000/tasks/${task._id}`, {
      completed: !task.completed,
    });
    onTaskUpdated(res.data);
  };

  const deleteTask = async (id) => {
    await axios.delete(`http://localhost:5000/tasks/${id}`);
    onTaskDeleted(id);
  };

  return (
    <ul>
      {tasks.map((task) => (
        <li key={task._id} className={task.isNew ? "new-task" : ""}>
          <span className={`badge ${task.priority || "Low"}`}>
            {task.priority || "Low"}
          </span>
          <span
            className={task.completed ? "completed" : ""}
            onClick={() => toggleComplete(task)}
          >
            {task.title}
          </span>
          <button onClick={() => deleteTask(task._id)}>
            <FaTrash color="#ef4444" />
          </button>
        </li>
      ))}
    </ul>
  );
}

export default TaskList;
