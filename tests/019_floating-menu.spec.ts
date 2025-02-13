import { test, expect } from "@playwright/test"

test("Floating Menu", async ({ page }) => {
    await page.goto("/floating_menu")
    await expect(page.getByRole("heading", { name: "Floating Menu" })).toBeVisible()
    
    // Scroll to the page footer
    const menu = page.locator("#menu")
    const textToScrollTo = page.locator('a', { hasText: "Elemental Selenium" })
    await textToScrollTo.scrollIntoViewIfNeeded()
    await expect(textToScrollTo).toBeVisible()
    await expect(menu).toBeVisible()
    
    const style = await menu.getAttribute('style')
    
    // Verify that the floating menu followed the scroll
    if (style) {
        const match = style.match(/\d+/)
        const pixelY = match ? parseInt(match[0]) : null
        
        if (pixelY != null) {
            expect(pixelY).toBeGreaterThan(4000)
        }
        else {
            throw new Error("No digits found in style attribute")
        }
    }
    else {
        throw new Error("No style attribute found")
    }
})