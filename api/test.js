import pw from 'playwright';
import retry from 'async-retry';

const takeScreenshot = async (page, log) => {
    console.log(log ? log + 'Captured' : 'Taking screenshot to page.png')
    await page.screenshot({ path: 'page.png', fullPage: true })
}

const businessStories = async () => {
    console.log('Connecting to browser...');
    const browser = await pw.chromium.launch();
    console.log('Connected');
    const page = await browser.newPage();

    const newsFeed = []

    try {
        await page.goto('https://www.philstar.com/entertainment', {timeout: 2 * 60 * 1000 });
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

        console.log(newsFeed)
        console.log(newsFeed.length)

        

    } catch (error) {
        await takeScreenshot(page, 'Error');
        throw err;
    } finally {
        await browser.close();
    };
};


await retry(businessStories, {
    retries: 3,
    onRetry: (err) => {
        console.log('retrying...', err);
    }
});