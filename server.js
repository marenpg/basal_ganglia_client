const express = require("express");
const path = require("path");

const app = express();
const port = process.env.PORT || 8080;

app.use(express.static(path.join(__dirname, "build")));
app.get("/*", (req, res) => {
  res.sendFile(path.join(__dirname, "build/index.html"));

  // if (req.headers["x-forwarded-proto"] === "https") {
  //   res.redirect("http://" + req.hostname + req.url);
  // }
});

app.listen({ port }, () => {
  console.log(`Server ready at port ${port}`);
});
