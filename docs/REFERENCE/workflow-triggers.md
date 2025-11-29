# Workflow Triggers

This reference describes common GitHub Actions triggers used across the `github-templates` repository and explains when
to use each trigger type.

## Trigger types and use-cases

- `push` — Run on commits to specified branches or tags. Use for CI and release tagging.
- `pull_request` — Run checks for pull requests. Use to validate code before merge.
- `workflow_dispatch` — Manual trigger for adhoc runs or maintenance tasks.
- `workflow_call` — Makes a workflow reusable; consumed by `uses:` in another workflow.
- `schedule` — Cron-based runs for periodic jobs (e.g., dependency updates).
- `repository_dispatch` — Trigger across repos via API for custom automation.

## Event-Based Triggers

### Push Events

Trigger workflows when commits are pushed to specific branches or paths.

**Example:** `push` on tags for releases:

```yaml
on:
  push:
    tags:
      - 'v*.*.*'
```

**Common Patterns**:

| Scenario                 | Configuration                 |
| ------------------------ | ----------------------------- |
| Main branch only         | `branches: [ main ]`          |
| Feature branches         | `branches: [ 'feature/**' ]`  |
| All branches except main | `branches-ignore: [ main ]`   |
| Code changes only        | `paths: [ 'src/**' ]`         |
| Ignore documentation     | `paths-ignore: [ 'docs/**' ]` |

### Pull Request Events

Trigger workflows when pull request activity occurs.

**Example:** `pull_request` on specified branches:

```yaml
on:
  pull_request: # Runs when someone opens or updates a pull request targeting these branches.
    types: [opened, synchronize, reopened]
    branches: [main, develop] # Remove the 'develop' branch reference if it doesn't exist
    branches-ignore: ['dependabot/**']
    paths: ['src/**']
    paths-ignore: ['docs/**']
```

**PR Event Types**:

| Type               | Description         | Common Use         |
| ------------------ | ------------------- | ------------------ |
| `opened`           | New PR created      | Initial CI checks  |
| `synchronize`      | New commits pushed  | Re-run tests       |
| `reopened`         | Closed PR reopened  | Verify still valid |
| `closed`           | PR merged or closed | Cleanup tasks      |
| `labeled`          | Label added         | Triage workflows   |
| `review_requested` | Review requested    | Notify reviewers   |

### Caller

Defines another workflow as part of a current workflow.

```yaml
jobs: # Defines all the major automated tasks GitHub will run
  lint: # Defines a lint job called as part of CI.
    name: Calling lint.yml... # Gives the job a human-readable name which appears in GitHub’s “Actions” UI.
    uses: ./.github/workflows/lint-checks.yml # Calls an external lint workflow file
```

### Workflow Call or Dispatch

Defines a reusable workflow:

**Example:** Allows `workflow_call` or `workflow_dispatch`

```yaml
on:
  workflow_call: # Allows other workflows to call this one
    inputs:
      node-version:
        required: false
        default: '18'

  workflow_dispatch: # Allows manual runs in GitHub’s “Actions” UI.
    inputs:
      environment:
        description: 'Deployment environment'
        required: true
        default: 'staging'
        type: choice
        options:
          - staging
          - production
      force-redeploy:
        description: 'Force redeployment'
        required: false
        type: boolean
```

**Input Types**:

- `string`: Text input
- `choice`: Dropdown selection
- `boolean`: Checkbox
- `environment`: Environment selection

### Schedule Events

Execute workflows on a cron schedule.

```yaml
on:
  schedule: # Automates daily checks.
    - cron: '0 5 * * *' # Runs daily at 08:00AM (EAT, UTC+3)
```

**Cron Syntax**:

```bash
* * * * *
│ │ │ │ │
│ │ │ │ └───── Day of the week (0 - 6, Sunday to Saturday)
│ │ │ └─────── Month (1 - 12)
│ │ └───────── Day of the month (1 - 31)
│ └─────────── Hour (0 - 23)
└───────────── Minute (0 - 59)
```

**Common Schedules**:

| Purpose        | Cron           | Description                                  |
| -------------- | -------------- | -------------------------------------------- |
| Daily cleanup  | `30 5 * * *`   | Daily at 08:30AM (EAT, UTC+3)                |
| Weekly reports | `30 5 * * 0`   | Every Sunday at 08:30AM (EAT, UTC+3)         |
| Business hours | `30 5 * * 1-5` | Monday to Friday at 08:30AM (EAT, UTC+3)     |
| Quarterly      | `30 5 1 */3 *` | First day of quarter at 08:30AM (EAT, UTC+3) |

### Repository Dispatch

Trigger from external events via GitHub API.

```yaml
on:
  repository_dispatch:
    types: [deployment-request, cache-clear]
```

`repository_dispatch` sample to trigger from another repo or system:

```bash
curl -X POST -H "Accept: application/vnd.github+json" \
  -H "Authorization: token $PAT" \
  https://api.github.com/repos/your-org/target-repo/dispatches \
  -d '{"event_type":"update-templates"}'
```

## Workflow-Specific Triggers

