import retry from 'async-retry';
import express from 'express';

import {takeScreenshot,
        getRapplerNews,
        getMBNews,
        getInquirerNews,
        getPhilStarNews,
        getBusinessWorldNews} from './scraperFunctions.js'

const app = express();

app.use(express.json());

app.get('/getTopNews', async (req, res, next) => {
    const newsFeed = [];
    try {
        const fetchAndPush = async (fetchFunction) => {
            try {
                const news = await retry(fetchFunction, {
                    retries: 3,
                    onRetry: (err) => {
                        console.log('Retrying...', err);
                    }
                });
                newsFeed.push(...news);
            } catch (error) {
                console.error('Error fetching news:', error);
            }
        };

        await fetchAndPush(() => getRapplerNews('https://www.rappler.com/', '.post-card__secondary-title a'));
        await fetchAndPush(() => getMBNews('https://mb.com.ph/category/news'));
        await fetchAndPush(() => getInquirerNews('https://newsinfo.inquirer.net/'));
        await fetchAndPush(() => getPhilStarNews('https://www.philstar.com/headlines'));
        await fetchAndPush(() => getBusinessWorldNews('https://www.bworldonline.com/top-stories/'));
        
        console.log(newsFeed)
        console.log(newsFeed.length)

        res.status(200).json(newsFeed);
    } catch (error) {
        next(error);
    }
});


app.get('/getBusinessNews', async (req, res, next) => {
    const newsFeed = [];
    try {
        const fetchAndPush = async (fetchFunction) => {
            try {
                const news = await retry(fetchFunction, {
                    retries: 3,
                    onRetry: (err) => {
                        console.log('Retrying...', err);
                    }
                });
                newsFeed.push(...news);
            } catch (error) {
                console.error('Error fetching news:', error);
            }
        };

        await fetchAndPush(() => getRapplerNews('https://www.rappler.com/business/', '.post-card__title a'));
        await fetchAndPush(() => getMBNews('https://mb.com.ph/category/business'));
        await fetchAndPush(() => getInquirerNews('https://business.inquirer.net/'));
        await fetchAndPush(() => getPhilStarNews('https://www.philstar.com/business'));
        await fetchAndPush(() => getBusinessWorldNews('https://www.bworldonline.com/corporate/'));

        console.log(newsFeed)
        console.log(newsFeed.length)

        res.status(200).json(newsFeed);
    } catch (error) {
        next(error);
    }
});


app.get('/getEntertainmentNews', async (req, res, next) => {
    const newsFeed = [];
    try {
        const fetchAndPush = async (fetchFunction) => {
            try {
                const news = await retry(fetchFunction, {
                    retries: 3,
                    onRetry: (err) => {
                        console.log('Retrying...', err);
                    }
                });
                newsFeed.push(...news);
            } catch (error) {
                console.error('Error fetching news:', error);
            }
        };

        await fetchAndPush(() => getRapplerNews('https://www.rappler.com/entertainment/', '.post-card__title a'));
        await fetchAndPush(() => getMBNews('https://mb.com.ph/category/entertainment'));
        await fetchAndPush(() => getInquirerNews('https://entertainment.inquirer.net/'));
        await fetchAndPush(() => getPhilStarNews('https://www.philstar.com/entertainment'));

        console.log(newsFeed)
        console.log(newsFeed.length)

        res.status(200).json(newsFeed);
    } catch (error) {
        next(error);
    }
});


app.get('/getTechnologyNews', async (req, res, next) => {
    const newsFeed = [];
    try {
        const fetchAndPush = async (fetchFunction) => {
            try {
                const news = await retry(fetchFunction, {
                    retries: 3,
                    onRetry: (err) => {
                        console.log('Retrying...', err);
                    }
                });
                newsFeed.push(...news);
            } catch (error) {
                console.error('Error fetching news:', error);
            }
        };

        await fetchAndPush(() => getRapplerNews('https://www.rappler.com/technology/', '.post-card__title a'));
        await fetchAndPush(() => getMBNews('https://mb.com.ph/category/technology'));
        await fetchAndPush(() => getInquirerNews('https://technology.inquirer.net/'));
        await fetchAndPush(() => getBusinessWorldNews('https://www.bworldonline.com/technology/'));

        console.log(newsFeed)
        console.log(newsFeed.length)

        res.status(200).json(newsFeed);
    } catch (error) {
        next(error);
    }
});


