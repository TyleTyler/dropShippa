const { Builder, By, until } = require("selenium-webdriver");
const chrome = require("selenium-webdriver/chrome");
const { createCanvas, loadImage } = require('canvas');

const getHTMLElement = async (driver, element) => {
    return driver.executeScript(`const elements = () => { return document.querySelector("${element}"); }; return elements()`);
};

const getHTMLElements = async (driver,element) => {
    return driver.findElements(By.css(element));
};
// Create ChromeOptions instance
const options = new chrome.Options();
// options.addArguments("--headless");
options.addArguments("--no-sandbox");

// Provide the location where Chrome stores profiles
options.addArguments("--user-data-dir=C:\\Users\\willy\\AppData\\Local\\Google\\Chrome\\User Data");

// Provide the profile name with which we want to open the browser
options.addArguments("--profile-directory=Profile 1");


const checkItemAvailability = async (searchTerm) => {
    let driver;
    let possibleProducts = []
    try {
        // Use setChromeOptions(options) to set the ChromeOptions
        driver = new Builder().setChromeOptions(options).forBrowser("chrome").build();
        await driver.get("https://sellercentral.amazon.com/product-search?ref=xx_catadd_dnav_xx");
        const shadowHost = await driver.wait(until.elementLocated(By.css("kat-predictive-input")), 10000);

        // Execute JavaScript to get the shadow root
        const shadowRoot = await driver.executeScript("return arguments[0].shadowRoot", shadowHost);

        // // Now you can find elements within the shadow DOM using standard WebDriver methods
        const searchInput = await shadowRoot.findElement(By.css("input"));
        await searchInput.sendKeys(searchTerm)
        let currentElemnt = await getHTMLElement(driver, ".search-button")
        await currentElemnt.click()
        await driver.wait(until.elementLocated(By.css("kat-dropdown")))
        const products = await getHTMLElements(driver, "kat-box")
        for(const productPage of products){
            try{
                // console.log(await productPage.findElement(By.css("kat-dropdown-button")))
                const availability = await productPage.findElement(By.css("kat-dropdown-button"))
                if(!availability){
                    throw new Error()
                }
                const href = await productPage.findElement(By.css("a")).getAttribute("href")
                const name = await productPage.findElement(By.css("a")).getAttribute("textContent")
                const asin = href.substring(href.indexOf("B0"),href.indexOf("B0") + 12)
                const imgSrc = await productPage.findElement(By.css("img")).getAttribute("src")
                
                const product = {
                    name: name,
                    href: href,
                    asin: asin,
                    img: imgSrc
                }
                possibleProducts.push(product)
            }catch{
            }
        }


    } catch (error) {
        console.log("Error in fetching item availability:", error);
    }
    finally {
        // Always close the driver in the finally block to ensure it is closed even if an error occurs
        if (driver) {
            await driver.quit();
        }
        
    }
    return possibleProducts.length > 0 ? possibleProducts : {message: "There are no sellable products"}
};


(async () => {
    console.log(await checkItemAvailability("Soap Sponge Drain Rack Sink Shelf Dish Drainer Portable Hanging Drain Basket Kitchen Gadget Kitchen Organizer Accessory"));
})();
