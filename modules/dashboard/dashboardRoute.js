import {
  clientsInfosController,
  clientsStatsController,
  deleteClientController,
} from "./dashboardController.js";
import express from "express";

const dashboardRoute = express.Router();

dashboardRoute.get("/api/dashboard/stats", clientsStatsController);
dashboardRoute.get("/api/dashboard/clients", clientsInfosController);
dashboardRoute.delete("/api/dashboard/clients/:id", deleteClientController);

export default dashboardRoute;
