const express = require('express');
const fs = require('fs');

const app = express();
app.use(express.json());

const jsonFilePath = 'diagramData.json';

// GET request to retrieve the JSON data
app.get('/get-diagram', (req, res) => {
  fs.readFile(jsonFilePath, 'utf8', (err, data) => {
    if (err) {
      res.status(500).send('Error reading JSON file');
      return;
    }
    res.json(JSON.parse(data));
  });
});

// POST request to update the JSON file
app.post('/update-diagram', (req, res) => {
  const jsonData = req.body;
  fs.writeFile(jsonFilePath, JSON.stringify(jsonData, null, 2), 'utf8', (err) => {
    if (err) {
      res.status(500).send('Error updating JSON file');
      return;
    }
    res.send('Diagram updated successfully');
  });
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});