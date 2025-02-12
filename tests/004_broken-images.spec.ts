import { test, expect } from '@playwright/test'

test.fail('[fails] Broken Images', async ({ page }) => {
    const images = [
        'https://the-internet.herokuapp.com/asdf.jpg',
        'https://the-internet.herokuapp.com/hjkl.jpg',
        'https://the-internet.herokuapp.com/img/avatar-blank.jpg',
    ]
    const imagePromises = images.map(image => page.waitForResponse(image))
    
    await page.goto('/broken_images', { waitUntil: 'networkidle' })
    await expect(page.getByRole('heading', { name: 'Broken Images' })).toBeVisible()
    
    await Promise.all(imagePromises)
    
    // Verify the images are loading properly
    //// Expected to fail due to broken links
    for (const promise of imagePromises) {
        expect.soft((await promise).status()).toBe(200)
    }
})