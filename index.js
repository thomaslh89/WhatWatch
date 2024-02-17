const express = require("express");
require("dotenv").config();
const cors = require("cors");
const axios = require("axios");
const app = express();

app.use(cors());

app.get("/", async (req, res) => {
  try {
    const response = await axios.get(
      `https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=fr-FRA&page=${req.query.page}&sort_by=popularity.desc&with_genres=${req.query.genre_ids}&api_key=${process.env.API_KEY}`
    );
    console.log(response.data);
    console.log(response.data.id);
    console.log(req.query.data);
    console.log(req.query.id);
    const limitedResults = response.data.results.slice(0, 4);
    response.data.results = limitedResults;
    return res.status(200).json(response.data);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

app.get("/movies/:id", async (req, res) => {
  try {
    const response = await axios.get(
      `https://api.themoviedb.org/3/movie/${req.params.id}?api_key=${process.env.API_KEY}&language=fr-FRA`
    );

    console.log(response.data);
    console.log(req.query.id);
    return res.status(200).json(response.data);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

app.get("/movie/:id/watchon", async (req, res) => {
  try {
    const response = await axios.get(
      `https://api.themoviedb.org/3/movie/${req.params.id}/watch/providers?api_key=${process.env.API_KEY}&language=fr-FRA`
    );
    console.log("provider >>>>", req.query.id);
    return res.status(200).json(response.data);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});
app.get("/movie/:id/trailer", async (req, res) => {
  try {
    const response = await axios.get(
      `https://api.themoviedb.org/3/movie/${req.params.id}/videos?api_key=${process.env.API_KEY}&language=fr-FRA`
    );
    console.log("provider >>>>", req.query.id);
    return res.status(200).json(response.data);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});
app.get("/movies/:id/watch", async (req, res) => {
  try {
    const response = await axios.get(
      `https://api.themoviedb.org/3/movie/${req.params.id}?api_key=${process.env.API_KEY}&language=en-USA`
    );

    console.log(response.data);
    console.log(req.query.id);
    return res.status(200).json(response.data);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});
app.get("/movies/:id/similar", async (req, res) => {
  try {
    const response = await axios.get(
      `https://api.themoviedb.org/3/movie/${req.params.id}/similar?api_key=${process.env.API_KEY}&language=fr-FRA`
    );

    console.log(response.data);
    console.log(req.query.id);
    return res.status(200).json(response.data);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});
app.listen(process.env.PORT, () => {
  console.log("Server Starded");
});
