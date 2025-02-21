import { test, expect } from "@playwright/test"

test("Data Tables", async ({ page }) => {
    await page.goto("/tables")
    
    // Example 1
    const row2_editButton = page.locator('#table1')
                                .locator('tr').filter({ has: page.locator('td', { hasText: 'Bach' }) })
                                .getByRole('link', { name: 'edit' })
    await row2_editButton.click()
    await expect(page).toHaveURL('/tables#edit')
    
    // Example 2
    const row4_deleteButton = page.locator('#table2')
                                  .locator('tr').filter({ has: page.locator('.last-name', { hasText: 'Conway' }) })
                                  .getByRole('link', { name: 'delete' })
    await row4_deleteButton.click()
    await expect(page).toHaveURL('/tables#delete')
})