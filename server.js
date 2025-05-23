import express from 'express';
import cors from 'cors';
import axios from 'axios';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import path from 'path';

// Get the directory name
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Load environment variables from .env file
dotenv.config();

const app = express();
const port = process.env.PORT || 3001;

// Enable CORS for all routes
app.use(cors());
app.use(express.json());

// Anthropic API proxy endpoint
app.post('/api/anthropic', async (req, res) => {
  try {
    const apiKey = process.env.ANTHROPIC_API_KEY;

    if (!apiKey) {
      return res
        .status(500)
        .json({ error: 'Anthropic API key not found in environment variables' });
    }

    console.log('Proxying request to Anthropic API');

    const response = await axios.post('https://api.anthropic.com/v1/messages', req.body, {
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01',
      },
    });

    console.log('Received response from Anthropic API');

    res.json(response.data);
  } catch (error) {
    console.error('Error proxying request to Anthropic API:', error.message);

    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      console.error('Response data:', error.response.data);
      console.error('Response status:', error.response.status);

      return res.status(error.response.status).json({
        error: 'Error from Anthropic API',
        details: error.response.data,
      });
    } else if (error.request) {
      // The request was made but no response was received
      console.error('No response received from Anthropic API');

      return res.status(500).json({
        error: 'No response received from Anthropic API',
      });
    } else {
      // Something happened in setting up the request that triggered an Error
      return res.status(500).json({
        error: 'Error setting up request to Anthropic API',
        message: error.message,
      });
    }
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Proxy server running at http://localhost:${port}`);
});
