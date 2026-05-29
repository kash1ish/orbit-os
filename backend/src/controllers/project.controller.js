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
  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 10;

  const query = {
    user: req.user._id,
  };

  if (req.query.status) {
    query.status = req.query.status;
  }

  if (req.query.search) {
    query.title = {
      $regex: req.query.search,
      $options: "i",
    };
  }

  const total = await Project.countDocuments(query);

  const projects = await Project.find(query)
    .sort({ createdAt: -1 })
    .skip((page - 1) * limit)
    .limit(limit);

  res.json({
    projects,
    currentPage: page,
    totalPages: Math.ceil(total / limit),
    totalItems: total,
  });
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