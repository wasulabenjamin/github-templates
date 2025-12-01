# Troubleshooting Guide

Common issues, error messages, and solutions for the GitHub Templates repository setup and workflows.

## Quick Issue Index

| Symptom                  | Common Causes                        | Solution                                  |
| ------------------------ | ------------------------------------ | ----------------------------------------- |
| Workflows not triggering | Incorrect file paths, branch filters | Check `on:` configuration                 |
| Permission errors        | Insufficient GITHUB_TOKEN scopes     | Adjust `permissions:` in workflow         |
| Template not appearing   | Wrong directory structure            | Verify `.github/ISSUE_TEMPLATE/` location |
| Deployment failures      | Missing secrets, environment config  | Check environment settings and secrets    |
| Changelog not updating   | git-cliff configuration issues       | Validate `cliff.toml` syntax              |

## Workflow Issues

### Workflows Not Triggering

**Symptoms**:

- Workflows don't run on push/PR
- No status checks appear
- Workflow runs don't appear in the Actions tab

**Common Causes and Solutions**:

1. **Incorrect file location**

```bash
# Wrong location
workflows/ci.yml

# Correct location
.github/workflows/ci.yml
```

2. **Invalid YAML syntax**

```yaml
#file: noinspection YAMLDuplicatedKeys
# Error: Missing quotes
on: [ push, pull_request ]

# Correct: Proper list syntax
on:
push:
pull_request:
```

3. **Branch filter mismatches**

```markdown
# Only triggers on the exact 'main' branch

branches: [main]

# Also triggers on the 'main' branch

branches: [main]
```

4. **Path filter issues**

```yaml
# Only triggers when JS/TS files change
paths: ['**.js', '**.ts']

# Verify your changes match the patterns
```

**Debugging Steps**:

```yaml
# Add this job to debug triggers
debug-trigger:
  runs-on: ubuntu-latest
  if: always()
  steps:
    - name: Dump GitHub context
      run: echo '${{ toJson(github) }}'
```

### Workflow Permission Errors

**Error Messages**:

- `Resource not accessible by integration`
- `Permission denied`
- `API rate limit exceeded`

**Solutions**:

1. **Increase GITHUB_TOKEN permissions**:

```yaml
permissions:
  contents: write
  issues: write
  pull-requests: write
```

2. **Use personal access token for higher limits**:

```yaml
- name: Checkout
  uses: actions/checkout@v4
  with:
    token: ${{ secrets.PAT }}
```

3. **Check repository settings**:

- Settings → Actions → General
- Ensure "Allow all actions" is selected
- Verify workflow permissions

### Workflow Timing Out

**Symptoms**:

- Workflows run for 6 hours then cancel
- "This workflow run was canceled because it exceeded the maximum execution time"

**Solutions**:

1. **Optimize long-running jobs**:

```yaml
jobs:
  test:
    timeout-minutes: 30 # Set individual job timeout
```

2. **Split into multiple workflows**:

```yaml
# Separate linting from testing
lint-checks.yml - Fast feedback (2-3 minutes) run-tests.yml - Comprehensive testing (10-15 minutes)
```

3. **Use faster runners**:

```yaml
runs-on: ubuntu-latest-large # More resources
```

## Template Issues

### Issue Templates Not Appearing

**Symptoms**:

- "New issue" shows a blank template option only
- Custom templates don't appear in the dropdown

**Common Causes**:

1. **Incorrect directory structure**:

```bash
# Wrong
.github/issue_templates/bug_report.yml

# Correct
.github/ISSUE_TEMPLATE/bug_report.yml
```

2. **Invalid YAML syntax in templates**:

```yaml
# noinspection YAMLDuplicatedKeys
# Error: Missing required fields
name: Bug Report
# Missing description and body

# noinspection YAMLDuplicatedKeys
# Correct: All required fields
name: Bug Report
description: Report a bug or issue
body:
  - type: textarea
    id: description
```

