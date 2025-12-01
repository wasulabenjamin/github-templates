# Integrations Guide

Comprehensive guide to third-party services, tools, and platforms that integrate with the GitHub Templates repository
setup.

## Overview

This project integrates with various development tools, deployment platforms, and monitoring services to provide a
complete development ecosystem. Each integration is designed to work seamlessly with the provided workflows and
templates.

## CI/CD Platform Integrations

### GitHub Actions Ecosystem

#### Official GitHub Actions

**Core Actions Used**:

```yaml
- uses: actions/checkout@v4 # Repository checkout
- uses: actions/setup-node@v4 # Node.js environment
- uses: actions/cache@v3 # Dependency caching
- uses: actions/upload-artifact@v3 # Build artifacts
- uses: actions/download-artifact@v3
```

**Authentication Actions**:

```yaml
- uses: aws-actions/configure-aws-credentials@v1
- uses: google-github-actions/auth@v1
- uses: azure/login@v1
```

#### Community Actions

**Testing & Quality**:

```yaml
- uses: reviewdog/action-eslint@v1
- uses: peaceiris/actions-hugo@v2
- uses: jakejarvis/s3-sync-action@v0
```

**Deployment**:

```yaml
- uses: amondnet/vercel-action@v20
- uses: netlify/actions/cli@master
- uses: burnett01/rsync-deployments@v5
```

### Alternative CI/CD Platforms

While optimized for GitHub Actions, the templates can work with:

| Platform         | Compatibility | Setup Notes                        |
| ---------------- | ------------- | ---------------------------------- |
| **GitLab CI**    | ⚠️ Partial    | Convert YAML to GitLab syntax      |
| **CircleCI**     | ⚠️ Partial    | Use orbs for similar functionality |
| **Jenkins**      | ⚠️ Partial    | Jenkinsfile conversion needed      |
| **Azure DevOps** | ✅ Good       | Similar YAML pipeline structure    |

## Deployment Platforms

### Static Site Hosting

#### Netlify Integration

**Configuration** (`netlify.toml`):

```toml
[build]
  command = "npm run build"
  publish = "dist"

[build.environment]
  NODE_VERSION = "18"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

**Workflow Setup**:

```yaml
- name: Deploy to Netlify
  uses: netlify/actions/cli@master
  env:
    NETLIFY_AUTH_TOKEN: ${{ secrets.NETLIFY_TOKEN }}
    NETLIFY_SITE_ID: ${{ secrets.NETLIFY_SITE_ID }}
```

#### Vercel Integration

**Configuration** (`vercel.json`):

```json
{
  "version": 2,
  "builds": [
    {
      "src": "package.json",
      "use": "@vercel/static-build",
      "config": {
        "distDir": "dist"
      }
    }
  ],
  "routes": [
    {
      "src": "/(.*)",
      "dest": "/dist/$1"
    }
  ]
}
```

**Workflow Integration**:

```yaml
- name: Deploy to Vercel
  uses: amondnet/vercel-action@v20
  with:
    vercel-token: ${{ secrets.VERCEL_TOKEN }}
    vercel-org-id: ${{ secrets.VERCEL_ORG_ID }}
    vercel-project-id: ${{ secrets.VERCEL_PROJECT_ID }}
```

### Serverless Platforms

#### Supabase Edge Functions

**Configuration**:

```yaml
- name: Deploy to Supabase
  run: |
    npx supabase functions deploy your-function \
      --project-ref ${{ secrets.SUPABASE_PROJECT_ID }}
  env:
    SUPABASE_ACCESS_TOKEN: ${{ secrets.SUPABASE_ACCESS_TOKEN }}
```

#### AWS Lambda

**Serverless Framework**:

```yaml
- name: Deploy to AWS Lambda
  run: |
    npx serverless deploy --stage production
  env:
    AWS_ACCESS_KEY_ID: ${{ secrets.AWS_ACCESS_KEY_ID }}
    AWS_SECRET_ACCESS_KEY: ${{ secrets.AWS_SECRET_ACCESS_KEY }}
