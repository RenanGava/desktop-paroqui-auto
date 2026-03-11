import puppeteer from 'puppeteer'



export async function initPuppeteer(){

    const browser = await puppeteer.launch({
        headless: false,
        args: ['--no-sandbox']
    })

    const page = await browser.newPage()
    await page.goto('http://www.google.com')
    await page.type('textarea[id="APjFqb"]', 'Ola mundo kkkkkkk')

    console.log(page.url());
    

}