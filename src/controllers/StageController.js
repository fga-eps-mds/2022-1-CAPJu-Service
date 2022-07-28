import Stage from "../schemas/Stage.js";
import { StageValidator } from "../validators/Stage.js";

class StageController {
  async createStage(req, res) {
    try {
      const { name } = await StageValidator.validateAsync(req.body);
      console.log(name);
      const stage = await Stage.create({
        name,
      });

      return res.status(200).json(stage);
    } catch (error) {
      console.log(error);
      return res.status(500).json(error);
    }
  }

  async allStages(req, res) {
    try {
      const Stages = await Stage.find();
      return res.status(200).json({
        Stages,
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json(error);
    }
  }
}

export default new StageController();
