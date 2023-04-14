const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');

const app = express();

app.use(bodyParser.json());
app.use(cors());

// Serve the static files from the Angular app
app.use(express.static(path.join(__dirname, 'dist/packages/english-practice')));

// Redirect all requests to Angular app
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist/packages/english-practice/index.html'));
});

const port = process.env.PORT || 4200;
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
