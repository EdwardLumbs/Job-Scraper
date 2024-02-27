import pw from 'playwright';

export const takeScreenshot = async (page, log) => {
    console.log(log ? log + 'Captured' : 'Taking screenshot to page.png')
    await page.screenshot({ path: 'page.png', fullPage: true })
}

export const getRapplerNews = async (site, selector) => {
    console.log('Connecting to browser...');
    const browser = await pw.chromium.launch();
    console.log('Connected');
    const page = await browser.newPage();

    const newsFeed = []
    try {
        await page.goto(site, {timeout: 2 * 60 * 1000 });
        console.log('Navigated to website. Scraping commenced');
        await takeScreenshot(page, 'Opening Rappler...');
    
        newsFeed.push({
            title: await page.$eval('.post-card__primary-story h3 a', 
                anchorElement => anchorElement.innerText),
            link: await page.$eval('.post-card__primary-story h3 a',
                anchorElement => anchorElement.getAttribute('href')),
            image: await page.$eval('.post-card__image img', 
                imageElement => imageElement.getAttribute('src'))
        });

        const rapplerTopStories = await page.$$('.post-card__more article ')
        console.log(rapplerTopStories.length)
    
        for (const story of rapplerTopStories) {
            console.log('clicked')
            const title = await story.$eval(selector,
                anchorElement => anchorElement.innerText);
            const link = await story.$eval(selector,
                anchorElement => anchorElement.getAttribute('href'));
            const image = await story.$eval('.post-card__more-secondary-image img',
                imageElement => imageElement.getAttribute('src'));
            newsFeed.push({ title, link, image });
        }
        console.log(newsFeed.length)

        return newsFeed
    } catch (error) {
        await takeScreenshot(page, 'Error');
        throw error;
    } finally {
        await browser.close();
    };
}

export const getMBNews = async (site) => {
    console.log('Connecting to browser...');
    const browser = await pw.chromium.launch();
    console.log('Connected');
    const page = await browser.newPage();

    const newsFeed = []
    
    try {
        await page.goto(site, {timeout: 2 * 60 * 1000 });
        console.log('Navigated to website. Scraping commenced');
        await takeScreenshot(page, 'Opening Manila Bulletin...');

        await page.waitForSelector('.article-list .row.mb-5')
        const mbTopStories = await page.$$('.article-list .row.mb-5')
        console.log(mbTopStories.length)

        for (const story of mbTopStories) {
            console.log('Processing...')
            const title = await story.$eval('.col h4 a',
                anchorElement => anchorElement.innerText);
            const link = `https://mb.com.ph${await story.$eval('.col-12.col-sm-4.col > a', 
                anchorElement => anchorElement.getAttribute('href'))}`;
            
            const imageElement = await story.$('.col-12 .v-image__image.v-image__image--cover');
            const styleAttribute = await imageElement.getAttribute('style');
            console.log(typeof styleAttribute)
            const imageUrlMatch = styleAttribute.match(/url\("([^"]+)"\)/);
            // add default image if no image found
            const image = imageUrlMatch
            
            newsFeed.push({ title, link, image });
        }
        console.log(newsFeed.length)

        return newsFeed
    } catch (error) {
        await takeScreenshot(page, 'Error');
        throw error;
    } finally {
        await browser.close();
    };
}

export const getInquirerNews = async (site) => {
    console.log('Connecting to browser...');
    const browser = await pw.chromium.launch();
    console.log('Connected');
    const page = await browser.newPage();

    const newsFeed = []
    try {
        await page.goto(site, {timeout: 2 * 60 * 1000 });
        console.log('Navigated to website. Scraping commenced');
        await takeScreenshot(page, 'Opening Inquirer...');

        const stories =  await page.$$('#new-channel-grid #ncg-box')
        const inquirerTopStories = stories.slice(0, 15);
        console.log(inquirerTopStories.length)

        for (const story of inquirerTopStories) {
            console.log('Processing...')
            const title = await story.$eval('#ncg-info a',
                anchorElement => anchorElement.innerText);
            const link = await story.$eval('#ncg-info a',
                anchorElement => anchorElement.getAttribute('href'));
            const cssText = await story.$eval('#ncg-img',
                imageElement => imageElement.getAttribute('style'));
            const startIndex = cssText.indexOf('(');
            const endIndex = cssText.indexOf(')');
            const image = cssText.substring(startIndex + 1, endIndex);
            newsFeed.push({ title, link, image });
        }
        console.log(newsFeed.length)
  
        return newsFeed
    } catch (error) {
        await takeScreenshot(page, 'Error');
        throw error;
    } finally {
        await browser.close();
    };
}

