import pw from 'playwright';
import retry from 'async-retry';

const takeScreenshot = async (page, log) => {
    console.log(log ? log + 'Captured' : 'Taking screenshot to page.png')
    await page.screenshot({ path: 'page.png', fullPage: true })
}

const main = async () => {
    console.log('Connecting to browser...');
    const browser = await pw.chromium.launch();
    console.log('Connected');
    const page = await browser.newPage();

    try {
        await page.goto('https://www.netflix.com/browse', {timeout: 2 * 60 * 1000 });
        console.log('Navigated to website. Scraping commenced');

        await takeScreenshot(page, 'Opening website...');
    } catch (error) {
        await takeScreenshot(page, 'Error');
        throw err;
    } finally {
        await browser.close();
    };
};

await retry(main, {
    retries: 3,
    onRetry: (err) => {
        console.log('retrying...', err);
    }
});