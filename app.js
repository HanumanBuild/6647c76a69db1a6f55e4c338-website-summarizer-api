const express = require('express');
const mongoose = require('mongoose');
const app = express();
const port = 3000;

const { mongoURI } = require('./config');

app.use(express.json());

mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

app.get('/', (req, res) => {
  res.send('Welcome to the Website Summarizer API');
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});