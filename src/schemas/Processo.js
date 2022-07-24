import mongoose from "mongoose";
const { Schema, model } = mongoose;

const ProcessoSchema = new Schema(
  {
    registro: String,
    apelido: String,
  },
  {
    timestamps: true,
  }
);

export default model("Process", ProcessoSchema);
