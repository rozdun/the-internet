import { test, expect } from "@playwright/test"

test("Context Menu", async ({ page }) => {
    await page.goto("/context_menu")
    await expect(page.getByRole("heading", { name: "Context Menu" })).toBeVisible()
    
    const hotSpot = page.locator('#hot-spot')
    
    page.once("dialog", async (dialog) => {
        expect(dialog.message()).toBe("You selected a context menu")
        await dialog.accept()
    })
    
    await hotSpot.click({ button: "right" })
})