```

### Container Platforms

#### Docker Hub

**Container Publishing**:

```yaml
- name: Build and push Docker image
  uses: docker/build-push-action@v4
  with:
    push: true
    tags: |
      user/app:latest
      user/app:${{ github.sha }}
```

#### Kubernetes

**Helm Deployment**:

```yaml
- name: Deploy to Kubernetes
  run: |
    helm upgrade --install my-app ./charts/my-app \
      --namespace production \
      --set image.tag=${{ github.sha }}
```

## Monitoring & Observability

### Application Monitoring

#### Sentry Integration

**Error Tracking**:

```yaml
- name: Create Sentry release
  uses: getsentry/action-release@v1
  env:
    SENTRY_AUTH_TOKEN: ${{ secrets.SENTRY_AUTH_TOKEN }}
    SENTRY_ORG: my-org
    SENTRY_PROJECT: my-project
  with:
    environment: production
    sourcemaps: ./dist
```

**Workflow Integration**:

```yaml
- name: Upload source maps
  run: |
    npx @sentry/cli releases files ${{ github.sha }} \
      upload-sourcemaps ./dist --url-prefix '~/dist/'
```

#### Datadog Integration

**Metrics and Logs**:

```yaml
- name: Send deployment event
  uses: DataDog/deployment-tracker-action@v1
  with:
    api-key: ${{ secrets.DATADOG_API_KEY }}
    application: 'my-app'
    version: ${{ github.sha }}
    environment: 'production'
```

### Performance Monitoring

#### Lighthouse CI

**Performance Testing**:

```yaml
- name: Run Lighthouse CI
  run: |
    npm install -g @lhci/cli
    lhci autorun
  env:
    LHCI_GITHUB_APP_TOKEN: ${{ secrets.LHCI_GITHUB_APP_TOKEN }}
```

**Configuration** (`.lighthouserc.js`):

```javascript
module.exports = {
  ci: {
    collect: {
      startServerCommand: 'npm run start',
      url: ['http://localhost:3000'],
    },
    assert: {
      assertions: {
        'categories:performance': ['warn', { minScore: 0.8 }],
        'categories:accessibility': ['error', { minScore: 0.9 }],
      },
    },
    upload: {
      target: 'temporary-public-storage',
    },
  },
};
```

## Testing Services

### Test Automation

#### Playwright Integration

**E2E Testing**:

```yaml
- name: Install Playwright
  run: npx playwright install

- name: Run Playwright tests
  run: npx playwright test
```

**Configuration** (`playwright.config.js`):

```javascript
module.exports = {
  use: {
    baseURL: process.env.CI ? 'http://localhost:3000' : 'http://localhost:3000',
    trace: 'on-first-retry',
  },
  webServer: {
    command: 'npm run start',
    port: 3000,
    reuseExistingServer: !process.env.CI,
  },
};
```

#### Cypress Integration

**Alternative E2E Testing**:

```yaml
- name: Run Cypress tests
  uses: cypress-io/github-action@v5
  with:
    start: npm start
    wait-on: 'http://localhost:3000'
```

### API Testing

#### Postman/Newman

**API Test Automation**:

```yaml
- name: Run API tests
  run: |
    npm install -g newman
    newman run collections/api-tests.json \
      --environment environments/production.json
```

## Security Tools

### Code Security

#### Snyk Integration

**Vulnerability Scanning**:

```yaml
- name: Run Snyk security scan
  uses: snyk/actions/node@v2
  env:
    SNYK_TOKEN: ${{ secrets.SNYK_TOKEN }}
  with:
    args: --severity-threshold=high
```

#### GitHub CodeQL

**Static Analysis**:

```yaml
- name: Initialize CodeQL
  uses: github/codeql-action/init@v2
  with:
    languages: javascript, typescript

- name: Perform CodeQL Analysis
  uses: github/codeql-action/analyze@v2
