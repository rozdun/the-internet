import { test, expect } from "@playwright/test"

test.fail("Status Codes", async ({ page }) => {
    const responsePromise = page.waitForResponse((response) => 
        response.url().includes('/status_codes')
    )
    page.goto('/status_codes/200')
    const response = await responsePromise
    expect(response.status()).toBe(200)
})