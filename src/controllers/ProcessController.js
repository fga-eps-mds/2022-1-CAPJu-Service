import Process from "../schemas/Process.js";
import { ProcessValidator } from "../validators/Process.js"

class ProcessController {
  async createProcess(req, res) {
    try {
      const { registro, apelido} = await ProcessValidator.validateAsync(req.body);
      const process = await Process.create({
        registro,
        apelido,
      });

      return res.status(200).json(process);
    } catch (error) {
      console.log(error);
      return res.status(500).json(error);
    }
  }

  async allProcesses(req, res) {
    try {
      const processes = await Process.find();

      return res.status(200).json({
        processes,
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json(error);
    }
  }

  async deleteProcess(req, res){
    try {
      const result = await Process.deleteOne({registro: req.params.registro});
      
      console.log(result);
      if (result.deletedCount === 0) {
        throw new Error(`Não há registro ${req.params.registro}!`)
      }

      res.json(result);
    } catch (error) {
      console.log(error);
      return res.status(500).json(error);
    }
  }
}

export default new ProcessController();
