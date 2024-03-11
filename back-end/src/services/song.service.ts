import axios from "axios";
import { Request, Response } from "express";
import { DeezerSearchResponseSchema } from "src/models/deezer";

export const getAutoCompleteResults = async (req: Request, res: Response) => {
  const result = await (
    await axios.get(
      `https://api.deezer.com/search?q=${req.query.query}&limit=${req.query.limit}`
    )
  ).data;

  const resultParsed = DeezerSearchResponseSchema.safeParse(result);

  if (!resultParsed.success) res.status(404).send([]);

  const autoCompleteResults = DeezerSearchResponseSchema.parse(result);

  const autoCompleteOptions = autoCompleteResults.data?.map((song) => ({
    label: `${song.title} - ${song.artist.name}`,
    value: song,
  }));

  res.status(200).send(autoCompleteOptions);
};