export const getPhilStarNews = async (site) => {
    console.log('Connecting to browser...');
    const browser = await pw.chromium.launch();
    console.log('Connected');
    const page = await browser.newPage();

    const newsFeed = []
    try {
        await page.goto(site, {timeout: 2 * 60 * 1000 });
        console.log('Navigated to website. Scraping commenced');
        await takeScreenshot(page, 'Opening PhilStar...');

        const philStarTopStories =  await page.$$('.carousel__items .carousel__item');
        console.log(philStarTopStories.length);

        for (const story of philStarTopStories) {
            console.log('Processing...');
            try {
                const title = await story.$eval('.carousel__item__title h2 a',
                    anchorElement => anchorElement.innerText);
                const link = await story.$eval('.carousel__item__title h2 a',
                    anchorElement => anchorElement.getAttribute('href'));
                const image = await story.$eval('.carousel__item__image picture img',
                    anchorElement => anchorElement.getAttribute('src'));
                
                newsFeed.push({ title, link, image });
            } catch (error) {
                console.log('Error occurred while scraping story:', error);
            }
        }

        const philStarLatestStories =  await page.$$('.news_column.latest .tiles.late');
        console.log(philStarLatestStories.length);

        for (const story of philStarLatestStories) {
            console.log('Processing...');
            try {
                const title = await story.$eval('.TilesText.spec h2 a',
                    anchorElement => anchorElement.innerText);
                const link = await story.$eval('.TilesText.spec h2 a',
                    anchorElement => anchorElement.getAttribute('href'));
                const imageUrl = await story.$eval('.tiles_image > .tiles_overflow_holder > a > img',
                    anchorElement => anchorElement.getAttribute('data-srcset'));
                const imageUrlParts = imageUrl.split(".jpg");
                const image = imageUrlParts[0] + ".jpg";

                newsFeed.push({ title, link, image });
            } catch (error) {
                console.log('Error occurred while scraping story:', error);
            }
        }

        const philStarTrendingStories =  await page.$$('.news_column.trending .tiles.trend');
        console.log(philStarTrendingStories.length);

        for (const story of philStarTrendingStories) {
            console.log('Processing...');
            try {
                const title = await story.$eval('.TilesText.spec h2 a',
                    anchorElement => anchorElement.innerText);
                const link = await story.$eval('.TilesText.spec h2 a',
                    anchorElement => anchorElement.getAttribute('href'));
                const imageUrl = await story.$eval('.tiles_image > .tiles_overflow_holder > a > img',
                    anchorElement => anchorElement.getAttribute('data-srcset'));
                const imageUrlParts = imageUrl.split(".jpg");
                const image = imageUrlParts[0] + ".jpg";

                newsFeed.push({ title, link, image });
            } catch (error) {
                console.log('Error occurred while scraping story:', error);
            }
        }

        return newsFeed
    } catch (error) {
        console.log('Error occurred while scraping story:', error);
        await takeScreenshot(page, 'Error');
        throw error;
    } finally {
        await browser.close();
    };
}

export const getBusinessWorldNews = async (site) => {
    console.log('Connecting to browser...');
    const browser = await pw.chromium.launch();
    console.log('Connected');
    const page = await browser.newPage();

    const newsFeed = []
    try {
        await page.goto(site, {timeout: 2 * 60 * 1000 });
        console.log('Navigated to website. Scraping commenced');
        await takeScreenshot(page, 'Opening Business World...');

        const bwTopStories =  await page.$$('.td-ss-main-content .td_module_10');
        console.log(bwTopStories.length);

        for (const story of bwTopStories) {
            console.log('Processing...');
            const title = await story.$eval('.td-module-thumb a',
                anchorElement => anchorElement.getAttribute('title'));
            const link = await story.$eval('.td-module-thumb a',
                anchorElement => anchorElement.getAttribute('href'));
            const image = await story.$eval('.td-module-thumb a img',
                anchorElement => anchorElement.getAttribute('data-img-url'));
            
            newsFeed.push({ title, link, image });
        }
        console.log(newsFeed.length)
        
        return newsFeed
    } catch (error) {
        console.log('Error occurred while scraping story:', error);
        await takeScreenshot(page, 'Error');
        throw error;
    } finally {
        await browser.close();
    };
}