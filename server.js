import fetch from 'node-fetch';
import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import path from 'path';
import { fileURLToPath } from 'url';
// const express = require('express');
// const cors = require('cors')
// const morgan = require('morgan')

const app = express()

app.use(cors())
// app.use(morgan("coins"))

// //routes
app.get("/coins", (req, res) => {
  const url = "https://api.coinranking.com/v2/coins";
  (async () => {
    try {
      await fetch(`${url}`, {
        headers: { "x-access-token": `${process.env.COIN_RANKING_API_KEY}` }
      }).then((response) => response.json())
        .then((json) => {
        //   console.log(json)
          res.json(json)
        })
    } catch (error) {
      console.log(error)
    }
  })()
})
const __filename = fileURLToPath(import.meta.url);

const __dirname = path.dirname(__filename);

app.get("/dashboard", (req, res) => {
    res.sendFile(path.join(__dirname, '/frontend/tables.html'));
})

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Listening on Port, ${port}`)
})