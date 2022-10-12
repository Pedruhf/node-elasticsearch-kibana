import express from "express";
import { pgClient } from "./server";

import { dbRoutesSetup, elasticPhotoRoutesSetup } from "./routes";

const app = express();
dbRoutesSetup(app);
elasticPhotoRoutesSetup(app);

export { app, pgClient};
