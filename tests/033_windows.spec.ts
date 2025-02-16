import { test, expect } from "@playwright/test"

test("Multiple Windows", async ({ page }) => {
    await page.goto("/windows")
    await expect(page.getByRole("heading", { name: "Opening a new window" })).toBeVisible()
    
    const button = page.getByText('Click Here')
    const newPagePromise = page.waitForEvent('popup')
    await button.click()
    
    const newPage = await newPagePromise
    await expect(newPage.getByRole("heading", { name: "New Window" })).toBeVisible()
})