export type Photo = {
  id: number;
  albumId: number;
  title: string;
  url: string;
  thumbnailUrl: string;
  createdAt: string | Date;
};

export type ExternalPhoto = {
  id: number;
  album_id: number;
  titulo: string;
  url: string;
  miniatura_url: string;
  criado_em: string | Date;
};
