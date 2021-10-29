const path = require("path");

const express = require("express");
const hbs = require("hbs");

const geocode = require("./utils/geocode");
const forecast = require("./utils/forecast");

// console.log(__dirname);
// console.log(path.join(__dirname, "../public"));

const app = express();
const port = process.env.PORT || 3000;

// Define paths for Express config
const publicDirectory = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

// Setup handlerbars engine and views location
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);

// Setup static directory to serve
app.use(express.static(publicDirectory));

app.get("", (req, res) => {
  res.render("index", {
    title: "Weather App",
    name: "Ted",
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About App",
    name: "Ted",
  });
});

app.get("/about/*", (req, res) => {
  res.send("about article not found");
});

app.get("/help", (req, res) => {
  res.render("help", {
    title: "Need help?",
    name: "Ted",
  });
});

app.get("/help/*", (req, res) => {
  res.render("404", {
    title: "404",
    name: "Ted",
    errorMessage: "Help Article not found",
  });
});

app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send({ error: "You must provide address" });
  }

  geocode(req.query.address, (error, { lat, lon } = {}) => {
    if (error) {
      return res.send({ error });
    }

    forecast(lat, lon, (error, forecastData) => {
      if (error) {
        return res.send({ error });
      }

      res.send({
        forecast: "this is forecast",
        location: req.query.address,
        data: forecastData,
      });
    });
  });

  // res.send({
  //   forecast: "this is forecast",
  //   location: req.query.address,
  //   data: data,
  // });
});

app.get("/products", (req, res) => {
  if (!req.query.search) {
    return res.send({
      error: "You must provide a search term",
    });
  }
  console.log(req.query.search);
  res.send({
    products: [],
  });
});

app.get("*", (req, res) => {
  res.render("404", {
    title: "Page not found",
    name: "Ted",
    errorMessage: "Page not Found",
  });
});

app.listen(port, () => {
  console.log(`Server is up on port ${port}`);
});
