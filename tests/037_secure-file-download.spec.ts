import { test, expect } from "@playwright/test"

test("Secure File Download", async ({ browser }) => {
    const context = await browser.newContext({
        httpCredentials: {
          username: 'admin',
          password: 'admin',
        }
    })
    const newPage = await context.newPage();
    await newPage.goto('/download_secure')
    await expect(newPage.getByRole("heading", { name: "Secure File Download" })).toBeVisible()
})