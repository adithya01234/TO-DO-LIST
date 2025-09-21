const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
  title: { type: String, required: true },
  completed: { type: Boolean, default: false },
  priority: { type: String, enum: ["High", "Medium", "Low"], default: "Low" }
});

module.exports = mongoose.model("Task", taskSchema);
