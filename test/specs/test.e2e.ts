import { expect } from '@wdio/globals'
import LoginPage from '../pageobjects/login.page.js'
import { LocatorCommon } from '../pageobjects/locators.js'

describe('Live Roulette', () => {
    it('Open roulette game table', async () => {
        await LoginPage.open()

        // Login and check if client is logged
        await LoginPage.login('dan.dobynda@gmail.com', '6h2$GRzYWdT9!wq');
        await LoginPage.click(LocatorCommon.menuButton);
        await LoginPage.waitForVisible(LocatorCommon.userPanel);
        await expect(browser.$(LocatorCommon.userPaneluserName)).toHaveText('dan.dobynda');

        // Close menu
        await LoginPage.click(LocatorCommon.menuButton);

    })

    it('Open roulette game', async () => {
        await LoginPage.moveToElement(LocatorCommon.ukrainianRouletteTableTile);
        await LoginPage.click(LocatorCommon.ukrainianRoulettePlayButton); 

        await LoginPage.switchToIframeByClass();

        await LoginPage.waitForVisible(LocatorCommon.videoPlayer);
    })
})

