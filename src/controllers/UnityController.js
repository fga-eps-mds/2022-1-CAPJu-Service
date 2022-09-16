import Unity from "../schemas/Unity.js";
import { UnityValidator } from "../validators/Unity.js";

class UnityController {
  async createUnity(req, res) {
    try {
      const { name } = await UnityValidator.validateAsync(req.body);
      const exist = await Unity.find({ name, deleted: false });
      console.log(exist);
      if (Object.keys(exist).length === 0) {
        const unity = await Unity.create({
          name,
          deleted: false,
        });
        return res.status(200).json(unity);
      }
      return res.status(400).json({
        message: "Unity exist",
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json(error);
    }
  }

  async deleteUnity(req, res) {
    try {
      const unityId = req.body.unityId;
      const unity = await Unity.findOne({ _id: unityId });

      if (!unity) {
        return res.status(404).json({
          message: "Unity not found",
        });
      }

      const result = await Unity.updateOne(
        { _id: unity._id },
        { deleted: true },
        { upsert: true }
      );

      return res.status(200).json(result);
    } catch (error) {
      console.log(error);
      return res.status(500).json(error);
    }
  }

  async allUnitys(req, res) {
    try {
      const Unitys = await Unity.find({ deleted: false });
      return res.status(200).json({
        Unitys,
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json(error);
    }
  }
}

export default new UnityController();
