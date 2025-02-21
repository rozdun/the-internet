import { test, expect } from "@playwright/test"

test("Typos", async ({ page }) => {
    await page.goto("/typos")
    await expect(page.getByText("Sometimes you'll see a typo, other times you won't.")).toBeVisible()
})