import { test, expect } from "@playwright/test"

test("Drag and Drop", async ({ page }) => {
    await page.goto("/drag_and_drop")
    await expect(page.getByRole("heading", { name: "Drag and Drop" })).toBeVisible()
    
    const columns = page.locator('#columns .column')
    const source = columns.nth(0)
    const target = columns.nth(1)
    
    await source.dragTo(target)
    await expect(source).toHaveText('B')
    await expect(target).toHaveText('A')
})