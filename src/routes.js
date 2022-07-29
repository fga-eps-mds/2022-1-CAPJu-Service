import { Router } from "express";
import ProcessController from "./controllers/ProcessController.js";

const routes = Router();

routes.get("/processes", ProcessController.allProcesses);

routes.post("/processes", ProcessController.updateProcesses);

routes.post("/newProcess", ProcessController.createProcess);



export default routes;
