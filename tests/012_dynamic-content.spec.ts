import { test as base, expect } from "@playwright/test"

class DynamicContentPage {
    private page: any
    
    constructor(page: any) {
        this.page = page
    }
    
    async goto(checkStaticContent = false) {
        if (checkStaticContent)
            await this.page.goto("/dynamic_content?with_content=static")
        else
            await this.page.goto("/dynamic_content")
    }
    
    async getRowsText() {
        const rows = this.page.locator('.example >> .row >> .row >> .large-10.columns')
        const rowsTextContent: string[] = []
        const rowCount = await rows.count()
        
        // Get text content of each row
        for (let i = 0; i < rowCount; i++) {
            const row = rows.nth(i)
            let textContent = (await row.textContent()) ?? ""
            textContent = textContent.trim()
            
            rowsTextContent.push(textContent)
        }
        
        return rowsTextContent
    }
}

// Because both test cases are very similar, we avoid code duplication by creating a fixture
// where we can pass a parameter to check if the static content should be checked
const test = base.extend<{ dynamicContentPage: DynamicContentPage, checkStaticContent: boolean }>({
    checkStaticContent: [false, { option: true }],
    
    dynamicContentPage: async ({ page, checkStaticContent }, use) => {
        const dynamicContentPage = new DynamicContentPage(page)
        await dynamicContentPage.goto(checkStaticContent)
        await expect(page.getByRole("heading", { name: "Dynamic Content" })).toBeVisible()
        
        // Get text content before and after page reload
        const initialTexts = await dynamicContentPage.getRowsText()
        await page.reload()
        const newTexts = await dynamicContentPage.getRowsText()
        
        const rowCount = initialTexts.length
        const expectedStaticRows = 2
        
        // Check if the text content has changed depending on the test case
        for (let i = 0; i < rowCount; i++)
            if (checkStaticContent && i < expectedStaticRows)
                expect(initialTexts[i]).toBe(newTexts[i])
            else
                expect(initialTexts[i]).not.toBe(newTexts[i])
        
        await use(dynamicContentPage)
    }
})



test.describe("Dynamic Content", () => {
    test.use({ checkStaticContent: false })
    
    test("Content changes upon page refresh", async ({ dynamicContentPage }) => {})
})

test.describe("Dynamic Content", () => {
    test.use({ checkStaticContent: true })
    
    test("Content partially changes upon page refresh", async ({ dynamicContentPage }) => {})
})