import { Request, response, Response } from "express";
import { Client } from "pg";
import { getElasticSearchClient } from "../clients";
import { ExternalPhoto } from "../entities";

export class ElasticPhotoController {
  constructor(private readonly pgClient: Client) {}

  async insertFromDb (req: Request, res: Response) {
    try {
      const { rows } = await this.pgClient.query("SELECT * FROM photos");
      for await(const row of rows) {
        getElasticSearchClient().index({
          index: "photos",
          type: "type_photos",
          body: row,
        }, (error) => {
          if (error) {
            return response.status(400).json({ error: error.message })
          }
        })
      }
      return res.status(200).json({ message: "Inserção realizada com sucesso" });
    } catch (err: any) {
      return res.status(500).json({ error: err.message });
    }
  }

  async findAll (req: Request, res: Response) {
    try {
        const data = await getElasticSearchClient().search({
          index: "photos",
          size: 5000,
          sort: "id"
        });
        return res.status(200).json(data.hits.hits);
      } catch (err: any) {
      return res.status(500).json({ error: err.message });
    }
  }

  async findById (req: Request, res: Response) {
    const { id } = req.params;

    try {
        const data = await getElasticSearchClient().search({
          index: "photos",
          q: `id:${id}`,
        });
        return res.status(200).json(data.hits.hits);
      } catch (err: any) {
      return res.status(500).json({ error: err.message });
    }
  }

  async create (req: Request, res: Response) {
    const photo: ExternalPhoto = {
      id: 999999,
      album_id: 50,
      titulo: "imagem teste setada na mao",
      url: "https://via.placeholder.com/600/b5f414",
      miniatura_url: "https://via.placeholder.com/150/b5f414",
      criado_em: new Date(),
    };

    try {
        const data = await getElasticSearchClient().index({
          index: "photos",
          type: "type_photos",
          body: photo,
        });
        return res.status(201).json(data.hits.hits);
      } catch (err: any) {
      return res.status(500).json({ error: err.message });
    }
  }

  async findByQuery (req: Request, res: Response) {
    try {
        const data = await getElasticSearchClient().search({
          index: "photos",
          body: {
            query: {
              match: {
                "titulo.keyword": "imagem teste setada na mao",
              },
            },
          },
        });
        return res.status(200).json(data.hits.hits);
      } catch (err: any) {
      return res.status(500).json({ error: err.message });
    }
  }

  async delete (req: Request, res: Response) {
    const { id } = req.params;

    try {
        await getElasticSearchClient().deleteByQuery({
          index: "photos",
          q: `id:${id}`
        });
        return res.status(200).json({ message: "Documento deletado com sucesso!" });
      } catch (err: any) {
      return res.status(500).json({ error: err.message });
    }
  }
}
