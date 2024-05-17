const express = require('express');
const axios = require('axios');
const cheerio = require('cheerio');
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

    // Load the HTML content into Cheerio
    const $ = cheerio.load(htmlContent);

    // Extract the main text from the HTML
    const mainText = $('body').text().replace(/\s+/g, ' ').trim();

    res.json({ text: mainText });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch the website content' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});