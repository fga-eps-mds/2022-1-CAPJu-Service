import mongoose from "mongoose";
const { Schema, model } = mongoose;

const ProcessSchema = new Schema(
  {
    registro: String,
    apelido: String,
  },
  {
    timestamps: true,
  }
);

export default model("Process", ProcessSchema);
