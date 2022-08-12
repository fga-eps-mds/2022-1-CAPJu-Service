import Process from "../schemas/Process.js";
import { ProcessValidator, NextStageValidator } from "../validators/Process.js";

const findProcess = async (res, search) => {
  try {
    const processes = await Process.find(search);
    return res.status(200).json({
      processes,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
};

class ProcessController {
  async createProcess(req, res) {
    try {
      const { registro, apelido, etapaAtual, etapas, arquivado, fluxoId } =
        await ProcessValidator.validateAsync(req.body);
      const process = await Process.create({
        registro,
        apelido,
        etapaAtual,
        arquivado,
        etapas,
        fluxoId,
      });

      return res.status(200).json(process);
    } catch (error) {
      console.log(error);
      return res.status(500).json(error);
    }
  }

  async allProcesses(req, res) {
    return findProcess(res);
  }

  async processesInFlow(req, res) {
    const search = {
      fluxoId: req.params.flowId,
    };
    return findProcess(res, search);
  }

  async updateProcess(req, res) {
    try {
      await ProcessValidator.validateAsync(req.body);
      const process = await Process.findOneAndUpdate(req.params.id, req.body, {
        new: true,
      });

      return res.status(200).json(process);
    } catch (error) {
      console.log(error);
      return res.status(500).json(error);
    }
  }

  async deleteProcess(req, res) {
    try {
      const result = await Process.deleteOne({ registro: req.params.registro });

      console.log(result);
      if (result.deletedCount === 0) {
        throw new Error(`Não há registro ${req.params.registro}!`);
      }

      res.json(result);
    } catch (error) {
      console.log(error);
      return res.status(500).json(error);
    }
  }

  async nextStage(req, res) {
    try {
      const body = await NextStageValidator.validateAsync(req.body);

      const result = await Process.updateOne({ _id: body.processId }, { etapaAtual:body.stageId })

      res.status(200).json(result);
    } catch (error) {
      console.log(error);
      return res.status(500).json(error);
    }
  }
}

export default new ProcessController();
