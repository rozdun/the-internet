import { test, expect } from "@playwright/test"

test("Disappearing Elements", async ({ page }) => {
    await page.goto("/disappearing_elements")
    await expect(page.getByRole("heading", { name: "Disappearing Elements" })).toBeVisible()
    
    const navItems = ['', 'about', 'contact-us', 'portfolio', 'gallery']
    const navItemsLocators = page.getByRole('listitem')
    
    let keepCurrentSession = false
    if (await navItemsLocators.count() === navItems.length)
        keepCurrentSession = true
    
    for (let index = 0; index < navItems.length; index++) {
        // Because the Gallery button may not be visible,
        // reload the reload the page in that case and try again
        if (await navItemsLocators.nth(index).isVisible())
            await navItemsLocators.nth(index).click()
        else {
            // Reload the page if the nav item is not visible
            await page.reload()
            console.log(`hi ${navItems[index]}`)
            index--
            continue
        }
        
        // Verify the URL contains the expected path
        await expect(page).toHaveURL(new RegExp(navItems[index]))
        
        // Once we grab a session that has all the nav items,
        // keep it instead of reloading the page
        if (keepCurrentSession) {
            await page.goBack()
        } else {
            await page.goto("/disappearing_elements")
            
            // Check if all items are now visible
            if (await navItemsLocators.count() === navItems.length)
                keepCurrentSession = true
        }
    }
})