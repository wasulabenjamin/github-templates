# Permissions Needed

This reference outlines the permissions required for common automation and templates in `github-templates`. It covers
GitHub token scopes, repository-level settings, and recommended least-privilege configurations for automation accounts.

## Overview

This reference details the permission requirements for all automated workflows, including repository access, secret
management, and environment protections.

## Repository Permission Levels

### Basic Permission Requirements

| Workflow                        | Minimum Permission | Why Required                              |
|---------------------------------|--------------------|-------------------------------------------|
| `stale.yml`                     | Write              | Close issues and PRs                      |
| `sync-labels.yml`               | Write              | Overwrites default labels with custom     |
| `lint-checks.yml`               | Read (or higher)   | Access source files for linting           |
| `run-tests.yml`                 | Read (or higher)   | Run tests, access test files              |
| `validate-branches.yml`         | Read (or higher)   | Read PRs sources                          |
| `auto-close-issues-develop.yml` | Read and Write     | Read repo files and close issues          |
| `update-changelog.yml`          | Write              | Update CHANGELOG.md file                  |
| `sync-main-to-develop.yml`      | Write              | push to `develop` changes from `main`     |
| `ci.yml`                        | Read (or higher)   | Checkout code, read repository contents   |
| `semantic-release.yml`          | Write              | Create tags, generate releases            |
| `deploy-netlify.yml`            | Write              | Deployment operations, environment access |

### Recommended Permission Model   

```yaml
# Example: Minimal permissions for CI workflow
permissions:
  contents: read
  pull-requests: write
  statuses: write
```

## GITHUB_TOKEN Permissions

### Default Token Permissions

GitHub provides a default `GITHUB_TOKEN` with these base permissions:

| Scope                 | Default    | Description                  |
|-----------------------|------------|------------------------------|
| `actions`             | read/write | Workflow and artifact access |
| `checks`              | read/write | Status checks                |
| `contents`            | read/write | Repository contents          |
| `deployments`         | read/write | Deployment status            |
| `issues`              | read/write | Issue management             |
| `packages`            | read/write | Package registry             |
| `pull-requests`       | read/write | PR operations                |
| `repository-projects` | read-only  | Project boards               |
| `security-events`     | read-only  | Security scanning            |
| `statuses`            | read/write | Commit statuses              |

### Workflow-Specific Token Configurations

#### `stale.yml` Workflow Permissions

```yaml
permissions:
  issues: write                        # Needed to comment, label, and close issues
  pull-requests: write                 # Needed to comment, label, and close PRs
```

#### `sync-labels.yml` Workflow Permissions

```yaml
permissions:
  issues: write                        # GitHub treats label management under the issues scope.
```

#### `lint-checks.yml` Workflow Permissions

```yaml
permissions:
  contents: read                       # Needed to read repository files.
  checks: write                        # Allows the workflow to report results directly to the GitHub Checks API.
```

#### `run-tests.yml` Workflow Permissions

```yaml
permissions:
  contents: read                       # Needed to read repository files.
  checks: write                        # Allows the workflow to report results directly to the GitHub Checks API.
```

#### `validate-branches.yml` Workflow Permissions

```yaml
permissions:
  pull-requests: read                  # Needed to read detailed PR metadata (branch names, repos, refs)
  contents: read                       # Needed to read repository files.
```

#### `update-changelog.yml` Workflow Permissions

```yaml
permissions:
  contents: write                      # Required for tagging and writing CHANGELOG.md
```

#### `sync-main-to-develop.yml` Workflow Permissions

```yaml
permissions:
  contents: write                      # Required for pushing to `develop` changes from `main`
```

#### `ci.yml` Workflow Permissions

```yaml
permissions:
  contents: read                       # Needed to read repository files.
  checks: write                        # Allows the workflow to report results directly to the GitHub Checks API.
  actions: write                       # Upload artifacts to Actions storage.
```

#### `semantic-release.yml` Workflow Permissions

```yaml
permissions:
  contents: write                      # Create releases and attach assets.
  packages: write                      # Publish to GitHub Packages (if used).
```

