import { test, expect } from "@playwright/test"

test("Inputs", async ({ page }) => {
    await page.goto("/inputs")
    await expect(page.getByRole("heading", { name: "Inputs" })).toBeVisible()
    
    const input = page.locator('input')
    
    await input.fill('1')
    await expect(input).toHaveValue('1')
    
    await page.keyboard.press('ArrowUp')
    await expect(input).toHaveValue('2')
    
    await page.keyboard.press('ArrowDown')
    await page.keyboard.press('ArrowDown')
    await page.keyboard.press('ArrowDown')
    await expect(input).toHaveValue('-1')
})