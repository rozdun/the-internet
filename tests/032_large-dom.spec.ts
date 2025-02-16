import { test, expect } from "@playwright/test"

test("Large & Deep DOM", async ({ page }) => {
    await page.goto("/large")
    await expect(page.getByRole("heading", { name: "Large & Deep DOM" })).toBeVisible()
    
    const sibling45 = page.locator('#sibling-45\\.1')
    await expect(sibling45).toContainText('45.1')
    
    const cell4616 = page.locator('.row-46 > .column-16')
    expect(cell4616).toHaveText('46.16')
})