import { test, expect } from "@playwright/test"

test("Redirect Link", async ({ page, request }) => {
    await page.goto("/redirector")
    await expect(page.getByRole("heading", { name: "Redirection" })).toBeVisible()
    
    
    const redirect = page.locator('#redirect')
    let redirectResponse
    
    page.on('response', async (response) => {
        if (response.url().endsWith('/redirect'))
            redirectResponse = response
    })
    
    await redirect.click()
    await expect(page).toHaveURL('/status_codes')
    
    expect(redirectResponse).toBeDefined()
    expect(redirectResponse.status()).toBe(302)
})