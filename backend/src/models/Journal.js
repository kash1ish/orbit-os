import mongoose from "mongoose";

const journalSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    mood: {
      type: String,
      enum: [
        "great",
        "good",
        "okay",
        "bad",
        "terrible",
      ],
      default: "okay",
    },

    learned: {
      type: String,
      required: true,
    },

    wins: {
      type: String,
      default: "",
    },

    challenges: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model(
  "Journal",
  journalSchema
);