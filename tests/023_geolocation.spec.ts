import { test, expect } from "@playwright/test"

test("Geolocation", async ({ page }) => {
    await page.goto("/geolocation")
    await expect(page.getByRole("heading", { name: "Geolocation" })).toBeVisible()
    
})