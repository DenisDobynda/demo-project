import { browser } from '@wdio/globals'

/**
* main page object containing all methods, selectors and functionality
* that is shared across all page objects
*/

const defaultTimeout = 1900000;

export default class Page {
    /**
    * Opens a sub page of the page
    * @param path path of the sub page (e.g. /path/to/page.html)
    */
    public open (path: string) {
        return browser.url(`https://slotscity.ua/${path}`)
    }


    public click (selector: string) {
       return browser.$(selector).click()
}

async waitForVisible (selector: string, timeout: number = defaultTimeout): Promise<void> {
    await $(selector).waitForDisplayed({ timeout });
    console.log(`Element ${selector} is visible`)
}  

async moveToElement (selector: string): Promise<void> {
    await $(selector).moveTo();        
}

async waitForExist (selector: string, timeout: number = defaultTimeout): Promise<void> {
    await $(selector).waitForExist({ timeout });
}

async switchFrame (selector: string, timeout: number = defaultTimeout): Promise<void> {
    await this.waitForExist(selector, timeout);
    await browser.switchFrame($(selector))
}

async  switchToIframeByClass() {
    // Wait until there are iframes present on the page (dynamic load handling)
    await browser.waitUntil(async () => {
        const iframes = await $$('iframe');
        return await iframes.length > 0; // Wait until at least one iframe exists
    }, {
        timeout: 15000, // Wait up to 15 seconds
        timeoutMsg: 'No iframes were loaded within the expected time.'
    });

    // Find the iframe by class "components-GameFrame---gameFrame--uHR90"
    const iframes = await $$('iframe'); // Get all iframes
    let targetIframe = null;

    // Iterate through all iframes to find the one with the class you need
    for (let i = 0; i < await iframes.length; i++) {
        const className = await iframes[i].getAttribute('class');
        console.log(`iframe ${i + 1}: class = ${className}`);

        if (className && className.includes('components-GameFrame---gameFrame--uHR90')) {
            targetIframe = iframes[i];
            break;
        }
    }

    // Check if the iframe with the target class was found
    if (targetIframe) {
        console.log('Target iframe found. Switching to it...');
        
        // Wait for the iframe to be displayed (it might be dynamically loaded or hidden)
        await targetIframe.waitForDisplayed({ timeout: 10000 });

        // Switch to the iframe
        await browser.switchToFrame(targetIframe);
        console.log('Switched to iframe successfully.');

        // Now you can interact with elements inside the iframe
        const elementInsideIframe = await $('selector-inside-iframe');
        await elementInsideIframe.waitForExist({ timeout: 10000 });

    } else {
        console.error('No iframe with the class components-GameFrame---gameFrame--uHR90 was found.');
    }

    // If you need to switch back to the main document, use:
    // await browser.switchToFrame(null);
}
}