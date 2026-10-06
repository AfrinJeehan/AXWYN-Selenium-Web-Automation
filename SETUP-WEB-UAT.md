# AXWYN Web UAT Setup

This package is for the **AXWYN web application** only. It uses Selenium + Mocha + Chai + Mochawesome.

## 1. Install

```powershell
npm install
```

## 2. Configure your existing AXWYN login account

Copy `.env.example` to `.env`:

```powershell
Copy-Item .env.example .env
```

Set:

```env
TEST_LOGIN_EMAIL=<your existing AXWYN login email>
TEST_LOGIN_PASSWORD=<your existing AXWYN login password>
```

These values are used by normal authenticated web tests. They are intentionally not stored in the source code.

## 3. Public web tests first

```powershell
npm run validate
npm run test:public
```

This does not create accounts or make payments.

## 4. Existing-account authentication

```powershell
npm run test:login
```

This verifies the supplied QA account can sign in.

## 5. Protected web pages

```powershell
npm run test:protected
```

This covers Profile, Manage Profile, read-only contact fields and logout/security.

## 6. Registration and subscription tests

These require a separate approved test mailbox because they create new accounts and send verification email.

Set:

```env
RUN_MUTATING_TESTS=true
TEST_EMAIL_BASE=<real Outlook/Microsoft 365 QA mailbox>
EMAIL_VERIFICATION_MODE=manual
```

Do not use a made-up mailbox such as `axwyn.qa@yourcompany.com`.

## 7. Payment tests

Only run after the AXWYN UAT environment is approved for Stripe test transactions.

```powershell
npm run test:subscription
npm run test:payment
npm run test:plan-change
```

## 8. Full report

```powershell
npm run test:report
```

Reports are written to:

```text
reports/mochawesome/
reports/screenshots/
reports/page-sources/
```

## 9. Important current limitation

The AXWYN UAT URL could not be fetched from this execution environment, so the final selectors still require one local execution against the current UAT DOM. The framework has been hardened to avoid the previously identified false failures, but a truthful QA result requires running the suite on the actual UAT environment.
