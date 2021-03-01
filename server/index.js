const express = require('express');
const path = require('path');
const cors = require('cors');
const app = express();

const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(cors());


if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.resolve(__dirname,  "../client/build")));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname,  "../client/build"));
  });
}

app.listen(PORT, ()=> {
  console.log(`listening on ${PORT}`)
});