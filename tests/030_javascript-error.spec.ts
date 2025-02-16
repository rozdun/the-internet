import { test, expect } from "@playwright/test"

test.fail("JavaScript Error", async ({ page }) => {
    const errors: Array<Error> = []
    
    page.addListener('pageerror', (error) => {
        errors.push(error)
    })
    
    await page.goto("/javascript_error")
    
    expect(errors).toHaveLength(0)
})