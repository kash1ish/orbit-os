import express from "express";

import {
  createNote,
  getNotes,
  getNoteById,
  updateNote,
  deleteNote,
} from "../controllers/note.controller.js";

import { protect } from "../middleware/auth.middleware.js";

const router = express.Router();

router
  .route("/")
  .post(protect, createNote)
  .get(protect, getNotes);

router
  .route("/:id")
  .get(protect, getNoteById)
  .put(protect, updateNote)
  .delete(protect, deleteNote);

export default router;