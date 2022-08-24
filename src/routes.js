import { Router } from "express";
import FlowController from "./controllers/FlowController.js";
import ProcessController from "./controllers/ProcessController.js";
import StageController from "./controllers/StageController.js";
import { protect } from "./middleware/authMiddleware.js";

const routes = Router();

routes.get("/processes", protect, ProcessController.allProcesses);
routes.post("/newProcess", protect, ProcessController.createProcess);
routes.put("/updateProcess/:id", protect, ProcessController.updateProcess);
routes.delete("/deleteProcess/:registro", protect, ProcessController.deleteProcess);


routes.get("/flows", protect, FlowController.allFlows);
routes.post("/newFlow", protect, FlowController.createFlow);
routes.post("/deleteFlow", protect, FlowController.deleteFlow);
routes.put("/editFlow", protect, FlowController.editFlow);

routes.get("/stages", protect, StageController.allStages);
routes.post("/newStage", protect, StageController.createStage);
routes.post("/deleteStage", protect, StageController.deleteStage);

export default routes;
