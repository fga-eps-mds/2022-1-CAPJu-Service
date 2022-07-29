import app from "./app.js";
import mongoose from "mongoose";

mongoose
  .connect(process.env.MONGODB_URI || "mongodb://mongodb/capju")
  .then(() => {
    console.log("Connected to DB!");
  })
  .catch((err) => {
    console.log("Error:", err.message);
  });

app.listen(process.env.PORT || 3333, () => console.log("Server running"));

async function failGracefully() {
  console.log("Something is gonna blow up.");
  process.exit(0);
}

process.on("SIGTERM", failGracefully);
process.on("SIGINT", failGracefully);
