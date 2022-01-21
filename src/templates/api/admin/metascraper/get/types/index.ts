import type { InferResponse } from "libs/errors/next-connect-handler";

export interface ResponseType {
  ok: true;
  data: {
    title: string;
    image: string;
    url: string;
    published_time: number;
  };
}

export type MetascraperResponse = InferResponse<ResponseType>;
