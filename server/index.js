const express = require("express");
const appRoutes = require("./routes/appRoutes");
const bodyParser = require("body-parser");
const cors = require("cors");
const db = require("./db");
const app = express();
const PORT = 4000;

app.use(cors("*"));
app.use(bodyParser.json());

app.use("/", appRoutes);
app.listen(PORT, () => {
  console.log(`Node.js application listening on port: ${PORT}`);
});