### Lint Workflow (`lint-checks.yml`)

```yaml
on: # Defines the triggers that cause this workflow to run.
  pull_request: # Runs when someone opens or updates a pull request targeting these branches.
    branches: [main, develop] # Remove the 'develop' branch reference if it doesn't exist
    paths: # Only run when the below-listed folders or file types change.
      - 'src/**' # Source code directories
      - '**.{js,ts,jsx,tsx,vue}' # All code files
      - '**.{json,yml,yaml}' # Config files
      - '.eslintrc.*' # Lint configs
      - '.prettierrc.*'
      - 'vite.config.*' # Build tool config
      - 'vue.config.*' # Vue-specific config
  push: # Runs when code is pushed or merged from PR directly to these branches.
    branches-ignore: [] # Flexible branch triggers — automatically runs on any branch.
    paths: # Only run when the below-listed folders or file types change.
      - 'src/**' # Source code directories
      - '**.{js,ts,jsx,tsx,vue}' # All code files
      - '**.{json,yml,yaml}' # Config files
      - '.eslintrc.*' # Lint configs
      - '.prettierrc.*'
      - 'vite.config.*' # Build tool config
      - 'vue.config.*' # Vue-specific config
```

**Purpose**: Fast feedback on code style

**When**: Only run when source files and specified files change on specified branches.

### Test Workflow (`run-tests.yml`)

```yaml
on: # Defines the triggers that cause this workflow to run.
  pull_request: # Runs when someone opens or updates a pull request targeting these branches.
    branches: [main, develop] # Remove the 'develop' branch reference if it doesn't exist
    paths: # Only run when the below-listed folders or file types change
      - 'src/**' # Source code directories
      - 'tests/**' # Test files
      - '**.{test,spec}.{js,ts}' # Test files
      - 'package.json' # Dependency changes
  push: # Runs when code is pushed or merged from PR directly to these branches.
    branches: ['**'] # Flexible branch triggers — automatically runs on any branch.
    paths: # Only run when the below-listed folders or file types change
      - 'src/**' # Source code directories
      - 'tests/**' # Test files
      - '**.{test,spec}.{js,ts}' # Test files
      - 'package.json' # Dependency changes
```

**Purpose**: Comprehensive testing

**When**: Run when code or tests change on specified branches.

### Changelog Workflow (`update-changelog.yml`)

```yaml
on: # Defines the triggers that cause this workflow to run.
  push: # Runs when code is pushed or merged from PR directly to these branches.
    branches: [main]
    paths-ignore: # Prevents changelog runs on doc-only edits.
      - '.github/**'
      - 'docs/**'
      - '**.md'
```

**Purpose**: Keep changelog updated

**When**: Automatically on `main` branch update when the release is published or edited.

### CI Workflow (`ci.yml`)

```yaml
on: # Defines the triggers that cause this workflow to run.
  pull_request: # Runs when someone opens or updates a pull request targeting these branches.
    branches: [main, develop] # Remove the 'develop' branch reference if it doesn't exist
  push: # Runs when code is pushed or merged from PR directly to these branches.
    branches: [develop] # Remove the 'develop' branch reference if it doesn't exist
  workflow_run: # Trigger when the changelog workflow completes
    workflows: ['📄 Auto Update Changelog']
    branches: [main] # Only run when changelog completed on the main branch
    types: [completed]
```

**Purpose**: Ensure code quality, tests and successful builds before merging

**When**: Run on all code changes to `main` and `develop` branches.

### Deploy Workflow (`deploy-netlify.yml`)

```yaml
on: # Defines the triggers that cause this workflow to run.
  workflow_run:
    workflows: ['📦 Continuous Integration']
    branches: [main] # Only run when CI completed on the main branch
    types: [completed]
```

**Purpose**: Deploy to various environments

**When**: Run on `main` after `ci` workflow.

### Release Workflow (`semantic-release.yml`)

```yaml
on: # Defines the triggers that cause this workflow to run.
  workflow_run:
    workflows: ['📦 Continuous Integration']
    branches: [main] # Only run when CI completed on the main branch
    types: [completed]
```

**Purpose**: Create releases and version tags

**When**: Run on `main` after `ci` workflow.

### Stale Workflow (`stale.yml`)

```yaml
on: # Defines the triggers that cause this workflow to run.
  schedule: # Automates daily checks.
    - cron: '30 5 * * 1-5' # Runs Monday to Friday at 08:30AM (EAT, UTC+3)
  workflow_dispatch: # Allows for manual cleanup in GitHub’s “Actions” UI.
```

**Purpose**: Clean up stale issues and PRs

**When**: Scheduled maintenance with manual override.

## Advanced Trigger Conditions

### Multiple Event Types

```yaml
on:
  push:
    branches: [main]
  pull_request:
    branches: [main]
  schedule:
    - cron: '0 0 * * 0'
  workflow_dispatch:
```

### Complex Branch Patterns

```yaml
on:
  push:
    branches:
      - main
      - develop
      - 'feature/**'
      - 'hotfix/**'
    branches-ignore:
      - 'dependabot/**'
      - 'renovate/**'
```

