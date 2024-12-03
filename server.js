const express = require('express');
const fs = require('fs');

const app = express();
const PORT = 4010;

// Middleware para habilitar CORS
app.use((_req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  next();
});

// Endpoint para devolver datos de mascotas desde el archivo data.json
app.get('/api/pets', (_req, res) => {
  fs.readFile('./data.json', 'utf-8', (err, data) => {
    if (err) return res.status(500).json({ error: "Error loading data" });
    res.json(JSON.parse(data)); // Devolver el JSON parseado
  });
});

// Iniciar el servidor
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));