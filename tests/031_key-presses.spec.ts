import { test, expect } from "@playwright/test"

test("Key Presses", async ({ page }) => {
    await page.goto("/key_presses")
    await expect(page.getByRole("heading", { name: "Key Presses" })).toBeVisible()
    
    const target = page.locator('#target')
    const result = page.locator('#result')
    await target.focus()
    
    await page.keyboard.press('B')
    await expect(result).toHaveText('You entered: B')
    await expect(target).toHaveValue('B')
    
    await page.keyboard.press('ArrowLeft')
    await expect(result).toHaveText('You entered: LEFT')
    
    await page.keyboard.press('Backspace')
    await expect(result).toHaveText('You entered: BACK_SPACE')
    
    await page.keyboard.press('Delete')
    await expect(result).toHaveText('You entered: DELETE')
    await expect(target).toHaveValue('')
    
    await page.keyboard.press('Escape')
    await expect(result).toHaveText('You entered: ESCAPE')
    
    await page.keyboard.press('Tab')    
    await expect(result).toHaveText('You entered: TAB')
})