app.get('/getSportsNews', async (req, res, next) => {
    const newsFeed = [];
    try {
        const fetchAndPush = async (fetchFunction) => {
            try {
                const news = await retry(fetchFunction, {
                    retries: 3,
                    onRetry: (err) => {
                        console.log('Retrying...', err);
                    }
                });
                newsFeed.push(...news);
            } catch (error) {
                console.error('Error fetching news:', error);
            }
        };

        await fetchAndPush(() => getRapplerNews('https://www.rappler.com/sports/', '.post-card__title a'));
        await fetchAndPush(() => getMBNews('https://mb.com.ph/category/sports'));
        await fetchAndPush(() => getInquirerNews('https://sports.inquirer.net/'));
        await fetchAndPush(() => getPhilStarNews('https://www.philstar.com/sports'));
        await fetchAndPush(() => getBusinessWorldNews('https://www.bworldonline.com/sports/'));

        console.log(newsFeed)
        console.log(newsFeed.length)

        res.status(200).json(newsFeed);
    } catch (error) {
        await takeScreenshot(page, 'Error');
        next(error);
    }
});


app.get('/getLifestyleNews', async (req, res, next) => {
    const newsFeed = [];
    try {
        const fetchAndPush = async (fetchFunction) => {
            try {
                const news = await retry(fetchFunction, {
                    retries: 3,
                    onRetry: (err) => {
                        console.log('Retrying...', err);
                    }
                });
                newsFeed.push(...news);
            } catch (error) {
                console.error('Error fetching news:', error);
            }
        };

        await fetchAndPush(() => getRapplerNews('https://www.rappler.com/life-and-style/', '.post-card__title a'));
        await fetchAndPush(() => getMBNews('https://mb.com.ph/category/lifestyle'));
        await fetchAndPush(() => getBusinessWorldNews('https://www.bworldonline.com/health/'));

        console.log(newsFeed)
        console.log(newsFeed.length)

        res.status(200).json(newsFeed);
    } catch (error) {
        await takeScreenshot(page, 'Error');
        next(error);
    }
});


app.get('/getWorldNews', async (req, res, next) => {
    const newsFeed = [];
    try {
        const fetchAndPush = async (fetchFunction) => {
            try {
                const news = await retry(fetchFunction, {
                    retries: 3,
                    onRetry: (err) => {
                        console.log('Retrying...', err);
                    }
                });
                newsFeed.push(...news);
            } catch (error) {
                console.error('Error fetching news:', error);
            }
        };

        await fetchAndPush(() => getRapplerNews('https://www.rappler.com/world/', '.post-card__title a'));
        await fetchAndPush(() => getInquirerNews('https://globalnation.inquirer.net/'));
        await fetchAndPush(() => getPhilStarNews('https://www.philstar.com/world'));
        await fetchAndPush(() => getBusinessWorldNews('https://www.bworldonline.com/world/'));

        console.log(newsFeed)
        console.log(newsFeed.length)
        
        res.status(200).json(newsFeed);
    } catch (error) {
        await takeScreenshot(page, 'Error');
        next(error);
    }
});


app.get('/getOpinionNews', async (req, res, next) => {
    const newsFeed = [];
    try {
        const fetchAndPush = async (fetchFunction) => {
            try {
                const news = await retry(fetchFunction, {
                    retries: 3,
                    onRetry: (err) => {
                        console.log('Retrying...', err);
                    }
                });
                newsFeed.push(...news);
            } catch (error) {
                console.error('Error fetching news:', error);
            }
        };

        await fetchAndPush(() => getMBNews('https://mb.com.ph/category/opinion'));
        await fetchAndPush(() => getPhilStarNews('https://www.philstar.com/opinion'));
        await fetchAndPush(() => getBusinessWorldNews('https://www.bworldonline.com/opinion/'));

        console.log(newsFeed)
        console.log(newsFeed.length)
        
        res.status(200).json(newsFeed);
    } catch (error) {
        await takeScreenshot(page, 'Error');
        next(error);
    }
});


// const topNews = async () => {
//     const newsFeed = []
//     try {
//         const rapplerNews = await getRapplerNews('https://www.rappler.com/', '.post-card__secondary-title a')
//         newsFeed.push(...rapplerNews)
//         console.log(newsFeed)
//         console.log(newsFeed.length)

//         const mbNews = await getMBNews('https://mb.com.ph/category/news')
//         newsFeed.push(...mbNews)
//         console.log(newsFeed)
//         console.log(newsFeed.length)

//         const inquirerNews = await getInquirerNews('https://newsinfo.inquirer.net/')
//         newsFeed.push(...inquirerNews)
//         console.log(newsFeed)
//         console.log(newsFeed.length)

//         const philStarNews = await getPhilStarNews('https://www.philstar.com/headlines')
//         newsFeed.push(...philStarNews)
//         console.log(newsFeed)
//         console.log(newsFeed.length)

//         const businessWorldNews = await getBusinessWorldNews('https://www.bworldonline.com/top-stories/')
//         newsFeed.push(...businessWorldNews)
//         console.log(newsFeed)
//         console.log(newsFeed.length)

//     } catch (error) {
//         await takeScreenshot(page, 'Error');
//         throw error;
//     }
// };

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