import { test, expect } from "@playwright/test"

test.describe('Dynamic Controls', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto("/dynamic_controls")
        await expect(page.getByRole("heading", { name: "Dynamic Controls" })).toBeVisible()
    })
    
    test("Checkbox", async ({ page }) => {
        const checkboxExample = page.locator('#checkbox-example')
        const checkbox = checkboxExample.getByRole('checkbox')
        const checkboxLoadingText = checkboxExample.getByText('Wait for it...')
        const removeButton = checkboxExample.getByRole('button', {name: 'Remove'})
        const addButton    = checkboxExample.getByRole('button', {name: 'Add'})
        const messageItsGone = checkboxExample.getByText("It's gone!")
        const messageItsBack = checkboxExample.getByText("It's back!")
        
        await removeButton.click()
        await expect(checkboxLoadingText).toBeVisible()
        await expect(messageItsGone).toBeVisible()
        await expect(checkboxLoadingText).not.toBeVisible()
        await expect(checkbox).not.toBeVisible()
    
        await addButton.click()
        await expect(checkboxLoadingText.first()).toBeVisible()
        await expect(messageItsBack).toBeVisible()
        await expect(checkboxLoadingText.first()).not.toBeVisible()
        await expect(checkbox).toBeVisible()
    })
    
    
    test("Textbox", async ({ page }) => {
        const inputExample = page.locator('#input-example')
        const textbox = inputExample.getByRole('textbox')
        const inputLoadingText = inputExample.getByText('Wait for it...')
        const enableButton  = inputExample.getByRole('button', {name: 'Enable'})
        const disableButton = inputExample.getByRole('button', {name: 'Disable'})
        const messageItsEnabled  = inputExample.getByText("It's enabled!")
        const messageItsDisabled = inputExample.getByText("It's disabled!")
    
        await enableButton.click()
        await expect(inputLoadingText).toBeVisible()
        await expect(messageItsEnabled).toBeVisible()
        await expect(inputLoadingText).not.toBeVisible()
        await expect(textbox).not.toHaveAttribute('disabled')
    
        await disableButton.click()
        await expect(inputLoadingText.first()).toBeVisible()
        await expect(messageItsDisabled).toBeVisible()
        await expect(inputLoadingText.first()).not.toBeVisible()
        await expect(textbox).toHaveAttribute('disabled')
    })
    
})