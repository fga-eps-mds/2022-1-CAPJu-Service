import Process from "../schemas/Process.js";

class ProcessController {
  async createProcess(request, response) {
    const { registro, apelido } = request.body;
    try {
      const process = await Process.create({
        registro,
        apelido,
      });

      return response.status(200).json(process);
    } catch (error) {
      console.log(error);
      return response.status(500).json(error);
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
}

export default new ProcessController();
