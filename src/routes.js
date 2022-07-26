import { Router } from "express";
import ProcessoController from "./controllers/ProcessoController.js";

const routes = Router();

routes.get("/processos", ProcessoController.todosProcessos);

routes.post("/novoProcesso", ProcessoController.createProcesso);

export default routes;
