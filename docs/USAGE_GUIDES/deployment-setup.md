# Deployment Setup

Comprehensive guide for configuring automated deployment to various platforms including Vercel, Netlify, Supabase Edge 
Functions, and traditional hosting services.

## Overview

The deployment workflow `deploy.yml` supports **Netlify** as its main deployment targets with zero-downtime
deployments, environment-specific configurations, and rollback capabilities.

## Platform-Specific Configuration

### Netlify Deployment

#### Prerequisites
- Netlify account
- Site configured in Netlify dashboard
- Netlify CLI access token

#### Setup Steps

1. **Generate Netlify Token**
- Go to [Netlify User Settings](https://app.netlify.com/user/applications#personal-access-tokens)
- Click "New access token"
- Copy the generated token

2. **Get Site ID**
- Go to your site settings in Netlify
- Under "Site Information," copy the API ID

3. **Configure Secrets**
  ```yaml
  NETLIFY_TOKEN: your_netlify_token
  NETLIFY_SITE_ID: your_site_id
  ```

#### Netlify Configuration

```toml
# netlify.toml
[build]
  command = "npm run build"
  publish = "dist"

[build.environment]
  NODE_VERSION = "20.0.0"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

#### Workflow Integration

```yaml
- name: Deploy to Netlify
  uses: netlify/actions/cli@master
  env:
    NETLIFY_AUTH_TOKEN: ${{ secrets.NETLIFY_TOKEN }}
    NETLIFY_SITE_ID: ${{ secrets.NETLIFY_SITE_ID }}
  with:
    args: deploy --prod --dir=dist
```

### Vercel Deployment

#### Prerequisites
- Vercel account
- Vercel project connected to your repository
- Vercel token for authentication

#### Setup Steps

1. **Create Vercel Token**
- Go to [Vercel Dashboard](https://vercel.com/account/tokens)
- Click "Create" and name your token
- Copy the generated token

2. **Configure Repository Secrets**
  ```yaml
  # Required secrets for Vercel
  VERCEL_TOKEN: your_vercel_token
  VERCEL_ORG_ID: your_organization_id
  VERCEL_PROJECT_ID: your_project_id
```

3. **Vercel Configuration File** (`vercel.json`)
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

#### Workflow Configuration

```yaml
- name: Deploy to Vercel
  uses: amondnet/vercel-action@v20
  with:
    vercel-token: ${{ secrets.VERCEL_TOKEN }}
    vercel-org-id: ${{ secrets.VERCEL_ORG_ID }}
    vercel-project-id: ${{ secrets.VERCEL_PROJECT_ID }}
    vercel-args: '--prod'
    working-directory: ./
```

### Supabase Edge Functions

#### Prerequisites
- Supabase project
- Supabase CLI installed
- Edge functions configured

#### Configuration

1. **Supabase Configuration** (`supabase/config.toml`)
  ```toml
  [api]
  project_id = "your-project-id"
   
  [auth]
  site_url = "https://your-project.supabase.co"
  ```

2. **Secrets Setup**
  ```yaml
  SUPABASE_ACCESS_TOKEN: your_supabase_token
  SUPABASE_PROJECT_ID: your_project_id
  ```

3. **Deployment Script**
  ```yaml
  - name: Deploy Edge Functions
    run: |
      npx supabase functions deploy your-function --project-ref ${{ secrets.SUPABASE_PROJECT_ID }}
    env:
      SUPABASE_ACCESS_TOKEN: ${{ secrets.SUPABASE_ACCESS_TOKEN }}
  ```

### Traditional Hosting (SSH/SFTP)

#### SSH Deployment Setup

```yaml
- name: Deploy via SSH
  uses: appleboy/ssh-action@v0.1.3
  with:
    host: ${{ secrets.HOST }}
    username: ${{ secrets.USERNAME }}
    key: ${{ secrets.SSH_KEY }}
    script: |
      cd /var/www/your-project
      git pull origin main
      npm install --production
      npm run build
      sudo systemctl restart your-service
```

#### RSync Deployment

```yaml
- name: Deploy via RSync
  run: |
    rsync -avz \
      --exclude='node_modules' \
      --exclude='.git' \
      ./ \
      ${{ secrets.DEPLOY_USER }}@${{ secrets.DEPLOY_HOST }}:/var/www/your-project/
```

## Environment-Specific Deployments

### Staging Environment

Deploys from `develop` branch to staging environment:

```yaml
deploy-staging:
  name: Deploy to Staging
  if: github.ref == 'refs/heads/develop'
  environment: staging
  runs-on: ubuntu-latest
  
  steps:
    - name: Deploy
      run: |
        # Staging-specific deployment commands
        echo "Deploying to staging..."
```

### Production Environment

Deploys from `main` branch with additional checks:

```yaml
deploy-production:
  name: Deploy to Production
  if: github.ref == 'refs/heads/main'
  environment: production
  runs-on: ubuntu-latest
  
  steps:
    - name: Verify tests passed
      run: |
        # Check if all required workflows passed
        echo "Verifying CI status..."
    
    - name: Create backup
      run: |
        # Backup current production
        echo "Creating backup..."
    
    - name: Deploy to production
      run: |
        # Production deployment commands
        echo "Deploying to production..."
```

## Deployment Strategies

### Blue-Green Deployment

```yaml
- name: Blue-Green Deployment
  run: |
    # Deploy to green environment
    deploy-to-green
    
    # Run smoke tests
    run-smoke-tests --environment green
    
    # Switch traffic
    switch-traffic --from blue --to green
    
    # Keep blue for rollback
    keep-blue-for-rollback --hours 2
```

### Canary Deployment

```yaml
- name: Canary Deployment
  run: |
    # Deploy to 10% of servers
    deploy-canary --percentage 10
    
    # Monitor metrics
    sleep 300  # Wait 5 minutes
    check-metrics --environment canary
    
    # Full deployment if metrics are good
    if [ $? -eq 0 ]; then
      deploy-full
      remove-canary
    else
      rollback-canary
      exit 1
    fi
```

## Database Migrations

### Safe Migration Practices

```yaml
- name: Database Migration
  run: |
    # Backup database before migration
    backup-database --name pre-deployment-backup
    
    # Run migrations in transaction
    run-migrations --safe --transaction
    
    # Verify migration success
    verify-migration --check-data-integrity
    
    # Rollback on failure
    if [ $? -ne 0 ]; then
      rollback-migration
      exit 1
    fi
```

### Zero-Downtime Migrations

```sql
-- noinspection SqlNoDataSourceInspectionForFile
-- Example safe migration
ALTER TABLE users
  ADD COLUMN IF NOT EXISTS new_column VARCHAR (255);
UPDATE users
SET new_column = 'default'
WHERE new_column IS NULL;
```

## Monitoring and Rollbacks

### Health Checks

```yaml
- name: Health Check
  run: |
    # Wait for deployment to be ready
    sleep 30
    
    # Perform health check
    response=$(curl -s -o /dev/null -w "%{http_code}" https://your-app.vercel.app/health)
    
    if [ "$response" -ne 200 ]; then
      echo "Health check failed: $response"
      exit 1
    fi
    
    echo "Health check passed"
```

### Automated Rollback

```yaml
- name: Rollback on Failure
  if: failure()
  run: |
    # Trigger rollback workflow
    curl -X POST \
      -H "Authorization: token ${{ secrets.GITHUB_TOKEN }}" \
      -H "Accept: application/vnd.github.v3+json" \
      https://api.github.com/repos/${{ github.repository }}/actions/workflows/rollback.yml/dispatches \
      -d '{"ref":"main"}'
```

## Security Considerations

### Secret Management

```yaml
# Never hardcode secrets
- name: Secure Deployment
  env:
    DEPLOY_KEY: ${{ secrets.DEPLOYMENT_KEY }}
    API_URL: ${{ vars.API_URL }}
  run: |
    deploy --key $DEPLOY_KEY --api $API_URL
```

### Permission Scoping

```yaml
permissions:
  contents: read
  deployments: write
  statuses: write
```

## Performance Optimization

### Build Caching

```yaml
- name: Cache build dependencies
  uses: actions/cache@v3
  with:
    path: |
      node_modules
      .next/cache
      .cache
    key: ${{ runner.os }}-build-${{ hashFiles('package-lock.json') }}
```

### Parallel Deployments

```yaml
deploy-frontend:
  name: Deploy Frontend
  # ... frontend deployment steps

deploy-backend:
  name: Deploy Backend
  # ... backend deployment steps

deploy-assets:
  name: Deploy Assets
  # ... assets deployment steps
```

## Troubleshooting Common Issues

### Deployment Timeouts

```yaml
# Increase timeout for large deployments
- name: Deploy with timeout
  run: |
    timeout 1800 deploy-command  # 30 minute timeout
```

### Insufficient Resources

```yaml
# Use larger runner for resource-intensive deployments
runs-on: ubuntu-latest-large  # or self-hosted runner
```

### Network Issues

```yaml
# Retry on network failures
- name: Deploy with retry
  run: |
    n=0
    until [ "$n" -ge 3 ]
    do
       deploy-command && break
       n=$((n+1))
       sleep 15
    done
```

## Tips

- Restrict deployment triggers to `main` or release tags.
- Include a post-deploy check using `curl` or Playwright tests.
- Store environment configs in `.env.production` and reference in build steps.

## See Also

* [USAGE_GUIDES/getting-started.md][getting-started]
* [USAGE_GUIDES/customizing-templates.md][customizing-templates]
* [USAGE_GUIDES/workflow-explanations.md][workflow-explanations]
* [USAGE_GUIDES/deployment-setup.md][deployment-setup]
* [REFERENCE/template-fields.md][template-fields]
* [REFERENCE/workflow-triggers.md][workflow-triggers]
* [REFERENCE/permissions-needed.md][permissions-needed]
* [REFERENCE/troubleshooting.md][troubleshooting]
* [BEST_PRACTICES/issue-triage.md][issue-triage]
* [BEST_PRACTICES/code-review-standards.md][code-review-standards]
* [BEST_PRACTICES/release-management.md][release-management]
* [ROADMAP.md][ROADMAP]
* [FAQ.md][FAQ]
* [INTEGRATIONS.md][INTEGRATIONS]

<!--
As you might notice, I'm using markdown "reference style" links for readability.
https://www.markdownguide.org/basic-syntax/
-->
[getting-started]: ./getting-started.md
[customizing-templates]: ./customizing-templates.md
[workflow-explanations]: ./workflow-explanations.md
[deployment-setup]: ./deployment-setup.md
[template-fields]: ../REFERENCE/template-fields.md
[workflow-triggers]: ../REFERENCE/workflow-triggers.md
[permissions-needed]: ../REFERENCE/permissions-needed.md
[troubleshooting]: ../REFERENCE/troubleshooting.md
[issue-triage]: ../BEST_PRACTICES/issue-triage.md
[code-review-standards]: ../BEST_PRACTICES/code-review-standards.md
[release-management]: ../BEST_PRACTICES/release-management.md
[ROADMAP]: ../ROADMAP.md
[FAQ]: ../FAQ.md
[INTEGRATIONS]: ../INTEGRATIONS.md
