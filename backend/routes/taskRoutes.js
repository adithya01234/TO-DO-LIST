const express = require("express");
const router = express.Router();
const Task = require("../models/Task");

// Get all tasks
router.get("/", async (req, res) => {
  const tasks = await Task.find();
  res.json(tasks);
});

// Add new task
router.post("/", async (req, res) => {
  const task = new Task({ 
    title: req.body.title, 
    priority: req.body.priority || "Low" 
  });
  await task.save();
  res.json(task);
});

// Update task
router.put("/:id", async (req, res) => {
  const task = await Task.findById(req.params.id);
  task.completed = req.body.completed;
  await task.save();
  res.json(task);
});

// Delete task
router.delete("/:id", async (req, res) => {
  await Task.findByIdAndDelete(req.params.id);
  res.json({ message: "Deleted" });
});

module.exports = router;
