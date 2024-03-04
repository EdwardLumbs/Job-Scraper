import retry from 'async-retry';
import express from "express";
import dotenv from 'dotenv';
dotenv.config();
import {getRapplerNews,
    getMBNews,
    getInquirerNews,
    getPhilStarNews,
    getBusinessWorldNews} from '../scraperFunctions.js';

const router = express.Router();

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
router.get('/getTopNews', async (req, res, next) => {
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

router.get('/getWorldNews', async (req, res, next) => {
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

router.get('/getBusinessNews', async (req, res, next) => {
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


router.get('/getEntertainmentNews', async (req, res, next) => {
    const newsFeed = [];
    try {
        await Promise.all([
            fetchAndPush(() => getRapplerNews('https://www.rappler.com/entertainment/', '.post-card__title a'), newsFeed, 'entertainment'),
            fetchAndPush(() => getMBNews('https://mb.com.ph/category/entertainment'), newsFeed, 'entertainment'),
            fetchAndPush(() => getInquirerNews('https://entertainment.inquirer.net/'), newsFeed, 'entertainment'),
            fetchAndPush(() => getPhilStarNews('https://www.philstar.com/entertainment'), newsFeed, 'entertainment')
        ]);
        console.log(newsFeed)

        res.status(200).json(newsFeed);
    } catch (error) {
        next(error);
    }
});

router.get('/getTechnologyNews', async (req, res, next) => {
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

router.get('/getSportsNews', async (req, res, next) => {
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

router.get('/getLifestyleNews', async (req, res, next) => {
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

router.get('/getOpinionNews', async (req, res, next) => {
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

export default router