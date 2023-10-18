const Project = require('../models/projectModel');
const mongoose = require("mongoose");
const projectController = {
  createProject: async (req, res) => {
    try {
      const { label, description, status, starting_date, ending_date } = req.body;
      console.log(req.body);
      const project = await Project.create({
        label,
        description,
        status,
        starting_date,
        ending_date,
      });
      res.status(201).json(project);
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },
  getAllProjects: async (req, res) => {
    try {
      const projects = await Project.find();
      res.json(projects);
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },
  getProjectById: async (req, res) => {
    try {
      const { projectId } = req.params;
      const project = await Project.findById(projectId);
      if (!project) {
        return res.status(404).json({ error: 'Project not found' });
      }
      res.json(project);
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },
  updateProjectById: async (req, res) => {
    try {
      const { projectId } = req.params;
      const { label, description, status, starting_date, ending_date } = req.body;
      const project = await Project.findByIdAndUpdate(
        projectId,
        { label, description, status, starting_date, ending_date },
        { new: true }
      );
      if (!project) {
        return res.status(404).json({ error: 'Project not found' });
      }
      res.json(project);
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },
  deleteProjectById: async (req, res) => {
    try {
      const { projectId } = req.params;
      const project = await Project.findByIdAndDelete(projectId);
      if (!project) {
        return res.status(404).json({ error: 'Project not found' });
      }
      res.sendStatus(204);
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },
};

module.exports = projectController;