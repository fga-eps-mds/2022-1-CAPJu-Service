import { Router } from "express";
import FlowController from "./controllers/FlowController.js";
import ProcessController from "./controllers/ProcessController.js";
import StageController from "./controllers/StageController.js";
import { protect, authRole } from "./middleware/authMiddleware.js";
import { ROLE } from "./schemas/role.js";

const routes = Router();

//Rotas de processos
routes.get(
  "/processes",
  protect,
  authRole([ROLE.JUIZ, ROLE.DIRETOR, ROLE.SERVIDOR, ROLE.ESTAGIARIO]),
  ProcessController.allProcesses
);
routes.get(
  "/processes/:flowId",
  protect,
  authRole([ROLE.JUIZ, ROLE.DIRETOR, ROLE.SERVIDOR, ROLE.ESTAGIARIO]),
  ProcessController.processesInFlow
);
routes.get(
  "/getOneProcess/:id",
  protect,
  authRole([ROLE.DIRETOR, ROLE.SERVIDOR, ROLE.ESTAGIARIO]),
  ProcessController.getOneProcess
);
routes.post(
  "/newProcess",
  protect,
  authRole([ROLE.DIRETOR, ROLE.SERVIDOR, ROLE.ESTAGIARIO]),
  ProcessController.createProcess
);
routes.put(
  "/updateProcess/:id",
  protect,
  authRole([ROLE.DIRETOR, ROLE.SERVIDOR]),
  ProcessController.updateProcess
);
routes.delete(
  "/deleteProcess/:registro",
  protect,
  authRole([ROLE.DIRETOR, ROLE.SERVIDOR]),
  ProcessController.deleteProcess
);
routes.put("/processNextStage/", protect, ProcessController.nextStage);

//Rotas de Fluxos
routes.get(
  "/flows",
  authRole([ROLE.JUIZ, ROLE.DIRETOR, ROLE.SERVIDOR, ROLE.ESTAGIARIO]),
  protect,
  FlowController.allFlows
);
routes.get(
  "/flows/:id",
  authRole([ROLE.JUIZ, ROLE.DIRETOR, ROLE.SERVIDOR]),
  protect,
  FlowController.getFlow
);
routes.post(
  "/newFlow",
  protect,
  authRole([ROLE.DIRETOR, ROLE.SERVIDOR]),
  FlowController.createFlow
);
routes.post(
  "/deleteFlow",
  protect,
  authRole([ROLE.DIRETOR, ROLE.SERVIDOR]),
  FlowController.deleteFlow
);
routes.put(
  "/editFlow",
  protect,
  authRole([ROLE.DIRETOR, ROLE.SERVIDOR]),
  FlowController.editFlow
);

//Rotas de Etapas
routes.get(
  "/stages",
  protect,
  authRole([ROLE.JUIZ, ROLE.DIRETOR, ROLE.SERVIDOR, ROLE.ESTAGIARIO]),
  StageController.allStages
);
routes.post(
  "/newStage",
  protect,
  authRole([ROLE.DIRETOR, ROLE.SERVIDOR]),
  StageController.createStage
);
routes.post(
  "/deleteStage",
  protect,
  authRole([ROLE.DIRETOR, ROLE.SERVIDOR]),
  StageController.deleteStage
);

export default routes;