3. **Config file issues**:

```yaml
# .github/ISSUE_TEMPLATE/config.yml
blank_issues_enabled: false # Force template use
contact_links:
  - name: Get Help
    url: https://github.com/org/repo/discussions
    about: Please ask and answer questions here.
```

**Validation Command**:

```bash
# Validate YAML syntax
python -c "import yaml; yaml.safe_load(open('.github/ISSUE_TEMPLATE/bug-report.yml'))"
```

### PR Templates Not Loading

**Symptoms**:

- PR description is empty
- Incorrect file name

**Solutions**:

1. **Verify directory structure**:

```bash
# Correct location + Name
.github/PULL_REQUEST_TEMPLATE.md
```

2. **Check template selection logic**:

- GitHub auto-selects based on changed files
- `code_change.md` - Default for code changes
- `documentation.md` - When only docs files change

3. **Manual template selection**:

```markdown
## Description

<!-- This template is for documentation changes -->
```

## Deployment Issues

### Vercel Deployment Failings

**Error Messages**:

- `Error: Deployment failed`
- `Missing Vercel token`

**Solutions**:

1. **Verify secrets are set**:

```bash
# Required secrets:
VERCEL_TOKEN
VERCEL_ORG_ID
VERCEL_PROJECT_ID
```

2. **Check Vercel project linkage**:

```bash
# Verify project exists and is connected
npx vercel projects
```

3. **Review Vercel configuration**:

```
{
  "version": 2,
  "builds": [
    {
      "src": "package.json",
      "use": "@vercel/static-build"
    }
  ]
}
```

### Netlify Deployment Issues

**Common Problems**:

1. **Missing build command**:

```toml
# netlify.toml
[build]
  command = "npm run build"
  publish = "dist"
```

2. **Incorrect site ID**:

```yaml
# Verify in Netlify dashboard
# Settings → Site details → Site information
```

3. **Build timeout**:

```toml
[build]
  command = "npm run build"
  publish = "dist"

[context.production.environment]
  NODE_VERSION = "18"
```

### Environment Deployment Blocks

**Symptoms**:

- Deployment stuck on "Waiting for protection to pass"
- Environment shows "Review required"

**Solutions**:

1. **Check environment protections**:

- Settings → Environments → [Environment Name]
- Review required reviewers
- Check deployment branches

2. **Approval workflows**:

```yaml
# Manual approval step
- name: Wait for approval
  uses: trstringer/manual-approval@v1
  with:
    secret: ${{ github.TOKEN }}
    approvers: user1,user2
```

## Changelog and Release Issues

### Changelog Not Updating

**Symptoms**:

- CHANGELOG.md remains empty
- git-cliff errors in the workflow

**Debugging Steps**:

1. **Verify cliff.toml configuration**:

```toml
[git]
conventional_commits = true
filter_unconventional = true
split_commits = false
commit_parsers = [
    { message = "^feat", group = "Features"},
    { message = "^fix", group = "Bug Fixes"},
]
```

2. **Check commit message conventions**:

```bash
# Good: Conventional commits
feat: add new authentication system
fix: resolve memory leak in cache

# Bad: Non-conventional
updated auth system
fixed stuff
```

3. **Test git-cliff locally**:

```bash
npx git-cliff --output TEST_CHANGELOG.md
```

### Release Versioning Problems

**Symptoms**:

- Wrong version tags created
- Release workflow fails on version detection

**Solutions**:

1. **Check semantic commit messages**:

```bash
# Version bump types:
feat:      # Minor version (0.1.0 → 0.2.0)
fix:       # Patch version (0.1.0 → 0.1.1)
feat!:     # Major version (0.1.0 → 1.0.0)
```

2. **Verify version detection**:

```yaml
- name: Debug version detection
  run: |
    echo "Last commit: ${{ github.event.head_commit.message }}"
```

## Performance Issues

### Slow Workflow Execution

**Optimization Strategies**:

