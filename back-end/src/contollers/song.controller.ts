import { Router } from "express";
import { getAutoCompleteResults } from "src/services/song.service";

export const router = Router();

router.get("/", getAutoCompleteResults);
