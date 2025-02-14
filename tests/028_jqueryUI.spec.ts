import { test, expect } from "@playwright/test"

test("JQueryUI", async ({ page }) => {
    await page.goto("/jqueryui/menu")
    await expect(page.getByRole("heading", { name: "JQueryUI - Menu" })).toBeVisible()
    
    // Check the disabled menu item
    const disabledItem = page.locator('#ui-id-1')
    await disabledItem.evaluate(element => element.setAttribute('class','ui-state-enabled ui-menu-item ui-state-focus'))
    await disabledItem.hover()
    await expect(disabledItem.locator('#ui-id-2')).toHaveText('Should not see this')
    
    // Check the enabled menu item
    const enabledItem = page.locator('#ui-id-3')
    const downloadsItem = page.locator('#ui-id-4')
    const pdfItem = page.locator('#ui-id-5')
    await enabledItem.hover()
    await downloadsItem.hover()
    await pdfItem.hover()
    await expect(pdfItem).toHaveAttribute('class', 'ui-menu-item ui-state-focus')
})