```

### Secret Scanning

#### GitGuardian

**Secret Detection**:

```yaml
- name: GitGuardian scan
  uses: GitGuardian/gg-shield-action@master
  env:
    GITGUARDIAN_API_KEY: ${{ secrets.GITGUARDIAN_API_KEY }}
```

## Communication Tools

### Notification Services

#### Slack Integration

**Deployment Notifications**:

```yaml
- name: Notify Slack
  uses: 8398a7/action-slack@v3
  with:
    status: ${{ job.status }}
    text: Deployment of ${{ github.repository }} completed
    webhook_url: ${{ secrets.SLACK_WEBHOOK_URL }}
```

**Custom Messages**:

```yaml
- name: Custom Slack message
  uses: slackapi/slack-github-action@v1.23.0
  with:
    channel-id: 'C1234567'
    slack-message: 'New deployment to production'
  env:
    SLACK_BOT_TOKEN: ${{ secrets.SLACK_BOT_TOKEN }}
```

#### Discord Integration

**Community Notifications**:

```yaml
- name: Discord notification
  uses: sarisia/actions-status-discord@v1
  with:
    webhook: ${{ secrets.DISCORD_WEBHOOK }}
    status: ${{ job.status }}
    title: 'Deployment Status'
```

### Status Pages

#### GitHub Pages

**Documentation Hosting**:

```yaml
- name: Deploy to GitHub Pages
  uses: peaceiris/actions-gh-pages@v3
  with:
    github_token: ${{ secrets.GITHUB_TOKEN }}
    publish_dir: ./docs
```

## Database Services

### Database Migrations

#### Prisma Integration

**Database Schema Management**:

```yaml
- name: Run database migrations
  run: |
    npx prisma migrate deploy
  env:
    DATABASE_URL: ${{ secrets.DATABASE_URL }}
```

#### Liquibase/Flyway

**Alternative Migrations**:

```yaml
- name: Database migrations
  run: |
    ./gradlew flywayMigrate
    # or
    liquibase update
```

### Database Backups

#### Automated Backups

**Pre-deployment Backup**:

```yaml
- name: Backup database
  run: |
    pg_dump $DATABASE_URL > backup_$(date +%Y%m%d).sql
    # Upload to cloud storage
  env:
    DATABASE_URL: ${{ secrets.DATABASE_URL }}
```

## Content Management

### Headless CMS

#### Strapi Integration

**Content Deployment**:

```yaml
- name: Deploy Strapi
  run: |
    npm run strapi build
    npm run strapi deploy
```

#### Contentful

**Content Sync**:

```yaml
- name: Sync Contentful
  run: |
    npx contentful space export \
      --space-id ${{ secrets.CONTENTFUL_SPACE_ID }} \
      --management-token ${{ secrets.CONTENTFUL_MANAGEMENT_TOKEN }}
```

## Development Tools

### IDE Integration

#### VS Code

**Settings Configuration** (`.vscode/settings.json`):

```json
{
  "eslint.workingDirectories": ["."],
  "prettier.requireConfig": true,
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  }
}
```

#### JetBrains IDEs

**Configuration Files**:

- `.idea/codeStyles/` - Code style settings
- `.idea/inspectionProfiles/` - Inspection profiles

### Package Managers

#### npm Registry

**Package Publishing**:

```yaml
- name: Publish to npm
  run: |
    npm publish
  env:
    NODE_AUTH_TOKEN: ${{ secrets.NPM_TOKEN }}
```

#### GitHub Packages

**Registry Publishing**:

```yaml
- name: Publish to GitHub Packages
  run: |
    npm publish
  env:
    NODE_AUTH_TOKEN: ${{ secrets.GITHUB_TOKEN }}
```

## Analytics Services

### Web Analytics

#### Google Analytics

**Tracking Deployment**:

```yaml
- name: Update analytics configuration
  run: |
    # Update tracking IDs or configurations
    echo "GA4_PROPERTY=${{ secrets.GA4_PROPERTY }}" >> .env.production
```

#### Plausible Analytics

**Alternative Analytics**:

```yaml
- name: Configure Plausible
  run: |
    echo "PLAUSIBLE_DOMAIN=yourapp.com" >> .env.production
