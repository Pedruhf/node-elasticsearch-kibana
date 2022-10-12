import { Request, Response } from "express";
import { Client } from "pg";
import axios from "axios";

import { Photo } from "../entities";

export class DbController {
  constructor(private readonly pgClient: Client) {}

  async create(req: Request, res: Response) {
    try {
      const { rows } = await this.pgClient.query("SELECT * FROM photos");
      return res.status(201).json(rows);
    } catch (err: any) {
      return res.status(500).json({ error: err.message });
    }
  }

  async insertPhotos(req: Request, res: Response) {
    try {
      const { data } = await axios.get<Photo[]>("https://jsonplaceholder.typicode.com/photos");
      for await (const item of data) {
        this.pgClient.query("INSERT INTO photos (id, album_id, titulo, url, miniatura_url, criado_em) VALUES ($1, $2, $3, $4, $5, $6)", [item.id, item.albumId, item.title, item.url, item.thumbnailUrl, new Date()]);
      }
      return res.status(200).json({ message: "Dados inseridos no banco com sucesso!" });
    } catch (err: any) {
      return res.status(500).json({ error: err.message });
    }
  }
}
