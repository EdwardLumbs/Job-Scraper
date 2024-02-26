import pw from 'playwright';
import retry from 'async-retry';

const takeScreenshot = async (page, log) => {
    console.log(log ? log + 'Captured' : 'Taking screenshot to page.png')
    await page.screenshot({ path: 'page.png', fullPage: true })
}

const topStories = async () => {
    console.log('Connecting to browser...');
    const browser = await pw.chromium.launch();
    console.log('Connected');
    const page = await browser.newPage();

    const newsFeed = []

    try {
        await page.goto('https://www.bworldonline.com/top-stories/', {timeout: 2 * 60 * 1000 });
        console.log('Navigated to website. Scraping commenced');
        await takeScreenshot(page, 'Opening Business World...');

        const bwTopStories =  await page.$$('.td-ss-main-content .td_module_10');
        console.log(bwTopStories.length);

        for (const story of bwTopStories) {
            console.log('Processing...');
            try {
                const title = await story.$eval('.td-module-thumb a',
                    anchorElement => anchorElement.getAttribute('title'));
                const link = await story.$eval('.td-module-thumb a',
                    anchorElement => anchorElement.getAttribute('href'));
                const image = await story.$eval('.td-module-thumb a img',
                    anchorElement => anchorElement.getAttribute('data-img-url'));
                
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

await retry(topStories, {
    retries: 3,
    onRetry: (err) => {
        console.log('retrying...', err);
    }
});