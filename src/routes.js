import { Router } from "express";
import ProcessController from "./controllers/ProcessController.js";

const routes = Router();

routes.get("/processes", ProcessController.allProcesses);

routes.post("/newProcess", ProcessController.createProcess);

routes.delete("/deleteProcess/:registro", ProcessController.deleteProcess);

export default routes;
