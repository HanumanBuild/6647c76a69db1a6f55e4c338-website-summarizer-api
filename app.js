const express = require('express');
const axios = require('axios');
const app = express();
const port = 3000;

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Welcome to the Website Summarizer API');
});

app.post('/fetch-website', async (req, res) => {
  const { url } = req.body;

  if (!url) {
    return res.status(400).json({ error: 'URL is required' });
  }

  try {
    const response = await axios.get(url);
    const htmlContent = response.data;
    res.json({ html: htmlContent });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch the website content' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});