```

## Payment & E-commerce

### Stripe Integration

**Payment Processing**:

```yaml
- name: Run Stripe tests
  env:
    STRIPE_SECRET_KEY: ${{ secrets.STRIPE_TEST_SECRET }}
  run: |
    npm run test:stripe
```

## Custom Integrations

### Webhook Triggers

**Generic Webhook Support**:

```yaml
- name: Trigger external webhook
  run: |
    curl -X POST \
      -H "Content-Type: application/json" \
      -d '{"event":"deployment","status":"success"}' \
      ${{ secrets.DEPLOYMENT_WEBHOOK_URL }}
```

### Custom API Integrations

**REST API Calls**:

```yaml
- name: Update external service
  run: |
    curl -X PATCH \
      -H "Authorization: Bearer ${{ secrets.API_TOKEN }}" \
      -H "Content-Type: application/json" \
      -d '{"version":"${{ github.sha }}"}' \
      https://api.external-service.com/deployments
```

## Integration Testing

### Testing Integrations

**Mock Services for Testing**:

```yaml
- name: Test with mocked services
  run: |
    # Start mock servers
    npm run test:integration
  env:
    API_BASE_URL: http://localhost:3001
    DATABASE_URL: postgresql://test:test@localhost:5432/test
```

### Integration Health Checks

**Post-deployment Verification**:

```yaml
- name: Verify integrations
  run: |
    ./scripts/verify-integrations.sh
```

## Configuration Management

### Environment-specific Configs

**Multi-environment Setup**:

```yaml
- name: Deploy with environment config
  run: |
    cp .env.${{ inputs.environment }} .env
    npm run deploy
```

### Secret Management

**External Secret Providers**:

```yaml
- name: Fetch secrets from external provider
  run: |
    # Example with AWS Secrets Manager
    aws secretsmanager get-secret-value \
      --secret-id my-app/secrets \
      --query SecretString --output text > .env
```

## See Also

- [USAGE_GUIDES/getting-started.md][getting-started]
- [USAGE_GUIDES/customizing-templates.md][customizing-templates]
- [USAGE_GUIDES/workflow-explanations.md][workflow-explanations]
- [USAGE_GUIDES/deployment-setup.md][deployment-setup]
- [REFERENCE/template-fields.md][template-fields]
- [REFERENCE/workflow-triggers.md][workflow-triggers]
- [REFERENCE/permissions-needed.md][permissions-needed]
- [REFERENCE/troubleshooting.md][troubleshooting]
- [BEST_PRACTICES/issue-triage.md][issue-triage]
- [BEST_PRACTICES/code-review-standards.md][code-review-standards]
- [BEST_PRACTICES/release-management.md][release-management]
- [ROADMAP.md][ROADMAP]
- [FAQ.md][FAQ]
- [INTEGRATIONS.md][INTEGRATIONS]

<!--
As you might notice, I'm using markdown "reference style" links for readability.
https://www.markdownguide.org/basic-syntax/
-->

[getting-started]: ./USAGE_GUIDES/getting-started.md
[customizing-templates]: ./USAGE_GUIDES/customizing-templates.md
[workflow-explanations]: ./USAGE_GUIDES/workflow-explanations.md
[deployment-setup]: ./USAGE_GUIDES/deployment-setup.md
[template-fields]: ./REFERENCE/template-fields.md
[workflow-triggers]: ./REFERENCE/workflow-triggers.md
[permissions-needed]: ./REFERENCE/permissions-needed.md
[troubleshooting]: ./REFERENCE/troubleshooting.md
[issue-triage]: ./BEST_PRACTICES/issue-triage.md
[code-review-standards]: ./BEST_PRACTICES/code-review-standards.md
[release-management]: ./BEST_PRACTICES/release-management.md
[ROADMAP]: ./ROADMAP.md
[FAQ]: ./FAQ.md
[INTEGRATIONS]: ./INTEGRATIONS.md
