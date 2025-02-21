import { test, expect } from '@playwright/test'
import { promises as fs } from 'fs'
import path from 'path'
import { createWorker } from 'tesseract.js' 

test.describe('Download', () => {
    
    const datasets = [
        { filetype: 'txt', filename: 'QuestionNumber2.txt', expectedText: 'sample' },
        { filetype: 'json', filename: 'data.json', expectedText: 'Jane', expectedText2: 'Doe' },
        { filetype: 'png', filename: 'progress.png', expectedText: "76% current" },
    ]
    
    test.beforeEach(async ({ page }) => {
        await page.goto('/download')
        await expect(page.getByRole("heading", { name: "File Downloader" })).toBeVisible()
    })

    // Loop through each file type and check for its content
    datasets.forEach(({ filetype, filename, expectedText, expectedText2}) => {
        test(`Download - ${filetype}`, async ({ page }) => {
            await page.goto('/download')

            const downloadPromise = page.waitForEvent('download')
            await page.getByText(filename).click()
            const download = await downloadPromise
            
            const downloadPath = path.join(__dirname, download.suggestedFilename())
            await download.saveAs(downloadPath)

            
            if (filetype === 'txt' || filetype === 'json') {
                const fileContent = await fs.readFile(downloadPath, 'utf-8')
                await fs.unlink(downloadPath)
                
                if (filetype === 'txt') {
                    expect(fileContent).toContain(expectedText)
                }
                else if (filetype === 'json') {
                    const data = JSON.parse(fileContent)
                    const employee = data.items[0].payload.employees[1]
                    
                    expect(employee.firstName).toContain(expectedText)
                    expect(employee.lastName).toContain(expectedText2)
                }
            }
            else if (filetype === 'png') {
                // Perform OCR on the downloaded image
                const worker = await createWorker('eng')
                await worker.load()
                
                const { data } = await worker.recognize(downloadPath)
                await fs.unlink(downloadPath)
                
                expect(data.text).toContain(expectedText)
                await worker.terminate()
            }
            else {
                throw new Error(`Unsupported filetype: ${filetype}`)
            }
        })
    })
})