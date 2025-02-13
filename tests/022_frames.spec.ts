import { test, expect } from "@playwright/test"

test("Frames", async ({ page }) => {
    await page.goto("/iframe")
    await expect(page.getByRole("heading", { name: "An iFrame containing the TinyMCE WYSIWYG Editor" })).toBeVisible()
    
    const editorIframe = page.frameLocator('#mce_0_ifr')
    const text = editorIframe.locator('body >> p')
    await expect(text).toHaveText('Your content goes here.')
})