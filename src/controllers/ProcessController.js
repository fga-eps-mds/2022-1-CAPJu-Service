import Process from "../schemas/Process.js";

class ProcessController {
  async createProcess(request, response) {
    const { registro, apelido } = request.body;
    try {
      const Process = await Process.create({
        registro,
        apelido,
      });

      return response.status(200).json(Process);
    } catch (error) {
      console.log(error);
      return response.json(error);
    }
  }

  async allProcesses(req, res) {
    const id = req.params.id;
    try {
      if (!id) return res.status(400).json({ message: "missing parameters" });

      const processes = await Process.find({ customer: id, deleted: false })
        .sort({ _id: 1 })
        .limit(10);

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
