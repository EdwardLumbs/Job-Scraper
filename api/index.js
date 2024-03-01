import retry from 'async-retry';
import express from 'express';
import pool from './database/db.js';
import { errorHandler } from './error.js';
import path from 'path';
import cors from 'cors';
import {getRapplerNews,
        getMBNews,
        getInquirerNews,
        getPhilStarNews,
        getBusinessWorldNews} from './scraperFunctions.js'

const __dirname = path.resolve();

const app = express();

app.use(express.json());
app.use(cors());


app.post('/addArticles', async (req, res, next) => {
    const { title, image, link, category, source } = req.body;

    try {
        await pool.query(`INSERT INTO news (title, image, link, category, source)
            VALUES ($1, $2, $3, $4, $5)
            ON CONFLICT (title, image, link) DO NOTHING`,
            [title, image, link, category, source]);

        res.status(201).json('Inserted Successfully');
        return
    } catch (error) {
        next(error);
    }
});

app.get('/getArticles/:category', async (req, res, next) => {
    console.log('clicked')
    const { category } = req.params;
    try {
        const data = await pool.query(`SELECT *
            FROM news
            WHERE category = $1
            ORDER BY created_at DESC
            LIMIT 5`,
            [category])

        if (data.rows.length === 0) {
            return next(errorHandler(404, 'No News found'));
        };

        res.status(200).json(data.rows);
    } catch (error) {
        next(error)
    };

});


const fetchAndPush = async (fetchFunction, newsFeed, category) => {
    try {
        const news = await retry(fetchFunction, {
            retries: 3,
            onRetry: (err) => {
                console.log('Retrying...', err);
            }
        });
        const newsWithCategory = news.map(item => ({ ...item, category }));
        newsFeed.push(...newsWithCategory);
        console.log(newsFeed)
    } catch (error) {
        console.error('Error fetching news:', error);
    };
};

// Route handlers
app.get('/getTopNews', async (req, res, next) => {
    console.log('clicked')

    const newsFeed = [];
    try {
        await Promise.all([
            fetchAndPush(() => getRapplerNews('https://www.rappler.com/', '.post-card__secondary-title a'), newsFeed, 'top'),
            fetchAndPush(() => getMBNews('https://mb.com.ph/category/news'), newsFeed, 'top'),
            fetchAndPush(() => getInquirerNews('https://newsinfo.inquirer.net/'), newsFeed, 'top'),
            fetchAndPush(() => getPhilStarNews('https://www.philstar.com/headlines'), newsFeed, 'top'),
            fetchAndPush(() => getBusinessWorldNews('https://www.bworldonline.com/top-stories/'), newsFeed, 'top')
        ]);

        res.status(200).json(newsFeed);
    } catch (error) {
        next(error);
    };
});

app.get('/getWorldNews', async (req, res, next) => {
    const newsFeed = [];
    try {
        await Promise.all([
            fetchAndPush(() => getRapplerNews('https://www.rappler.com/world/', '.post-card__title a'), newsFeed, 'world'),
            fetchAndPush(() => getInquirerNews('https://globalnation.inquirer.net/'), newsFeed, 'world'),
            fetchAndPush(() => getPhilStarNews('https://www.philstar.com/world'), newsFeed, 'world'),
            fetchAndPush(() => getBusinessWorldNews('https://www.bworldonline.com/world/'), newsFeed, 'world')
        ]);

        res.status(200).json(newsFeed);
    } catch (error) {
        next(error);
    }
});

app.get('/getBusinessNews', async (req, res, next) => {
    const newsFeed = [];
    try {
        await Promise.all([
            fetchAndPush(() => getRapplerNews('https://www.rappler.com/business/', '.post-card__title a'), newsFeed, 'business'),
            fetchAndPush(() => getMBNews('https://mb.com.ph/category/business'), newsFeed, 'business'),
            fetchAndPush(() => getInquirerNews('https://business.inquirer.net/'), newsFeed, 'business'),
            fetchAndPush(() => getPhilStarNews('https://www.philstar.com/business'), newsFeed, 'business'),
            fetchAndPush(() => getBusinessWorldNews('https://www.bworldonline.com/corporate/'), newsFeed, 'business')
        ]);

        res.status(200).json(newsFeed);
    } catch (error) {
        next(error);
    }
});


