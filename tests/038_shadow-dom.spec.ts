import { test, expect } from "@playwright/test"

test("Shadow DOM", async ({ page }) => {
    await page.goto('/shadowdom')
    await expect(page.getByRole("heading", { name: "Simple template" })).toBeVisible()
    
    const shadowDOM = page.locator('span').getByText("Let's have some different text!")
    await expect(shadowDOM).toBeVisible()
    
    const nextShadowDOM = page.locator('li').getByText("Let's have some different text!")
    await expect(nextShadowDOM).toBeVisible()
})