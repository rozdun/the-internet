import { test, expect } from '@playwright/test'

const url = '/basic_auth'

test('Basic Auth', async ({ browser }) => {
    const context = await browser.newContext({
        httpCredentials: {
          username: 'admin',
          password: 'admin',
        }
    })
    const newPage = await context.newPage();
    await newPage.goto(url)
    
    await expect(newPage.getByRole('heading', { name: 'Basic Auth' })).toBeVisible()
    await newPage.close()
})


test('Basic Auth - Negative', async ({ browser }) => {
    const context = await browser.newContext({
        httpCredentials: {
          username: 'incorrect',
          password: 'incorrect',
        }
    })
    const newPage = await context.newPage();
    await newPage.goto(url)
    
    await expect(newPage.locator('text="Not authorized"')).toBeVisible()
    await newPage.close()
})