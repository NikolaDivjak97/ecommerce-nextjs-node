const express = require("express");
const path = require("path");
const cors = require("cors");
const cookieParser = require("cookie-parser");
require("dotenv").config();
const routes = require("./routes/routes");

const app = express();

app.use("/images", express.static(path.join(__dirname, "images")));
app.use(cookieParser());

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

app.use((req, res, next) => {
  if (req.headers["content-type"] && req.headers["content-type"].startsWith("application/json")) {
    express.json()(req, res, next);
  } else {
    next();
  }
});

app.use(routes);

app.listen(5000, () => console.log("Server running on port 5000"));
