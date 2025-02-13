import { test, expect } from "@playwright/test"

test.describe("Form Authentication", () => {
    const username = "tomsmith"
    const password = "SuperSecretPassword!"
    
    test.beforeEach(async ({ page }) => {
        await page.goto("/login")
        await expect(page.getByRole("heading", { name: "Login Page" })).toBeVisible()
    })
    
    test("Correct credentials", async ({ page }) => {
        const usernameInput = page.locator('#username')
        const passwordInput = page.locator('#password')
        const button = page.getByRole('button', { name: 'Login' })
        const flash = page.locator('#flash')
        
        
        await usernameInput.fill(username)
        await passwordInput.fill(password)
        await button.click()
        await expect(flash).toHaveText(/You logged into a secure area!/)
    })
    
    test("Incrrect credentials", async ({ page }) => {
        const usernameInput = page.locator('#username')
        const passwordInput = page.locator('#password')
        const button = page.getByRole('button', { name: 'Login' })
        const flash = page.locator('#flash')
        
        
        await usernameInput.fill('incorrect')
        await passwordInput.fill('incorrect')
        await button.click()
        await expect(flash).toHaveText(/Your username is invalid!/)
    })
})