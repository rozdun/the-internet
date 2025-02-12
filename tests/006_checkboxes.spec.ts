import { test, expect } from "@playwright/test"

test("Checkboxes", async ({ page }) => {
    await page.goto("/checkboxes")
    await expect(page.getByRole("heading", { name: "Checkboxes" })).toBeVisible()

    const checkbox1 = page.locator("#checkboxes >> input").nth(0)
    const checkbox2 = page.locator("#checkboxes >> input").nth(1)

    await checkbox1.check()
    await expect(checkbox1).toBeChecked()

    await checkbox2.uncheck()
    await expect(checkbox2).not.toBeChecked()
})