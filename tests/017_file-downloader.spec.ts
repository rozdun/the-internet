import { test, expect } from '@playwright/test'
import { promises as fs } from 'fs'
import path from 'path'

test.describe('Download', () => {
    
    const datasets = [
        { filetype: 'txt', filename: 'QuestionNumber2.txt', content: 'sample' },
        { filetype: 'json', filename: 'data.json', content: 'Jane', content2: 'Doe' },
        
    ]
    
    test.beforeEach(async ({ page }) => {
        await page.goto('/download')
        await expect(page.getByRole("heading", { name: "File Downloader" })).toBeVisible()
    })

    datasets.forEach(({ filetype, filename, content, content2}) => {
        test(`Download - ${filetype}`, async ({ page }) => {
            await page.goto('/download')

            const downloadPromise = page.waitForEvent('download')
            await page.getByText(filename).click()
            const download = await downloadPromise
            
            const downloadPath = path.join(__dirname, download.suggestedFilename())
            await download.saveAs(downloadPath)

            const fileContent = await fs.readFile(downloadPath, 'utf-8')
            await fs.unlink(downloadPath)
            
            const expectedText = content
            
            if (filetype === 'txt') {
                expect(fileContent).toContain(expectedText)
            }
            else if (filetype === 'json') {
                const data = JSON.parse(fileContent)
                const expectedText2 = content2
                const employee = data.items[0].payload.employees[1]
                
                expect(employee.firstName).toContain(expectedText)
                expect(employee.lastName).toContain(expectedText2)
            }
            else {
                throw new Error(`Unsupported filetype: ${filetype}`)
            }
        })
    })
})