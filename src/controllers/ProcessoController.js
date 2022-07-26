import Processo from "../schemas/Processo.js";
import { ProcessoValidator } from "../validators/Processo.js"

class ProcessoController {
  async createProcesso(req, res) {
    try {
      const { registro, apelido} = await ProcessoValidator.validateAsync(req.body);
      const processo = await Processo.create({
        registro,
        apelido,
      });

      return res.status(200).json(processo);
    } catch (error) {
      console.log(error);
      return res.status(500).json(error);
    }
  }

  async todosProcessos(req, res) {
    try {
      const processos = await Processo.find();

      return res.status(200).json({
        processos,
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json(error);
    }
  }
}

export default new ProcessoController();
