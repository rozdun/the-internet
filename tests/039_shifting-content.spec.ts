import { test, expect } from "@playwright/test"

test.describe("Shifting Content", () => {
    test("Menu Element", async ({ page }) => {
        await page.goto('/shifting_content/menu?pixel_shift=100')
        await expect(page.getByRole("heading", { name: "Shifting Content: Menu Element" })).toBeVisible()
        
        const galleryTab = page.locator('a').filter({ hasText: 'Gallery' })
        const leftValue = await galleryTab.evaluate(el => getComputedStyle(el).left)
        expect(leftValue).toBe('-100px')
    })
    
    
})