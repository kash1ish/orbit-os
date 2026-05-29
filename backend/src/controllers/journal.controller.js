import asyncHandler from "express-async-handler";
import Journal from "../models/Journal.js";

export const createJournal = asyncHandler(async (req, res) => {
  const {
    mood,
    learned,
    wins,
    challenges,
  } = req.body;

  if (!learned) {
    res.status(400);
    throw new Error(
      "Learned field is required"
    );
  }

  const journal = await Journal.create({
    user: req.user._id,
    mood,
    learned,
    wins,
    challenges,
  });

  res.status(201).json(journal);
});

export const getJournals = asyncHandler(async (req, res) => {
  const journals = await Journal.find({
    user: req.user._id,
  }).sort({
    createdAt: -1,
  });

  res.json(journals);
});

export const getJournalById = asyncHandler(async (req, res) => {
  const journal = await Journal.findById(
    req.params.id
  );

  if (!journal) {
    res.status(404);
    throw new Error(
      "Journal entry not found"
    );
  }

  if (
    journal.user.toString() !==
    req.user._id.toString()
  ) {
    res.status(403);
    throw new Error("Access denied");
  }

  res.json(journal);
});

export const updateJournal = asyncHandler(async (req, res) => {
  const journal = await Journal.findById(
    req.params.id
  );

  if (!journal) {
    res.status(404);
    throw new Error(
      "Journal entry not found"
    );
  }

  if (
    journal.user.toString() !==
    req.user._id.toString()
  ) {
    res.status(403);
    throw new Error("Access denied");
  }

  journal.mood =
    req.body.mood ?? journal.mood;
  journal.learned =
    req.body.learned ?? journal.learned;
  journal.wins =
    req.body.wins ?? journal.wins;
  journal.challenges =
    req.body.challenges ??
    journal.challenges;

  const updatedJournal =
    await journal.save();

  res.json(updatedJournal);
});

export const deleteJournal = asyncHandler(async (req, res) => {
  const journal = await Journal.findById(
    req.params.id
  );

  if (!journal) {
    res.status(404);
    throw new Error(
      "Journal entry not found"
    );
  }

  if (
    journal.user.toString() !==
    req.user._id.toString()
  ) {
    res.status(403);
    throw new Error("Access denied");
  }

  await journal.deleteOne();

  res.json({
    message:
      "Journal entry deleted successfully",
  });
});