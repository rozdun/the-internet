import { test, expect } from "@playwright/test"

test("Shifting Content", async ({ page }) => {
    await page.goto('/shifting_content/menu')
    
    const pixelShiftUrl = page.locator('p')
                            .filter( { has: page.locator('code', { hasText: '?pixel_shift=100' }) })
                            .locator('a', { hasText: 'click here' })
    await pixelShiftUrl.click()
    
    const shiftElement = page.locator('.shift')
    const leftOffset = await shiftElement.evaluate(el => {
        return window.getComputedStyle(el).left
    })
    
    expect(leftOffset).toBe('-100px')
})