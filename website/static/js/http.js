//Import express.js module and create its variable.
const express = require("express");
const app = express();
const { createProxyMiddleware } = require("http-proxy-middleware");

app.use("/q", function (request, response) {
  response.redirect("http://aerocobra.pythonanywhere.com/increase_victories");
  //response.redirect("http://127.0.0.1:5000/increase_victories")
});

app.use(
  "/",
  createProxyMiddleware({
    target: "http://aerocobra.pythonanywhere.com",
    changeOrigin: true,
  })
);

//Creates the server on default port 8000 and can be accessed through localhost:8000
const port = 4000;
// listening server
app.listen(port, function (err) {
  if (err) {
    console.log("error while starting server");
  } else {
    console.log("server has been started at port " + port);
  }
});