#### `deploy-netlify.yml` Workflow Permissions

```yaml
permissions:
  contents: read                       # Needed to read repository files.
```

## Repository Settings Requirements

### Actions Settings

**Required Settings**:
- ✅ Actions permissions: "Allow all actions"
- ✅ Fork pull request workflows: "Require approval"
- ✅ Workflow permissions: "Read and write permissions"

**Location**: Settings → Actions → General

### Branch Protection Rules

**Main and Develop Branch Protection Rules**:

Settings → Rules → Rulesets → New Ruleset → Import [ruleset](../../.github/BRANCH_PROTECTION_RULES.json)

### Environment Protections

**Production Environment**:
```yaml
# Settings → Environments → Production
- Required reviewers: [team-leads]
- Wait timer: 5 minutes
- Deployment branches: main only
```

## Required Secrets

### Deployment Secrets

| Secret                  | Workflow     | Purpose            | Example     |
|-------------------------|--------------|--------------------|-------------|
| `NETLIFY_TOKEN`         | `deploy.yml` | Netlify deployment | `def456...` |
| `VERCEL_TOKEN`          | `deploy.yml` | Vercel deployment  | `abc123...` |
| `SUPABASE_ACCESS_TOKEN` | `deploy.yml` | Supabase functions | `ghi789...` |
| `AWS_ACCESS_KEY_ID`     | `deploy.yml` | AWS deployment     | `AKIA...`   |
| `AWS_SECRET_ACCESS_KEY` | `deploy.yml` | AWS secret key     | `wJalr...`  |

### Package Publishing Secrets

| Secret         | Workflow      | Purpose                  | Example     |
|----------------|---------------|--------------------------|-------------|
| `NPM_TOKEN`    | `release.yml` | npm publishing           | `npm_...`   |
| `GITHUB_TOKEN` | All           | Built-in, auto-generated | (automatic) |

### External Service Secrets

| Secret              | Workflow | Purpose       | Example                       |
|---------------------|----------|---------------|-------------------------------|
| `SLACK_WEBHOOK_URL` | Various  | Notifications | `https://hooks.slack.com/...` |
| `DISCORD_WEBHOOK`   | Various  | Notifications | `https://discord.com/api/...` |

## Environment Variables

### Repository Variables

**Settings → Secrets and variables → Actions → Variables**

| Variable         | Purpose         | Example                   |
|------------------|-----------------|---------------------------|
| `NODE_VERSION`   | Node.js version | `18`                      |
| `PYTHON_VERSION` | Python version  | `3.11`                    |
| `API_BASE_URL`   | API endpoint    | `https://api.example.com` |

### Environment-Specific Variables

**Production Environment**:
```yaml
DEPLOY_URL: https://yourapp.com
LOG_LEVEL: warn
```

**Staging Environment**:
```yaml
DEPLOY_URL: https://staging.yourapp.com
LOG_LEVEL: debug
```

## Organization-Level Permissions

### Team Access Requirements

| Team            | Permission Level | Purpose                               |
|-----------------|------------------|---------------------------------------|
| `developers`    | Write            | Push to branches, create PRs          |
| `maintainers`   | Admin            | Manage settings, deploy to production |
| `devops`        | Admin            | Workflow management, secrets          |
| `documentation` | Read             | Documentation updates only            |

### Repository Creation Permissions

**Template Usage**:
- Users need "Write" access to create repositories from templates
- Organization owners can restrict template usage

## Self-Hosted Runner Requirements

### Runner Specifications

**Minimum Requirements**:
- 2 vCPU cores
- 4 GB RAM
- 10 GB storage
- Linux/Windows/macOS

### Runner Permissions

Runner registration token requires:
- Repository: read/write for a single repo
- Organization: read/write for all repos.

### Security Considerations

**Self-hosted runners should**:
- Use ephemeral runners when possible
- Isolate production runners
- Implement network restrictions
- Regularly update runner software

## API Rate Limiting

### GitHub API Limits

