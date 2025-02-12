import { test, expect } from "@playwright/test"

test("Digest Authentication", async ({ browser }) => {
    const context = await browser.newContext({
        httpCredentials: {
            username: 'admin',
            password: 'admin'
        }
    })
    const page = await context.newPage()
    await page.goto("/digest_auth")
    await expect(page.getByRole("heading", { name: "Digest Auth" })).toBeVisible()
})