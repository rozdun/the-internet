import { test, expect } from "@playwright/test"

test("Infinite Scroll", async ({ page }) => {
    await page.goto("/infinite_scroll")
    await expect(page.getByRole("heading", { name: "Infinite Scroll" })).toBeVisible()
    
    const sections = page.locator('.jscroll-added')
    
    await page.waitForTimeout(250)
    await page.mouse.wheel(0, 1000)
    await expect(sections).toHaveCount(3)
    
    await page.waitForTimeout(250)
    await page.mouse.wheel(0, 1000)
    await expect(sections).toHaveCount(4)
})