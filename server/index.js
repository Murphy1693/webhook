require("dotenv").config();
const express = require("express");
const cors = require("cors");
// const logger = require("./middleware.js");
const app = express();
app.use(cors());
app.use(express.json());

const socket = new WebSocket(
  `wss://ws.finnhub.io?token=${process.env.API_KEY}`
);

socket.addEventListener("open", (event) => {
  socket.send(JSON.stringify({ type: "subscribe", symbol: "ASTS" }));
  socket.send(JSON.stringify({ type: "subscribe", symbol: "BINANCE:BTCUSDT" }));
  socket.send(JSON.stringify({ type: "subscribe", symbol: "IC MARKETS:1" }));
});

socket.addEventListener("message", function (event) {
  console.log("Message from server ", event.data);
});

var unsubscribe = function (symbol) {
  socket.send(JSON.stringify({ type: "unsubscribe", symbol: symbol }));
};

setTimeout(() => {
  unsubscribe("ASTS");
  unsubscribe("BINANCE:BTCUSDT");
  unsubscribe("IC MARKETS:1");
}, 20000);

// app.use(logger);

app.use(express.static("./public"));

app.listen(process.env.PORT, () => {
  console.log(`listening on port: ${process.env.PORT}`);
});
