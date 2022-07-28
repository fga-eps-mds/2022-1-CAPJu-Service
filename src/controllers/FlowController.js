import Flow from "../schemas/Flow.js";
import Stage from "../schemas/Stage.js";
import { FlowValidator } from "../validators/Flow.js";

class FlowController {
  async createFlow(req, res) {
    try {
      const { name, stages, sequences } = await FlowValidator.validateAsync(
        req.body
      );

      for (const stage of stages) {
        const existing = await Stage.find({ _id: stage });
        if (!existing)
          return res.status(404).json({ message: "Etapa não encontrada" });
      }

      for (const sequence of sequences) {
        if (!stages.includes(sequence.from) || !stages.includes(sequence.to)) {
          return res.status(404).json({ message: "Sequência inválida" });
        }
      }

      const flow = await Flow.create({
        name,
        stages,
        sequences,
      });

      return res.status(200).json(flow);
    } catch (error) {
      console.log(error);
      return res.status(500).json(error);
    }
  }

  async allFlows(req, res) {
    try {
      const Flows = await Flow.find();
      return res.status(200).json({
        Flows,
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json(error);
    }
  }
}

export default new FlowController();
