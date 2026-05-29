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
  // 1. Initialize the base query object with the logged-in user's ID
  const query = {
    user: req.user._id,
  };

  // 2. Add search filter if present
  if (req.query.search) {
    // Escapes special regex characters to prevent breaking queries
    const safeSearch = req.query.search.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
    
    query.$or = [
      { title: { $regex: safeSearch, $options: "i" } },
      { content: { $regex: safeSearch, $options: "i" } },
    ];
  }

  // 3. Add tag filter if present
  if (req.query.tag) {
    query.tags = req.query.tag;
  }

  // 4. Execute the database query with the built filters
  const notes = await Note.find(query).sort({
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

  if (note.user.toString() !== req.user._id.toString()) {
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

  if (note.user.toString() !== req.user._id.toString()) {
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

  if (note.user.toString() !== req.user._id.toString()) {
    res.status(403);
    throw new Error("Access denied");
  }

  await note.deleteOne();

  res.json({
    message: "Note deleted successfully",
  });
});