const Task = require('../models/taskModel');

const taskController = {
  createTask: async (req, res) => {
    try {
      const { label, description, starting_date, ending_date, project } = req.body;
      const task = await Task.create({
        label,
        description,
        starting_date,
        ending_date,
        project,
      });
      res.status(201).json(task);
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },
  getAllTasks: async (req, res) => {
    try {
      const tasks = await Task.find().populate('project', 'label');
      res.json(tasks);
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },
  getTaskById: async (req, res) => {
    try {
      const { taskId } = req.params;
      const task = await Task.findById(taskId).populate('project', 'label');
      if (!task) {
        return res.status(404).json({ error: 'Task not found' });
      }
      res.json(task);
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },
  updateTaskById: async (req, res) => {
    try {
      const { taskId } = req.params;
      const { label, description, starting_date, ending_date, project } = req.body;
      const task = await Task.findByIdAndUpdate(
        taskId,
        { label, description, starting_date, ending_date, project },
        { new: true }
      ).populate('project', 'label');
      if (!task) {
        return res.status(404).json({ error: 'Task not found' });
      }
      res.json(task);
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },
  deleteTaskById: async (req, res) => {
    try {
      const { taskId } = req.params;
      const task = await Task.findByIdAndDelete(taskId);
      if (!task) {
        return res.status(404).json({ error: 'Task not found' });
      }
      res.sendStatus(204);
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },
};

module.exports = taskController;