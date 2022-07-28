import mongoose from "mongoose";
const { Schema, model } = mongoose;

const StageSchema = new Schema(
  {
    name: String,
  },
  {
    timestamps: true,
  }
);

export default model("Stage", StageSchema);
