import { test, expect } from "@playwright/test"

test.describe("Slow Resources", () => {
    test.setTimeout(35000)
    
    test.fail("Slow Resources", async ({ page }) => {
        const responsePromise = page.waitForResponse((res) => 
            res.url().includes('/slow_external')
        )
        
        await page.goto('/slow')
        
        const response = await responsePromise
        
        expect(response.status()).toBe(200)
    })
})