import Stage from "../schemas/Stage.js";
import { StageValidator } from "../validators/Stage.js";

class StageController {
  async createStage(req, res) {
    try {
      const { name } = await StageValidator.validateAsync(req.body);
      console.log(name);
      const stage = await Stage.create({
        name,
        deleted: false,
      });

      return res.status(200).json(stage);
    } catch (error) {
      console.log(error);
      return res.status(500).json(error);
    }
  }

  async deleteStage(req, res) {
    try {
      const stageId = req.body.stageId;
      const stage = await Stage.findOne({ _id: stageId });

      if (!stage) {
        return res.status(404).json({
          message: "Stage not found",
        });
      }

      const result = await Stage.updateOne(
        { _id: stage._id },
        { deleted: true },
        { upsert: true }
      );

      return res.status(200).json(result);
    } catch (error) {
      console.log(error);
      return res.status(500).json(error);
    }
  }

  async allStages(req, res) {
    try {
      const Stages = await Stage.find({ deleted: false });
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
