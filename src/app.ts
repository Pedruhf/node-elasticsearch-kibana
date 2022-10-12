import express from "express";
import { pgClient } from "./server";

const app = express();

app.post("/db/insert-photos", async (req, res) => {
  const { DbController } = await import("./controllers");
  const dbController = new DbController(pgClient);
  dbController.insertPhotos(req, res);
});

app.get("/db/photos", async (req, res) => {
  const { DbController } = await import("./controllers");
  const dbController = new DbController(pgClient);
  dbController.create(req, res);
});

app.post("/elastic/insert-photos", async (req, res) => {
  const { ElasticPhotoController } = await import("./controllers");
  const elasticPhotoController = new ElasticPhotoController(pgClient);
  elasticPhotoController.insertFromDb(req, res);
});

app.get("/elastic/photos", async (req, res) => {
  const { ElasticPhotoController } = await import("./controllers");
  const elasticPhotoController = new ElasticPhotoController(pgClient);
  elasticPhotoController.findAll(req, res);
});

app.get("/elastic/photos/find-by-query", async (req, res) => {
  const { ElasticPhotoController } = await import("./controllers");
  const elasticPhotoController = new ElasticPhotoController(pgClient);
  elasticPhotoController.findByQuery(req, res);
});

app.get("/elastic/photos/:id", async (req, res) => {
  const { ElasticPhotoController } = await import("./controllers");
  const elasticPhotoController = new ElasticPhotoController(pgClient);
  elasticPhotoController.findById(req, res);
});

app.post("/elastic/photos", async (req, res) => {
  const { ElasticPhotoController } = await import("./controllers");
  const elasticPhotoController = new ElasticPhotoController(pgClient);
  elasticPhotoController.create(req, res);
});

app.delete("/elastic/photos/:id", async (req, res) => {
  const { ElasticPhotoController } = await import("./controllers");
  const elasticPhotoController = new ElasticPhotoController(pgClient);
  elasticPhotoController.delete(req, res);
});

export { app, pgClient};
