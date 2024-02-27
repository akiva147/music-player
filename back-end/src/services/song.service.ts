import axios from "axios";
import { Request, Response } from "express";

export const getAutoCompleteResults = async (req: Request, res: Response) => {
  console.log("🚀 ~ getAutoCompleteResults ~ req.params:", req.query);
  const autoCompleteResults = await (
    await axios.get(
      `https://api.deezer.com/search?q=${req.query.query}&limit=${req.query.limit}`
    )
  ).data;
  console.log(
    "🚀 ~ getAutoCompleteResults ~ autoCompleteResults:",
    autoCompleteResults
  );
  res.status(200).send(autoCompleteResults);
};