1. **Implement caching**:

```yaml
- name: Cache node modules
  uses: actions/cache@v3
  with:
    path: node_modules
    key: ${{ runner.os }}-node-${{ hashFiles('package-lock.json') }}
```

2. **Use faster runners**:

```yaml
runs-on: ubuntu-latest-large
```

3. **Parallelize jobs**:

```yaml
jobs:
  lint:
    # Fast feedback
  test-unit:
    # Core tests
  test-integration:
    # Slower tests
    needs: [lint, test-unit]
```

### API Rate Limiting

**Symptoms**:

- `API rate limit exceeded`
- Workflows fail on GitHub API calls

**Solutions**:

1. **Use GITHUB_TOKEN efficiently**:

```yaml
permissions:
  contents: read # Minimal permissions
```

2. **Implement request caching**:

```yaml
- name: Cache API responses
  uses: actions/cache@v3
```

3. **Use personal access token**:

```yaml
- name: Checkout
  uses: actions/checkout@v4
  with:
    token: ${{ secrets.PAT }}
```

## Security Issues

### Secret Exposure Concerns

**Prevention Measures**:

1. **Never log secrets**:

```yaml
- name: Safe secret usage
  env:
    TOKEN: ${{ secrets.API_TOKEN }}
  run: |
    echo "Deploying..."  # OK
    echo "$TOKEN"        # BAD - exposes secret
    curl -H "Authorization: $TOKEN" https://api.example.com
```

2. **Use secret masking**:

```yaml
# GitHub automatically masks secrets in logs
```

3. **Regular secret rotation**:

- Rotate tokens every 90 days
- Remove unused secrets

### Permission Security

**Best Practices**:

1. **Least privilege principle**:

```yaml
permissions:
  contents: read # Instead, of write
  issues: read # Instead, of write
```

2. **Environment protections**:

```yaml
environment:
  name: production
  url: https://yourapp.com
```

## Network and Connectivity

### Download Timeouts

**Symptoms**:

- `Connection timeout`
- `Download failed`

**Solutions**:

1. **Increase timeout**:

```yaml
- name: Download with retry
  run: |
    n=0
    until [ "$n" -ge 3 ]
    do
      curl -O https://example.com/file && break
      n=$((n+1))
      sleep 10
    done
```

2. **Use mirrors**:

```yaml
- name: Setup Node
  uses: actions/setup-node@v4
  with:
    node-version: '18'
    cache: 'npm'
```

### Self-Hosted Runner Issues

**Common Problems**:

1. **Runner offline**:

```bash
# Check runner status
sudo systemctl status actions.runner.*

# Restart runner
sudo systemctl restart actions.runner.*
```

2. **Network restrictions**:

- Ensure outbound access to GitHub
- Check firewall rules
- Verify proxy settings

## Debugging Techniques

### Workflow Log Analysis

1. **Enable step debugging**:

```yaml
# Set secret: ACTIONS_STEP_DEBUG = true
# Settings → Secrets and variables → Actions
```

2. **Add debug steps**:

```yaml
- name: Debug information
  run: |
    echo "Event: ${{ github.event_name }}"
    echo "Ref: ${{ github.ref }}"
    echo "Actor: ${{ github.actor }}"
```

3. **Check workflow raw logs**:

- Actions → [Workflow run] → Download logs

### Local Testing

1. **Test actions locally**:

```bash
# Using act (Linux/Mac/WSL)
act -P ubuntu-latest=node:18-buster-slim
```

2. **Validate YAML syntax**:

```bash
yamllint .github/workflows/*.yml
```

3. **Check template rendering**:

- Create test issues/PRs in a fork first

## Getting Help

### Gathering Information

When seeking help, include:

1. **Workflow run ID**
2. **Error messages and logs**
3. **Repository configuration**
4. **Steps to reproduce**

### Community Resources

- GitHub Community Discussions
- GitHub Actions Documentation
- Template repository issues

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
