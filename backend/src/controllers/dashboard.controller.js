import asyncHandler from "express-async-handler";

import Goal from "../models/Goal.js";
import Project from "../models/Project.js";
import Note from "../models/Note.js";
import Journal from "../models/Journal.js";

export const getDashboard = asyncHandler(
  async (req, res) => {
    const userId = req.user._id;

    const [
      totalGoals,
      completedGoals,
      totalProjects,
      completedProjects,
      totalNotes,
      totalJournals,
    ] = await Promise.all([
      Goal.countDocuments({
        user: userId,
      }),

      Goal.countDocuments({
        user: userId,
        completed: true,
      }),

      Project.countDocuments({
        user: userId,
      }),

      Project.countDocuments({
        user: userId,
        status: "completed",
      }),

      Note.countDocuments({
        user: userId,
      }),

      Journal.countDocuments({
        user: userId,
      }),
    ]);

    res.json({
      goals: {
        total: totalGoals,
        completed: completedGoals,
      },

      projects: {
        total: totalProjects,
        completed: completedProjects,
      },

      notes: totalNotes,

      journals: totalJournals,
    });
  }
);