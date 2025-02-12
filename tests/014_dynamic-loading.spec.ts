import { test, expect } from "@playwright/test"

test.describe('Dynamic Loading', () => {
    test("Example 1: Element on page that is hidden", async ({ page }) => {
        await page.goto("/dynamic_loading/1")
        await expect(page.getByRole("heading", { name: "Example 1: Element on page that is hidden" })).toBeVisible()
        
        const startButton = page.getByRole('button', { name: 'Start' })
        const loadingText = page.getByText('Loading...')
        const helloWorld = page.getByRole('heading', { name: 'Hello World!' })
        
        await startButton.click()
        await expect(loadingText).toBeVisible()
        await expect(helloWorld).toBeVisible({ timeout: 10000 })
        await expect(loadingText).not.toBeVisible()
    })
    
    test("Example 2: Element rendered after the fact", async ({ page }) => {
        await page.goto("/dynamic_loading/2")
        await expect(page.getByRole("heading", { name: "Example 2: Element rendered after the fact" })).toBeVisible()
        
        const startButton = page.getByRole('button', { name: 'Start' })
        const loadingText = page.getByText('Loading...')
        const helloWorld = page.getByRole('heading', { name: 'Hello World!' })
        
        await startButton.click()
        await expect(loadingText).toBeVisible()
        await expect(helloWorld).toBeVisible({ timeout: 10000 })
        await expect(loadingText).not.toBeVisible()
    })
})