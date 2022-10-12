import { Express } from "express";
import { pgClient } from "../server";

export const dbRoutesSetup = (app: Express) => {
  app.post("/db/insert-photos", async (req, res) => {
    const { DbController } = await import("../controllers");
    const dbController = new DbController(pgClient);
    dbController.insertPhotos(req, res);
  });
  
  app.get("/db/photos", async (req, res) => {
    const { DbController } = await import("../controllers");
    const dbController = new DbController(pgClient);
    dbController.create(req, res);
  });
};
