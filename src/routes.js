import { Router } from "express";
import FlowController from "./controllers/FlowController.js";
import ProcessController from "./controllers/ProcessController.js";
import StageController from "./controllers/StageController.js";

const routes = Router();

routes.get("/processes", ProcessController.allProcesses);
routes.get("/processes/:flowId", ProcessController.processesInFlow);
routes.get("/getOneProcess/:id", ProcessController.getOneProcess);
routes.post("/newProcess", ProcessController.createProcess);
routes.put("/updateProcess/:id", ProcessController.updateProcess);
routes.delete("/deleteProcess/:registro", ProcessController.deleteProcess);
routes.put("/processNextStage/", ProcessController.nextStage);

routes.get("/flows", FlowController.allFlows);
routes.post("/newFlow", FlowController.createFlow);
routes.post("/deleteFlow", FlowController.deleteFlow);
routes.put("/editFlow", FlowController.editFlow);

routes.get("/stages", StageController.allStages);
routes.post("/newStage", StageController.createStage);
routes.post("/deleteStage", StageController.deleteStage);

export default routes;
