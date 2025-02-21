import { test, expect } from '@playwright/test'
import { createWorker } from 'tesseract.js'
import fs from 'fs'

test('Challenging DOM', async ({ page }) => {
    await page.goto('/challenging_dom')
    await expect(page.getByRole('heading', { name: 'Challenging DOM' })).toBeVisible()
    
    
    // Click the buttons without using their names or ids
    const blueButton = page.locator('.button').first()
    const redButton = page.locator('.button.alert')
    const greenButton = page.locator('.button.success')
    await blueButton.click()
    await redButton.click()
    await greenButton.click()
    
    
    // Click the edit button in the Iuvaret5 row
    const rowEditButton = page.getByRole('row', { name: 'Iuvaret5' })
                              .getByRole('link', { name: 'edit' })
    await expect(rowEditButton).toHaveAttribute('href', '#edit')
    await rowEditButton.click()
    
    
    // Perform OCR on the screenshot
    const file = '005_canvas.png'
    const canvas = page.locator('#canvas')
    const worker = await createWorker('eng')
    await worker.load()
    
    const screenshot = await canvas.screenshot({ path: file })
    const { data } = await worker.recognize(screenshot)
    
    fs.unlinkSync(file)
    await worker.terminate()
    
    expect(data.text).toMatch(/.*\d{1,5}/)
})