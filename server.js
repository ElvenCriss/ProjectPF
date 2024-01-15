const express = require('express');
const fs = require('fs').promises;
const path = require('path');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

app.use(express.static('public'));
app.use(bodyParser.json());

const diagramFilePath = path.join(__dirname, 'diagramData.json');

// Handle GET request to retrieve diagram data
app.get('/getDiagramData', async (req, res) => {
  console.log("GetEvent Triggered")
  try {
    const diagramData = await fs.readFile(diagramFilePath, 'utf8');
    res.json(JSON.parse(diagramData));
  } catch (error) {
    console.error('Error reading diagram data:', error);
    res.status(500).json({ error: 'Error reading diagram data' });
  }
});

// Handle POST request to update diagram data
app.post('/updateDiagramData', async (req, res) => {
  console.log("update Diagram Event Triggered")
  const { body } = req;
  try {
    await fs.writeFile(diagramFilePath, JSON.stringify(body), 'utf8');
    res.json({ success: true });
  } catch (error) {
    console.error('Error updating diagram data:', error);
    res.status(500).json({ error: 'Error updating diagram data' });
  }
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
