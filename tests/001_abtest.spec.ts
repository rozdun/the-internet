import { test, expect } from '@playwright/test'

test('A/B Test', async ({ page, context, baseURL }) => {
    
    const versions = [
        {
            cookie: '%7B%22298349752%22%3A%22298343790%22%7D',
            expectedText: 'A/B Test Variation 1',
        },
        {
            cookie: '%7B%22298349752%22%3A%22298291000%22%7D',
            expectedText: 'A/B Test Control',
        },
    ]
    
    // Extract domain from baseURL
    if (!baseURL) { throw new Error('baseURL is not defined') }
    const url = new URL(baseURL)
    const domain = url.hostname
    
    // Loop through versions
    for (const version of versions) {
        await context.clearCookies()
        await context.addCookies([
            {
                name: 'optimizelyBuckets',
                value: version.cookie,
                domain: domain,
                path: '/'
            }
        ])
        
        await page.goto('/abtest')
        await expect(page.getByRole('heading', { name: version.expectedText })).toBeVisible()
    }
})
