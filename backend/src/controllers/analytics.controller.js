import asyncHandler from "express-async-handler";

import Goal from "../models/Goal.js";
import Project from "../models/Project.js";
import Journal from "../models/Journal.js";

export const getAnalytics = asyncHandler(
  async (req, res) => {
    const userId = req.user._id;

    const [
      totalGoals,
      completedGoals,
      totalProjects,
      completedProjects,
      moodStats,
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

      Journal.aggregate([
        {
          $match: {
            user: userId,
          },
        },
        {
          $group: {
            _id: "$mood",
            count: {
              $sum: 1,
            },
          },
        },
      ]),
    ]);

    const moodDistribution = {
      great: 0,
      good: 0,
      okay: 0,
      bad: 0,
      terrible: 0,
    };

    moodStats.forEach((item) => {
      moodDistribution[item._id] =
        item.count;
    });

    const goalCompletionRate =
      totalGoals === 0
        ? 0
        : Math.round(
            (completedGoals / totalGoals) * 100
          );

    const projectCompletionRate =
      totalProjects === 0
        ? 0
        : Math.round(
            (completedProjects /
              totalProjects) *
              100
          );
    
    const thirtyDaysAgo = new Date();

    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

    const recentJournalCount =
  await Journal.countDocuments({
    user: userId,
    createdAt: {
      $gte: thirtyDaysAgo,
    },
  });
    res.json({
      goalCompletionRate,
      projectCompletionRate,

      goals: {
        total: totalGoals,
        completed: completedGoals,
      },

      projects: {
        total: totalProjects,
        completed: completedProjects,
      },

      moodDistribution,

      last30DaysActivity: {
        journalEntries: recentJournalCount
      }
    });
  }
);