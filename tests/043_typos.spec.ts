import { test, expect } from "@playwright/test"

test("Typos", async ({ page }) => {
    await page.goto("/typos")
    
    const text = page.getByText(/Sometimes you'll see a typo, other times you (won't|won,t)\./)
    
    await expect(text).toBeVisible();
})