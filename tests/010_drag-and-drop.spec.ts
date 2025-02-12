import { test, expect } from "@playwright/test"

test("Drag and Drop", async ({ page }) => {
    await page.goto("/drag_and_drop")
    await expect(page.getByRole("heading", { name: "Drag and Drop" })).toBeVisible()
    
    const columns = page.locator('#columns .column')
    const columnA = columns.nth(0)
    const columnB = columns.nth(1)
    
    await columnA.dragTo(columnB)
    await expect(columnA).toHaveText("B")
})