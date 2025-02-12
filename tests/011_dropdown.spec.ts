import { test, expect } from "@playwright/test"

test("Dropdown List", async ({ page }) => {
    await page.goto("/dropdown")
    await expect(page.getByRole("heading", { name: "Dropdown List" })).toBeVisible()
    
    const dropdown = page.getByRole('combobox')
    await dropdown.selectOption('1')
    await expect(dropdown).toHaveValue('1')
    
    await dropdown.selectOption({label: 'Option 2'})
    await expect(dropdown.locator('option[selected]')).toHaveText('Option 2')
})