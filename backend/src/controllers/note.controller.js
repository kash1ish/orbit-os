import asyncHandler from "express-async-handler";
import Note from "../models/Note.js";

export const createNote = asyncHandler(async (req, res) => {
  const { title, content, tags } = req.body;

  if (!title || !content) {
    res.status(400);
    throw new Error("Title and content are required");
  }

  const note = await Note.create({
    user: req.user._id,
    title,
    content,
    tags,
  });

  res.status(201).json(note);
});

export const getNotes = asyncHandler(async (req, res) => {
  const notes = await Note.find({
    user: req.user._id,
  }).sort({
    createdAt: -1,
  });

  res.json(notes);
});

export const getNoteById = asyncHandler(async (req, res) => {
  const note = await Note.findById(req.params.id);

  if (!note) {
    res.status(404);
    throw new Error("Note not found");
  }

  if (
    note.user.toString() !==
    req.user._id.toString()
  ) {
    res.status(403);
    throw new Error("Access denied");
  }

  res.json(note);
});

export const updateNote = asyncHandler(async (req, res) => {
  const note = await Note.findById(req.params.id);

  if (!note) {
    res.status(404);
    throw new Error("Note not found");
  }

  if (
    note.user.toString() !==
    req.user._id.toString()
  ) {
    res.status(403);
    throw new Error("Access denied");
  }

  note.title = req.body.title ?? note.title;
  note.content = req.body.content ?? note.content;
  note.tags = req.body.tags ?? note.tags;

  const updatedNote = await note.save();

  res.json(updatedNote);
});

export const deleteNote = asyncHandler(async (req, res) => {
  const note = await Note.findById(req.params.id);

  if (!note) {
    res.status(404);
    throw new Error("Note not found");
  }

  if (
    note.user.toString() !==
    req.user._id.toString()
  ) {
    res.status(403);
    throw new Error("Access denied");
  }

  await note.deleteOne();

  res.json({
    message: "Note deleted successfully",
  });
});