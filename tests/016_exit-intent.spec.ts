import { test, expect } from "@playwright/test"

test("Exit Intent", async ({ page }) => {
    await page.goto("/exit_intent")
    await expect(page.getByRole("heading", { name: "Exit Intent" })).toBeVisible()
    
    await page.mouse.move(100, 50)
    await page.mouse.move(100, -50)
    const closeButton = page.locator('.modal >> p', { hasText: 'Close' })
    await expect(closeButton).toBeVisible()
})