### Path-Based Filtering

```yaml
on:
  push:
    paths:
      - 'src/**'
      - 'package.json'
      - '**.config.js'
    paths-ignore:
      - 'src/**/*.test.js'
      - 'docs/**'
      - '**.md'
```

### Conditional Execution with `if`

```yaml
jobs:
  deploy:
    if: |
      github.event_name == 'push' && 
      github.ref == 'refs/heads/main' &&
      !contains(github.event.head_commit.message, '[skip ci]')
```

## Environment-Specific Triggers

### Staging Deployments

```yaml
deploy-staging:
  if: github.ref == 'refs/heads/develop'
  environment: staging
```

### Production Deployments

```yaml
deploy-production:
  if: github.ref == 'refs/heads/main'
  environment: production
```

### Pre-release Testing

```yaml
test-prerelease:
  if: startsWith(github.ref, 'refs/tags/v')
  runs-on: ubuntu-latest
```

## Skip Conditions

### Skip CI Commit Messages

```yaml
jobs:
  build:
    if: "!contains(github.event.head_commit.message, '[skip ci]')"
```

### Skip for Dependabot

```yaml
jobs:
  test:
    if: github.actor != 'dependabot[bot]'
```

### Skip for Documentation

```yaml
jobs:
  deploy:
    if: |
      github.event_name == 'push' &&
      !contains(github.event.commits[0].message, '[docs]')
```

## Webhook Events Context

### Push Event Context

```yaml
# Available in push events
github.event_name       # 'push'
github.ref              # 'refs/heads/main'
github.head_ref         # null for push
github.base_ref         # null for push
github.event.commits    # Array of commits
```

### Pull Request Context

```yaml
# Available in pull_request events
github.event_name            # 'pull_request'
github.ref                   # 'refs/pull/123/merge'
github.head_ref              # 'feature-branch'
github.base_ref              # 'main'
github.event.pull_request    # PR details
```

### Schedule Event Context

```yaml
# Available in schedule events
github.event_name  # 'schedule'
github.schedule    # '0 2 * * 1-5'
```

## Performance Considerations

### Minimizing Unnecessary Runs

```yaml
# Only run when source code changes
on:
  push:
    paths:
      - 'src/**'
      - 'package.json'
      - '**.config.js'
    paths-ignore:
      - '**.md'
      - 'docs/**'
      - 'images/**'
```

### Using Path Filters Effectively

```yaml
#file: noinspection YAMLDuplicatedKeys
# Good: Specific paths
paths: [ 'src/**', 'package.json' ]

# Avoid: Too broad
paths: [ '**' ]

# Avoid: Too narrow
paths: [ 'src/app/components/Button.jsx' ]
```

### Optimizing Schedule Frequency

```yaml
# Appropriate frequencies
stale-issues: '0 2 * * *' # Daily
security-scan: '0 0 * * 0' # Weekly
backup: '0 0 1 * *' # Monthly
cleanup: '0 0 * * 0' # Weekly


# Avoid excessive schedules
# Don't: '*/5 * * * *' (every 5 minutes)
```

## Security Considerations

### Protecting Sensitive Workflows

```yaml
# Only allow from specific sources
on:
  workflow_dispatch: # Manual only
  push:
    branches: [main] # Main branch only
```

### Environment Protection

```yaml
deploy-production:
  environment:
    name: production
    url: https://yourapp.com
  if: github.ref == 'refs/heads/main'
```

## Debugging Trigger Issues

### Common Problems and Solutions

**Workflow not triggering?**

- Check YAML syntax
- Verify branch names match exactly
- Check path patterns are correct
- Ensure workflow file is in `.github/workflows/`

**Unexpected triggers?**

- Review path patterns
- Check branch patterns
- Verify event types

**Schedule not running?**

- Confirm cron syntax
- Check UTC timezone
- Verify repository activity

### Debugging with `github` Context

```yaml
jobs:
  debug:
    runs-on: ubuntu-latest
    steps:
      - name: Dump GitHub context
        env:
          GITHUB_CONTEXT: ${{ toJson(github) }}
        run: echo "$GITHUB_CONTEXT"
```

## Best practices for triggers

- Avoid running expensive jobs on every `push`. Use `paths` and `paths-ignore` to limit triggers.
- Use `workflow_call` for common CI logic to avoid duplication.
- Prefer `workflow_dispatch` for manual administrative tasks.
- Use `schedule` sparingly; make sure it is compliant with rate limits and cost considerations.

Example limiting CI to code changes under `src/`:

```yaml
on:
  push:
    paths:
      - 'src/**'
      - '.github/**'
```

## Security considerations

- Runs triggered by `repository_dispatch` or webhooks may run with lower privileges; vet the source of events.
- Workflows triggered by `workflow_call` should validate inputs; do not run privileged actions on untrusted input.
- Avoid exposing secrets to workflows triggered by forks or untrusted contributors. Use `if` conditions to gate secrets
  usage:

```yaml
if: github.repository == 'your-org/allowed-repo'
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
