import { test, expect } from "@playwright/test"

const longitude = 12.34
const latitude = 23.45

test.use({
    geolocation: { longitude: longitude, latitude: latitude },
    permissions: ['geolocation'],
})

test("Geolocation", async ({ page }) => {
    await page.goto("/geolocation")
    await expect(page.getByRole("heading", { name: "Geolocation" })).toBeVisible()
    
    const button = page.getByRole('button', { name: 'Where am I?' })
    await button.click()
    
    const latituteValue = page.locator('#lat-value')
    await expect(latituteValue).toContainText(latitude.toString())
    
    const longitudeValue = page.locator('#long-value') 
    await expect(longitudeValue).toContainText(longitude.toString())
})