app.get('/getEntertainmentNews', async (req, res, next) => {
    const newsFeed = [];
    try {
        await Promise.all([
            fetchAndPush(() => getRapplerNews('https://www.rappler.com/entertainment/', '.post-card__title a'), newsFeed, 'entertainment'),
            fetchAndPush(() => getMBNews('https://mb.com.ph/category/entertainment'), newsFeed, 'entertainment'),
            fetchAndPush(() => getInquirerNews('https://entertainment.inquirer.net/'), newsFeed, 'entertainment'),
            fetchAndPush(() => getPhilStarNews('https://www.philstar.com/entertainment'), newsFeed, 'entertainment')
        ]);

        res.status(200).json(newsFeed);
    } catch (error) {
        next(error);
    }
});

app.get('/getTechnologyNews', async (req, res, next) => {
    const newsFeed = [];
    try {
        await Promise.all([
            fetchAndPush(() => getRapplerNews('https://www.rappler.com/technology/', '.post-card__title a'), newsFeed, 'technology'),
            fetchAndPush(() => getMBNews('https://mb.com.ph/category/technology'), newsFeed, 'technology'),
            fetchAndPush(() => getInquirerNews('https://technology.inquirer.net/'), newsFeed, 'technology'),
            fetchAndPush(() => getBusinessWorldNews('https://www.bworldonline.com/technology/'), newsFeed, 'technology')
        ]);

        res.status(200).json(newsFeed);
    } catch (error) {
        next(error);
    }
});

app.get('/getSportsNews', async (req, res, next) => {
    const newsFeed = [];
    try {
        await Promise.all([
            fetchAndPush(() => getRapplerNews('https://www.rappler.com/sports/', '.post-card__title a'), newsFeed, 'sports'),
            fetchAndPush(() => getMBNews('https://mb.com.ph/category/sports'), newsFeed, 'sports'),
            fetchAndPush(() => getInquirerNews('https://sports.inquirer.net/'), newsFeed, 'sports'),
            fetchAndPush(() => getPhilStarNews('https://www.philstar.com/sports'), newsFeed, 'sports'),
            fetchAndPush(() => getBusinessWorldNews('https://www.bworldonline.com/sports/'), newsFeed, 'sports')
        ]);

        res.status(200).json(newsFeed);
    } catch (error) {
        next(error);
    }
});

app.get('/getLifestyleNews', async (req, res, next) => {
    const newsFeed = [];
    try {
        await Promise.all([
            fetchAndPush(() => getRapplerNews('https://www.rappler.com/life-and-style/', '.post-card__title a'), newsFeed, 'lifestyle'),
            fetchAndPush(() => getMBNews('https://mb.com.ph/category/lifestyle'), newsFeed, 'lifestyle'),
            fetchAndPush(() => getBusinessWorldNews('https://www.bworldonline.com/health/'), newsFeed, 'lifestyle')
        ]);

        res.status(200).json(newsFeed);
    } catch (error) {
        next(error);
    }
});

app.get('/getOpinionNews', async (req, res, next) => {
    const newsFeed = [];
    try {
        await Promise.all([
            fetchAndPush(() => getMBNews('https://mb.com.ph/category/opinion'), newsFeed, 'opinion'),
            fetchAndPush(() => getPhilStarNews('https://www.philstar.com/opinion'), newsFeed, 'opinion'),
            fetchAndPush(() => getBusinessWorldNews('https://www.bworldonline.com/opinion/'), newsFeed, 'opinion')
        ]);

        res.status(200).json(newsFeed);
    } catch (error) {
        next(error);
    }
});

app.use(express.static(path.join(__dirname, '/client/dist')));

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'client', 'dist', 'index.html'))
});

app.listen(3000, () => {
    console.log(`Server running on port 3000`);
});

app.use((err, req, res,next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Internal Server Error'
    return res.status(statusCode).json({
        success: false,
        message,
        statusCode
    });
});