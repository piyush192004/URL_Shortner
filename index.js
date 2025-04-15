import express from "express";
import urlRoute from "./routes/url.js";
import connectToMongoDB from "./connect.js";
import URL from "./models/url.js";
const app = express();
const PORT = 8001;

app.use(express.json()); // Required to parse JSON bodies

connectToMongoDB(
  "mongodb+srv://pksingh84048:piyushMongodb@cluster0.hixg0ym.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
).then(() => console.log("MongoDB Connected"));

app.use(express.json());

app.use("/url", urlRoute);

app.get("/:shortId", async (req, res) => {
  const shortId = req.params.shortId;
  console.log("Received shortId:", shortId); // Log the received shortId

  const entry = await URL.findOne({ shortId });

  if (!entry) {
    console.log("No entry found with shortId:", shortId);
    return res.status(404).send("URL not found");
  }

  console.log("Entry found:", entry); // Log the whole entry to check the values
  console.log("Redirecting to:", entry.redirectUrl);
  res.redirect(entry.redirectUrl);
});

app.listen(PORT, () => console.log(`Server started at PORT: ${PORT}`));
