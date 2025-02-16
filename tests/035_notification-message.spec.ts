import { test, expect } from "@playwright/test"

test("Notification Message", async ({ page }) => {
    await page.goto("/notification_message")
    await expect(page.getByRole("heading", { name: "Notification Message" })).toBeVisible()
    
    const notification = page.locator('#flash')
    await expect(notification).toContainText(/Action successful|Action unsuccesful, please try again/)
})