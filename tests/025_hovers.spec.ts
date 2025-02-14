import { test, expect } from "@playwright/test"

test("Hovers", async ({ page }) => {
    await page.goto("/hovers")
    await expect(page.getByRole("heading", { name: "Hovers" })).toBeVisible()
    
    const profilesList = ['user', 'user2', 'user3']
    const profiles = page.locator(".figure")
    const profilesCount = await profiles.count()
    
    for (let index = 0; index < profilesCount; index++) {
        await profiles.nth(index).hover()
        await expect(profiles.nth(index).getByRole('heading')).toContainText(profilesList[index])
    }
})