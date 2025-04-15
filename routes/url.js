import { Router } from "express";
import {
  handleGenerateNewShortUrl,
  handleRedirectUrl,
} from "../controllers/url.js";

const router = Router();

router.post("/", handleGenerateNewShortUrl);

router.get("/:shortId", handleRedirectUrl); // This should come last

export default router;
