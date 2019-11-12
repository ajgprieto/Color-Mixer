const express = require('express');
const seedrandom = require('seedrandom');

const app = express();
const port = 3000;

function generateColorsWithSeed(seed) {
  /** https://github.com/davidbau/seedrandom */
  seedrandom(seed, { global: true });

  const r1 = getRandomDecimal();
  const g1 = getRandomDecimal();
  const b1 = getRandomDecimal();

  const r2 = getRandomDecimal();
  const g2 = getRandomDecimal();
  const b2 = getRandomDecimal();

  const color1 = getHexValue(r1, g1, b1);
  const color2 = getHexValue(r2, g2, b2);
 
  return {
    color1: color1,
    color2: color2,
  }
}

function getRandomDecimal() {
  const min = 16; // excluding cases with leading zeros; e.g.: 15 => 0F
  const max = 256
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getHexValue(r, g, b) {
  return dec2Hex(r) + dec2Hex(g) + dec2Hex(b);
}

function dec2Hex(decimal) {
  return decimal.toString(16);
}

app.get('/', (req, res) => {
  res.send('Welcome to the color mixer API');
});

app.get('/colors/:email', (req, res) => {
  const email = req.params.email;
  const colors = generateColorsWithSeed(email);
  res.json(colors);
});

app.listen(port, () => {
  console.log(`Listenting on PORT: ${port}`);
});
