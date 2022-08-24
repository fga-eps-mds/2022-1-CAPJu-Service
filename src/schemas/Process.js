import mongoose from "mongoose";
const { Schema, model } = mongoose;

const ProcessSchema = new Schema(
  {
    registro: {type: String, unique: true},
    apelido: String,
    etapas: Array,
    arquivado: {type: Boolean, default: false},
    etapaAtual: Schema.Types.ObjectId,
    fluxoId: Schema.Types.ObjectId
  },
  {
    timestamps: true,
  }
);

export default model("Process", ProcessSchema);
