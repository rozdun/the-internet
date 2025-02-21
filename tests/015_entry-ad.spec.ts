import { test as base, expect, Locator } from "@playwright/test"


const test = base.extend<{ entryAdPage: EntryAdPage }>({
    entryAdPage: async ({ page }, use) => {
        const entryAdPage = new EntryAdPage(page)
        await entryAdPage.goto()
        await expect(page.getByRole("heading", { name: "This is a modal window" })).toBeVisible()
        
        await use(entryAdPage)
    }
})

class EntryAdPage {
    private page: any
    public modal: Locator
    public closeButton: Locator
    public restartButton: Locator
    
    constructor(page: any) {
        this.page = page
        this.modal = this.page.locator('.modal')
        this.closeButton = this.modal.locator('p', { hasText: 'Close' })
        this.restartButton = this.page.locator('#restart-ad')
    }
    
    async goto() {
        await this.page.goto("/entry_ad")
    }
    
    async closeModal() {
        await this.closeButton.click()
    }
    
    async restartAd() {
        await this.restartButton.click()
    }
}


test.describe('Entry Ad', () => {
    test("Modal can be closed", async ({ entryAdPage }) => {
        await entryAdPage.closeModal()
        await expect(entryAdPage.modal).not.toBeVisible()
    })
    
    test("Modal does not appear on page reload", async ({ entryAdPage }) => {
        await entryAdPage.closeModal()
        await expect(entryAdPage.modal).not.toBeVisible()
        await entryAdPage.goto()
        await expect(entryAdPage.modal).not.toBeVisible()
    })
    
    test("Modal re-appears after re-enablings it", async ({ entryAdPage, page }) => {
        await entryAdPage.closeModal()
        await expect(entryAdPage.modal).not.toBeVisible()
        await entryAdPage.restartAd()
        await expect(entryAdPage.modal).toBeVisible()
    })
})