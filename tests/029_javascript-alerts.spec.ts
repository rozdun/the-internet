import { test, expect } from "@playwright/test"

test("JavaScript Alerts", async ({ page }) => {
    await page.goto("/javascript_alerts")
    await expect(page.getByRole("heading", { name: "JavaScript Alerts" })).toBeVisible()
    
    
})