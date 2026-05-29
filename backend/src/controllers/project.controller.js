import asyncHandler from "express-async-handler";
import Project from "../models/Project.js";

export const createProject = asyncHandler(async (req, res) => {
  const {
    title,
    description,
    status,
    techStack,
    githubLink,
    liveLink,
  } = req.body;

  if (!title) {
    res.status(400);
    throw new Error("Title is required");
  }

  const project = await Project.create({
    user: req.user._id,
    title,
    description,
    status,
    techStack,
    githubLink,
    liveLink,
  });

  res.status(201).json(project);
});

export const getProjects = asyncHandler(async (req, res) => {
  const projects = await Project.find({
    user: req.user._id,
  }).sort({ createdAt: -1 });

  res.json(projects);
});

export const getProjectById = asyncHandler(async (req, res) => {
  const project = await Project.findById(req.params.id);

  if (!project) {
    res.status(404);
    throw new Error("Project not found");
  }

  if (
    project.user.toString() !==
    req.user._id.toString()
  ) {
    res.status(403);
    throw new Error("Access denied");
  }

  res.json(project);
});

export const updateProject = asyncHandler(async (req, res) => {
  const project = await Project.findById(req.params.id);

  if (!project) {
    res.status(404);
    throw new Error("Project not found");
  }

  if (
    project.user.toString() !==
    req.user._id.toString()
  ) {
    res.status(403);
    throw new Error("Access denied");
  }

  project.title = req.body.title ?? project.title;
  project.description =
    req.body.description ?? project.description;
  project.status = req.body.status ?? project.status;
  project.techStack =
    req.body.techStack ?? project.techStack;
  project.githubLink =
    req.body.githubLink ?? project.githubLink;
  project.liveLink =
    req.body.liveLink ?? project.liveLink;

  const updatedProject = await project.save();

  res.json(updatedProject);
});

export const deleteProject = asyncHandler(async (req, res) => {
  const project = await Project.findById(req.params.id);

  if (!project) {
    res.status(404);
    throw new Error("Project not found");
  }

  if (
    project.user.toString() !==
    req.user._id.toString()
  ) {
    res.status(403);
    throw new Error("Access denied");
  }

  await project.deleteOne();

  res.json({
    message: "Project deleted successfully",
  });
});