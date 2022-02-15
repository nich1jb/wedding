const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const apiRouter = require("./api");

const app = express();
app.use(cors());
const port = 4000;

app.use(morgan("dev"));
app.use("/api", apiRouter);
app.listen(port, () =>
  console.log(`Express server listening on port ${port}!`)
);
