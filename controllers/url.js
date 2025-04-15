// controllers/url.js
import { nanoid } from "nanoid";
import URL from "../models/url.js";

async function handleGenerateNewShortUrl(req, res) {
  const body = req.body;

  if (!body.url) {
    return res.status(400).json({ error: "url is required" });
  }

  const shortId = nanoid(8);

  await URL.create({
    shortId,
    redirectUrl: body.url,
    visitHistory: [],
  });

  return res.json({ id: shortId });
}

async function handleRedirectUrl(req, res) {
  const shortId = req.params.shortId;
  console.log("Received shortId:", shortId); // Check if this prints the correct shortId

  // Find the entry based on shortId

  const entry = await URL.findOneAndUpdate(
    { shortId },
    { $push: { visitHistory: { timestamp: new Date() } } },
    { new: true } // Return the updated document
  );

  if (!entry) {
    console.log("No entry found with shortId:", shortId);
    return res.status(404).send("URL not found");
  }

  console.log("Updated visit history:", entry.visitHistory);
  console.log("Redirecting to:", entry.redirectUrl);

  res.redirect(entry.redirectUrl);
}

export { handleGenerateNewShortUrl, handleRedirectUrl };
