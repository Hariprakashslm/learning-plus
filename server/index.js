const express = require("express");
const appRoutes = require("./routes/appRoutes");

const app = express();
const PORT = 3000;
app.use("/", appRoutes);
app.listen(PORT, () => {
  console.log(`Node.js application listening on port: ${PORT}`);
});
