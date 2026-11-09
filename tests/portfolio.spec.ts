import { test, expect } from '@playwright/test';
import path from 'path';

test('Verify Sunil Kumar Reddy Portfolio migration and responsive layouts', async ({ page }) => {
  const consoleErrors: string[] = [];
  page.on('console', msg => {
    if (msg.type() === 'error') {
      consoleErrors.push(msg.text());
    }
  });
  page.on('pageerror', err => {
    consoleErrors.push(err.toString());
  });

  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto('http://localhost:3001/', { waitUntil: 'domcontentloaded' });

  // 1. Check Preloader screenshot
  await page.screenshot({ path: 'screenshots/01_sunil_preloader.png' });

  // Wait for preloader animation to finish
  await page.waitForTimeout(2500);

  // 2. Check title
  await expect(page).toHaveTitle(/Sunil Kumar Reddy/);

  // 3. Check hero headline
  const headline = page.locator('#headline');
  await expect(headline).toContainText('Design, develop, deliver.');

  // 4. Check profile name
  const nameEl = page.locator('.profile .name');
  await expect(nameEl).toHaveText('Sunil Kumar Reddy');

  // 5. Check avatar loaded
  const avatar = page.locator('.profile .avatar img');
  await expect(avatar).toHaveAttribute('src', '/images/sunil-profile.jpg');

  // 6. Check About bullets
  const aboutBullets = page.locator('.bullets li');
  await expect(aboutBullets).toHaveCount(3);
  await expect(aboutBullets.first()).toContainText('Sunil Kumar Reddy');

  // 7. Check Live Tools
  const toolCards = page.locator('#toolGrid .card');
  await expect(toolCards).toHaveCount(4);
  await expect(toolCards.first()).toContainText('Karyotica Labs');

  // 8. Capture desktop full page
  await page.screenshot({ path: 'screenshots/02_sunil_desktop_fullpage.png', fullPage: true });

  // 9. Expand Case Study
  const caseToggle = page.locator('.study-toggle-btn').first();
  await caseToggle.click();
  await page.waitForTimeout(400);
  const csDrawer = page.locator('.case-study-drawer');
  await expect(csDrawer).toBeVisible();
  await expect(csDrawer).toContainText('Design and frontend work by Sunil');
  await page.screenshot({ path: 'screenshots/03_sunil_case_study_expanded.png' });

  // 10. Check Experience section
  const expSection = page.locator('#experience');
  await expect(expSection).toBeVisible();
  await expect(expSection).toContainText('TekWissen Software Pvt. Ltd.');
  await expect(expSection).toContainText('Independent Freelance Projects');
  await expect(expSection).toContainText('Intexm Media Private Limited');

  // Expand Experience key responsibilities
  const expToggle = page.locator('.exp-toggle-btn').first();
  await expToggle.click();
  await page.waitForTimeout(300);
  await expect(page.locator('.exp-bullet-list').first()).toBeVisible();

  // 11. Check Freelance Clients
  const clientsSection = page.locator('#clients');
  await expect(clientsSection).toBeVisible();
  await expect(clientsSection).toContainText('Student Care');
  await expect(clientsSection).toContainText('Quanthex');
  await expect(clientsSection).toContainText('Nortiqa');

  // 12. Check Skills & Toolkit
  const skillsSection = page.locator('#skills');
  await expect(skillsSection).toBeVisible();
  await expect(skillsSection).toContainText('Figma');
  await expect(skillsSection).toContainText('React');
  await expect(skillsSection).toContainText('Graphic Design & Visual Communication');

  // 13. Check Education & Credentials
  const eduSection = page.locator('#education');
  await expect(eduSection).toBeVisible();
  await expect(eduSection).toContainText('Sanketika Institute of Technology and Management');

  // 14. Check Writing
  const writingSection = page.locator('#writing');
  await expect(writingSection).toBeVisible();
  await expect(writingSection).toContainText('In Preparation');

  // 15. Check GitHub
  const ghSection = page.locator('#github');
  await expect(ghSection).toBeVisible();
  await expect(ghSection).toContainText('@sunilkumar029');

  // 16. Check Contact & Footer
  const contactSection = page.locator('#contact');
  await expect(contactSection).toContainText('vsunilkumarvzg@gmail.com');

  const footer = page.locator('footer.credits');
  await expect(footer).toContainText('Sunil Kumar Reddy');
  await expect(footer).toContainText('Visakhapatnam');

  // 17. Mobile Viewport Test
  await page.setViewportSize({ width: 390, height: 844 });
  await page.waitForTimeout(500);
  await page.screenshot({ path: 'screenshots/04_sunil_mobile_fullpage.png', fullPage: true });

  // 18. Zero console errors
  expect(consoleErrors).toEqual([]);
});
