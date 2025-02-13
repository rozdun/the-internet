import { test, expect } from "@playwright/test"

test("File Upload", async ({ page }) => {
    await page.goto("/upload")
    await expect(page.getByRole("heading", { name: "File Uploader" })).toBeVisible()
    
    const uploadButton = page.getByRole('button', { name: 'Upload' })
    await page.setInputFiles('#file-upload', process.cwd() + '/tests/test-data/file-upload.txt')
    await uploadButton.click()
    
    await expect(page.getByRole("heading", { name: "File Uploaded!" })).toBeVisible()
    await expect(page.locator("#uploaded-files", { hasText: "file-upload.txt" })).toBeVisible()
})