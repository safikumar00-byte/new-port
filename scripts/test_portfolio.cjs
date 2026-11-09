const { chromium } = require('playwright');
const path = require('path');
const fs = require('fs');

async function run() {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    viewport: { width: 1440, height: 900 }
  });
  const page = await context.newPage();

  const consoleErrors = [];
  page.on('console', msg => {
    if (msg.type() === 'error') {
      consoleErrors.push(msg.text());
    }
  });
  page.on('pageerror', err => {
    consoleErrors.push(err.toString());
  });

  const outDir = path.join(__dirname, '..', 'screenshots');
  if (!fs.existsSync(outDir)) {
    fs.mkdirSync(outDir, { recursive: true });
  }

  console.log('Navigating to http://localhost:3001/...');
  await page.goto('http://localhost:3001/', { waitUntil: 'domcontentloaded' });

  // 1. Capture preloader
  await page.screenshot({ path: path.join(outDir, '01_sunil_preloader.png') });
  console.log('Captured preloader screenshot');

  // Wait for preloader to finish (preloader takes ~1.5 - 2s)
  await page.waitForTimeout(2500);

  // 2. Check title and headline
  const title = await page.title();
  console.log('Page title:', title);

  const heroHeadline = await page.textContent('#headline');
  console.log('Hero headline:', heroHeadline);

  const profileName = await page.textContent('.profile .name');
  console.log('Profile name:', profileName);

  // Capture desktop full page
  await page.screenshot({ path: path.join(outDir, '02_sunil_desktop_fullpage.png'), fullPage: true });
  console.log('Captured full desktop page');

  // 3. Test Case Study expansion
  const caseDetailBtn = await page.$('.study-toggle-btn');
  if (caseDetailBtn) {
    await caseDetailBtn.click();
    await page.waitForTimeout(300);
    console.log('Clicked case study expand');
    await page.screenshot({ path: path.join(outDir, '03_sunil_case_study_expanded.png') });
  }

  // 4. Test Experience highlights expansion
  const expToggleBtn = await page.$('.exp-toggle-btn');
  if (expToggleBtn) {
    await expToggleBtn.click();
    await page.waitForTimeout(200);
    console.log('Expanded experience key responsibilities');
  }

  // 5. Test Skills tab click
  const skillTabs = await page.$$('.skill-tab-btn');
  if (skillTabs.length > 1) {
    await skillTabs[1].click();
    await page.waitForTimeout(200);
    console.log('Clicked UI/UX skill tab');
  }

  // 6. Test Mobile viewport
  await page.setViewportSize({ width: 390, height: 844 });
  await page.waitForTimeout(400);
  await page.screenshot({ path: path.join(outDir, '04_sunil_mobile_fullpage.png'), fullPage: true });
  console.log('Captured mobile fullpage screenshot');

  await browser.close();

  console.log('--- TEST SUMMARY ---');
  console.log('Console / Page Errors:', consoleErrors.length);
  if (consoleErrors.length > 0) {
    consoleErrors.forEach(e => console.log('Error:', e));
  } else {
    console.log('All tests passed with 0 runtime errors!');
  }
}

run().catch(err => {
  console.error('Test execution failed:', err);
  process.exit(1);
});
