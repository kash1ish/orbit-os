import asyncHandler from "express-async-handler";
import Goal from "../models/Goal.js";

export const createGoal = asyncHandler(async (req, res) => {
  const { title, description, deadline } = req.body;

  if (!title) {
    res.status(400);
    throw new Error("Title is required");
  }

  const goal = await Goal.create({
    user: req.user._id,
    title,
    description,
    deadline,
  });

  res.status(201).json(goal);
});

export const getGoals = asyncHandler(async (req, res) => {
  const goals = await Goal.find({
    user: req.user._id,
  }).sort({
    createdAt: -1,
  });

  res.json(goals);
});

export const getGoalById = asyncHandler(
  async (req, res) => {
    const goal = await Goal.findById(
      req.params.id
    );

    if (!goal) {
      res.status(404);
      throw new Error("Goal not found");
    }

    if (
      goal.user.toString() !==
      req.user._id.toString()
    ) {
      res.status(403);
      throw new Error("Access denied");
    }

    res.json(goal);
  }
);

export const updateGoal = asyncHandler(async (req, res) => {
  const goal = await Goal.findById(req.params.id);

  if (!goal) {
    res.status(404);
    throw new Error("Goal not found");
  }

  if (goal.user.toString() !== req.user._id.toString()) {
    res.status(403);
    throw new Error("Access denied");
  }

  goal.title = req.body.title ?? goal.title;
  goal.description = req.body.description ?? goal.description;
  goal.completed = req.body.completed ?? goal.completed;
  goal.deadline = req.body.deadline ?? goal.deadline;

  const updatedGoal = await goal.save();

  res.json(updatedGoal);
});

export const deleteGoal = asyncHandler(async (req, res) => {
  const goal = await Goal.findById(req.params.id);

  if (!goal) {
    res.status(404);
    throw new Error("Goal not found");
  }

  if (goal.user.toString() !== req.user._id.toString()) {
    res.status(403);
    throw new Error("Access denied");
  }

  await goal.deleteOne();

  res.json({
    message: "Goal deleted successfully",
  });
});