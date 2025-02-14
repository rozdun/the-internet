import { test, expect } from "@playwright/test"

test("Horizontal Slider", async ({ page }) => {
    await page.goto("/horizontal_slider")
    await expect(page.getByRole("heading", { name: "Horizontal Slider" })).toBeVisible()

    const range = page.locator("#range")
    const slider = page.getByRole("slider")
    
    // Check slider value using a fill
    await slider.fill("2.5")
    await expect(range).toHaveText("2.5")

    // Check slider value using a mouse click
    const sliderBbox = await slider.boundingBox()
    if (!sliderBbox) throw new Error("Slider not found")
    await page.mouse.click(sliderBbox.x + 100, sliderBbox.y + 10)
    await expect(range).toHaveText("4")

    // Check slider value using a keyboard
    await page.keyboard.press('ArrowLeft')
    await expect(range).toHaveText("3.5")
    await page.keyboard.press('ArrowRight')
    await expect(range).toHaveText("4")

    // Check min value
    const sliderMinValue = await slider.getAttribute("min")
    expect(sliderMinValue).toBe("0.0")

    // Check max value
    const sliderMaxValue = await slider.getAttribute("max")
    expect(sliderMaxValue).toBe("5.0")
})
