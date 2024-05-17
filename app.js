const express = require('express');
const axios = require('axios');
const cheerio = require('cheerio');
const { Configuration, OpenAIApi } = require('openai');
const app = express();
const port = 3000;

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

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

    // Send the extracted text to the OpenAI API to generate a summary
    const completion = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: `Summarize the following text:\n\n${mainText}`,
      max_tokens: 150,
    });

    const summary = completion.data.choices[0].text.trim();

    // Return the summary in the response
    res.json({ summary });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch the website content or generate summary' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});