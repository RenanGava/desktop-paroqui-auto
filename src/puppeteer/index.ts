import puppeteer, { Browser, Page } from 'puppeteer'



class PupAutomation {

    private static INSTANCE: PupAutomation;
    private page: Page | null;
    private browser: Browser | null;

    public static async getInstance() {

        if (!PupAutomation.INSTANCE) {
            console.log('Create Instance');
            
            PupAutomation.INSTANCE = new PupAutomation()

            return PupAutomation.INSTANCE
        }

        console.log('Recover Instance');
        return PupAutomation.INSTANCE
    }


    async getPup() {

        if (!this.browser && !this.page) {
            this.browser = await puppeteer.launch({
                headless: false,
                args: [
                    '--no-sandbox',
                    
                ]
            })


            const pages = await this.browser.pages()
            this.page = pages[0]

            return {
                page: this.page,
                browser: this.browser
            }
        }

        return {
            page: this.page,
            browser: this.browser
        }

    }


    async closeAllTabs(){
        const pages = await this.browser.pages()

        pages.forEach(page => {
            page.close()
        })
    }

}



export { PupAutomation }