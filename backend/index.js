const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const port = 3000;
const engine = require("./engine");
const cors = require("cors");

//const  = require('./queries')

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(cors());

app.get("/", (request, response) => {
  response.status(400);
  response.send("None shall pass");
});
app.get("/api", (request, response) => {
  response.status(400);
  response.send("None shall pass");
});

app.post("/api/prompt", engine.handlePrompt);
app.get("/api/prompt", engine.getPrompts);
app.delete("/api/prompt/:id", engine.deletePrompt);

app.listen(port, () => {
  console.log(`App running on port ${port}.`);
});
