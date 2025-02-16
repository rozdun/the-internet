import { test, expect, FrameLocator } from "@playwright/test"


async function expectFrameContent(frame: FrameLocator, text: string) {
    if (frame)
        await expect(frame.locator('html')).toHaveText(text)
    else
        throw new Error(`${text} frame not found`)
}

test("Nested Frames", async ({ page }) => {
    await page.goto("/nested_frames")
    
    const topFrame = page.locator('frame[name="frame-top"]').contentFrame().locator('html')
    const leftFrame = topFrame.locator('frame[name="frame-left"]').contentFrame()
    const middleFrame = topFrame.locator('frame[name="frame-middle"]').contentFrame()
    const rightFrame = topFrame.locator('frame[name="frame-right"]').contentFrame()
    const bottomFrame = page.locator('frame[name="frame-bottom"]').contentFrame()
    
    await expectFrameContent(leftFrame, 'LEFT')
    await expectFrameContent(middleFrame, 'MIDDLE')
    await expectFrameContent(rightFrame, 'RIGHT')
    await expectFrameContent(bottomFrame, 'BOTTOM')
})