| Token Type            | Rate Limit          | Purpose             |
|-----------------------|---------------------|---------------------|
| `GITHUB_TOKEN`        | 1,000 requests/hour | Workflow operations |
| Personal Access Token | 5,000 requests/hour | Higher limit needs  |
| GitHub App            | 5,000 requests/hour | Integration needs   |

### Optimizing API Usage

```yaml
# Cache API responses when possible
- name: Cache API data
  uses: actions/cache@v3
  with:
    path: api-cache
    key: ${{ runner.os }}-api-${{ hashFiles('package.json') }}
```

## Security Best Practices

### Least Privilege Principle

```yaml
# Grant minimal necessary permissions
permissions:
  contents: read    # Instead, of write
  issues: read      # Instead, of write
```

### Secret Management

```yaml
# Never log secrets
- name: Deploy
  env:
    SECRET_KEY: ${{ secrets.DEPLOY_KEY }}
  run: |
    echo "Deploying..."  # OK
    echo "$SECRET_KEY"   # BAD - logs secret
    deploy --key $SECRET_KEY  # OK - passed to process
```

### Environment Protection

```yaml
# Protect production environment
deploy-production:
  environment: production
  if: github.ref == 'refs/heads/main'
```

## Troubleshooting Permission Issues

### Common Error Messages

**"Resource not accessible by integration"**
- Solution: Increase token permissions or use personal access token

**"Permission denied"**
- Solution: Check repository settings and branch protections

**"Secrets not found"**
- Solution: Verify secret names and repository access

### Debugging Steps

1. Check workflow permissions in YAML
2. Verify repository settings
3. Review branch protection rules
4. Check environment restrictions
5. Validate secret availability

### Permission Testing

```yaml
jobs:
  test-permissions:
    runs-on: ubuntu-latest
    steps:
      - name: Check repository access
        run: |
          gh repo view ${{ github.repository }} --json name
        env:
          GH_TOKEN: ${{ github.token }}
```

## Required GitHub App Permissions

If using GitHub Apps for enhanced permissions:

| App          | Permissions Needed | Purpose           |
|--------------|--------------------|-------------------|
| Dependabot   | Read & write       | Security updates  |
| CodeQL       | Read & write       | Security scanning |
| GitHub Pages | Read & write       | Site deployment   |

## Cross-Repository Permissions

### Accessing Other Repositories

```yaml
# Requires a personal access token with repo scope
- name: Access other repo
  env:
    PAT: ${{ secrets.PERSONAL_ACCESS_TOKEN }}
  run: |
    git clone https://$PAT@github.com/other-org/other-repo.git
```

### Organization-Wide Access

For organization-level workflows, additional permissions may be needed:

- `members: read` - Access organization members
- `organization: read` - Read organization data
- `projects: read` - Access organization projects

## Compliance and Auditing

### Permission Auditing

**Regular audits should check**:
- Unused secrets and variables
- Overly permissive tokens
- Unnecessary environment access
- Orphaned branch protection rules

### Access Logs

**Monitor via Organization Audit Log**:
- Workflow runs and failures
- Secret access patterns
- Permission changes
- Environment deployments

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
[getting-started]: ../USAGE_GUIDES/getting-started.md
[customizing-templates]: ../USAGE_GUIDES/customizing-templates.md
[workflow-explanations]: ../USAGE_GUIDES/workflow-explanations.md
[deployment-setup]: ../USAGE_GUIDES/deployment-setup.md
[template-fields]: ./template-fields.md
[workflow-triggers]: ./workflow-triggers.md
[permissions-needed]: ./permissions-needed.md
[troubleshooting]: ./troubleshooting.md
[issue-triage]: ../BEST_PRACTICES/issue-triage.md
[code-review-standards]: ../BEST_PRACTICES/code-review-standards.md
[release-management]: ../BEST_PRACTICES/release-management.md
[ROADMAP]: ../ROADMAP.md
[FAQ]: ../FAQ.md
[INTEGRATIONS]: ../INTEGRATIONS.md
