import { test, expect } from '@playwright/test'

test('Add/Remove Elements', async ({ page }) => {
    await page.goto('/add_remove_elements/')
    await expect(page.getByRole('heading', { name: 'Add/Remove Elements' })).toBeVisible()
    
    const removeButtons = page.getByRole('button', { name: 'Delete' })
    const addButton = page.getByRole('button', { name: 'Add Element' })
    
    await addButton.click()
    await expect(removeButtons).toHaveCount(1)
    
    await addButton.click()
    await expect(removeButtons).toHaveCount(2)
    
    await removeButtons.first().click()
    await expect(removeButtons).toHaveCount(1)
    
    await removeButtons.first().click()
    await expect(removeButtons).toHaveCount(0)
})