const express = require('express');
const request = require('request-promise');
const dotenv = require('dotenv');
dotenv.config();


const app = express();
const PORT = process.env.PORT || 5005;

// REAL API HOSTING - Setting up API key as query parameter, for user to input via RapidAPI hosting
// const generateScraperUrl = (apiKey) => `http://api.scraperapi.com?api_key=${apiKey}&autoparse=true`

// Local testing - Comment instead of above
const apiKey = process.env.REACT_APP_API_KEY
const generateScraperUrl = () => `http://api.scraperapi.com?api_key=${apiKey}&autoparse=true`

app.use(express.json());

app.get('/', (req, res) => {
    res.send('Welcome to Amazon Scraper API');
});

// GET Product Details
app.get('/products/:productId', async (req, res) => {
    const { productId } = req.params;
    const { api_key } = req.query;

    try {
        const response = await request(`${generateScraperUrl(api_key)}&url=https://www.amazon.com/dp/${productId}`)
        res.json(JSON.parse(response));
    } catch (error) {
        res.json(error)
    }
})

// GET Product Reviews
app.get('/products/:productId/reviews', async (req, res) => {
    const { productId } = req.params;
    const { api_key } = req.query;

    try {
        const response = await request(`${generateScraperUrl(api_key)}&url=https://www.amazon.com/product-reviews/${productId}`)
        res.json(JSON.parse(response));
    } catch (error) {
        res.json(error)
    }
})

// GET Product Offers
app.get('/products/:productId/offers', async (req, res) => {
    const { productId } = req.params;
    const { api_key } = req.query;

    try {
        const response = await request(`${generateScraperUrl(api_key)}&url=https://www.amazon.com/dp/${productId}/ref=olp-opf-redir?aod=1&th=1`)
        res.json(JSON.parse(response));
    } catch (error) {
        res.json(error)
    }
})

// GET Search Results
app.get('/search/:searchQuery', async (req, res) => {
    const { searchQuery } = req.params;
    const { api_key } = req.query;

    try {
        const response = await request(`${generateScraperUrl(api_key)}&url=https://www.amazon.com/s?k=${searchQuery}`)
        res.json(JSON.parse(response));
    } catch (error) {
        res.json(error)
    }
})

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));