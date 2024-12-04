const express = require('express');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 4010;

app.use((_req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  next();
});

app.get('/api/pets', (_req, res) => {
  fs.readFile('./data.json', 'utf-8', (err, data) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: 'Error loading data' });
    }
    res.json(JSON.parse(data));
  });
});

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));