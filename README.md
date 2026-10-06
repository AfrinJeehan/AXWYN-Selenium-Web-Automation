# AXWYN Selenium Web Automation — Corrected v2.1.0

This is the **AXWYN web application** automation project. It is intentionally separate from mobile-app testing.

## Stack

- Selenium WebDriver
- Node.js
- Mocha
- Chai / Node assertions
- Mochawesome
- Chrome by default

## Important correction from the previous version

Authenticated web tests no longer create a fresh user just to verify login/profile/logout behavior.

The framework now separates:

1. **Existing QA account tests** — login, profile, Manage Profile, protected routes, logout.
2. **Registration tests** — create a new account and verify email.
3. **Mutating subscription/payment tests** — create test accounts and exercise Stripe test payments.

This prevents one registration/mailbox problem from cascading into the entire authenticated web suite.

## Configuration

Copy `.env.example` to `.env`.

For your existing AXWYN web account, set:

```env
TEST_LOGIN_EMAIL=<your AXWYN login email>
TEST_LOGIN_PASSWORD=<your AXWYN login password>
```

Do not hard-code the password in test files.

For registration tests, `TEST_EMAIL_BASE` must be a real approved Outlook/Microsoft 365 QA mailbox. It is separate from the existing login account configuration.

## Recommended run order

```powershell
npm install
npm run validate
npm run test:public
npm run test:login
npm run test:protected
```

Only after those work should you enable mutating tests:

```env
RUN_MUTATING_TESTS=true
```

Then run:

```powershell
npm run test:subscription
npm run test:payment
npm run test:plan-change
npm run test:report
```

## Coverage

The suite covers:

- Home and public navigation
- About and Features
- Pricing
- Contact
- Footer / Terms / Privacy
- External app-store links
- Registration and validation
- Sign-in and invalid credentials
- Remember Me
- Password visibility
- Existing QA account login
- Profile and Manage Profile
- Email/mobile read-only fields
- Logout and protected-page behavior
- Subscription flows for six plan/billing combinations
- Payment history
- Plan changes
- Negative Stripe payment scenarios
- Basic performance timing

## Known limitations

The UAT host could not be fetched from the current execution environment, so live selector verification was not possible here. JavaScript syntax was statically checked. The remaining live validation must be run locally against the current AXWYN UAT deployment.
