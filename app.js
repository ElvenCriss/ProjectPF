// Assuming GoJS is available globally from the script tag in index.html

// Initialize diagram
const myDiagram = go.Diagram.fromDiv('myDiagram');

console.log("App.js launching");
// Define a simple diagram template
function makeNodeTemplate() {
  return $(
      go.Node,
      'Auto',
      $(go.Shape, 'RoundedRectangle', { fill: 'transparent', stroke: 'Cyan' }),
      $(go.TextBlock, {
          margin: 8,
         stroke: 'Grey',
          font: 'bold 12px sans-serif',
          background: 'transparent'
          
      },
      new go.Binding('text', 'text'))
  );
}
fetch('http://localhost:3000//getDiagramData')
  .then(response => response.json())
  .then(data => {
    myDiagram.model = go.Model.fromJson(data);
  })
  .catch(error => console.error('Error loading diagram data:', error));

/*
// Load diagram data from a JSON file
fetch('/getDiagramData')
  .then(response => response.json())
  .then(data => {
    myDiagram.model = go.Model.fromJson(data);
  })
  .catch(error => console.error('Error loading diagram data:', error));
*/

/*
// Handle diagram changes and update JSON file on server
myDiagram.addDiagramListener('SelectionMoved', () => {
  const diagramData = myDiagram.model.toJson();
  fetch('/updateDiagramData', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(diagramData)
  })
    .then(response => response.json())
    .then(data => console.log('Diagram data updated:', data))
    .catch(error => console.error('Error updating diagram data:', error));
});
*/