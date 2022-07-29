import app from "./app.js";

app.listen(process.env.PORT || 3333, () => console.log("Server running"));

async function failGracefully() {
  console.log("Something is gonna blow up.");
  process.exit(0);
}

process.on("SIGTERM", failGracefully);
process.on("SIGINT", failGracefully);
