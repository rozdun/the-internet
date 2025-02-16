import { test as base, expect } from "@playwright/test"


enum DIALOG_RESPONSE {
    Accept,
    Dismiss
}

class JavaScriptAlertsPage {
    readonly page;
    readonly result;
    readonly jsAlertButton;
    readonly jsConfirmButton;
    readonly jsPromptButton;
    
    constructor(page) {
        this.page = page;
        this.result = this.page.locator('#result');
        this.jsAlertButton = this.page.getByRole('button', { name: 'Click for JS Alert' });
        this.jsConfirmButton = this.page.getByRole('button', { name: 'Click for JS Confirm' });
        this.jsPromptButton = this.page.getByRole('button', { name: 'Click for JS Prompt' });
    }
    
    
    async goto() {
        await this.page.goto("/javascript_alerts")
        await expect(this.page.getByRole("heading", { name: "JavaScript Alerts" })).toBeVisible()
    }
    
    async handleAlertDialog() {
        this.page.on('dialog', async dialog => {
            const alertText = dialog.message()
            expect(alertText).toBe('I am a JS Alert')
            
            await dialog.accept()
        })
    }

    async handleConfirmDialog(dialogResponse: DIALOG_RESPONSE) {
        this.page.on('dialog', async dialog => {
            const alertText = dialog.message()
            expect(alertText).toBe('I am a JS Confirm')
            
            if (dialogResponse === DIALOG_RESPONSE.Dismiss)
                await dialog.dismiss()
            else
                await dialog.accept()
        })
    }

    async handlePromptDialog(dialogResponse: DIALOG_RESPONSE, responseString?: string) {
        this.page.on('dialog', async dialog => {
            const alertText = dialog.message()
            expect(alertText).toBe('I am a JS prompt')
            
            if (dialogResponse === DIALOG_RESPONSE.Dismiss)
                await dialog.dismiss()
            else
            if (responseString != null)
                await dialog.accept(responseString)
            else
                await dialog.accept()
        })
    }
}


const test = base.extend<{jsAlertsPage: JavaScriptAlertsPage}>({
    jsAlertsPage: async ({page}, use) => {
        const jsAlertsPage = new JavaScriptAlertsPage(page)
        await jsAlertsPage.goto()
        await use(jsAlertsPage)
    }
})


test.describe('JavaScript Alerts', () => {
    
    test("JavaScript Alert", async ({ jsAlertsPage }) => {
        await jsAlertsPage.handleAlertDialog()
        await jsAlertsPage.jsAlertButton.click()
        await expect(jsAlertsPage.result).toHaveText('You successfully clicked an alert')
    })
    
    
    test("JavaScript Confirm - Cancel", async ({ jsAlertsPage }) => {
        await jsAlertsPage.handleConfirmDialog(DIALOG_RESPONSE.Dismiss)
        await jsAlertsPage.jsConfirmButton.click()
        await expect(jsAlertsPage.result).toHaveText('You clicked: Cancel')
    })
    
    test("JavaScript Confirm - Accept", async ({ jsAlertsPage }) => {
        await jsAlertsPage.handleConfirmDialog(DIALOG_RESPONSE.Accept)
        await jsAlertsPage.jsConfirmButton.click()
        await expect(jsAlertsPage.result).toHaveText('You clicked: Ok')
    })
    
    
    test("JavaScript Prompt - Cancel", async ({ jsAlertsPage }) => {
        await jsAlertsPage.handlePromptDialog(DIALOG_RESPONSE.Dismiss)
        await jsAlertsPage.jsPromptButton.click()
        await expect(jsAlertsPage.result).toHaveText('You entered: null')
    })
    
    test("JavaScript Prompt - Accept", async ({ jsAlertsPage }) => {
        const promptText = 'random text'
        await jsAlertsPage.handlePromptDialog(DIALOG_RESPONSE.Accept, promptText)
        await jsAlertsPage.jsPromptButton.click()
        await expect(jsAlertsPage.result).toHaveText(`You entered: ${promptText}`)
    })
})