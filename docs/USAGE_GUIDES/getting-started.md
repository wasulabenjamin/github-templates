# Getting Started

This guide explains how to adopt the `github-templates` repository to bootstrap a production-ready GitHub repository
layout for open-source projects and internal teams. It covers the minimal steps to install the templates, integrate the
workflows, and validate that CI / lint / release automation are wired correctly.

> Audience: repository maintainers and engineering managers who want a reliable, consistent GitHub setup that includes
> issue & PR templates, CI checks, release automation, and deployment hooks.

## Goals of this repository

- Provide standardized ISSUE and PULL REQUEST templates for predictable contribution signals.
- Ship GitHub Actions workflows for CI, linting, testing, changelog generation, release tagging, and deployment.
- Include community files (CODE_OF_CONDUCT, CONTRIBUTING, CODEOWNERS) to reduce onboarding friction.
- Be modular and configurable — maintainers can selectively enable/disable parts.

## Prerequisites

Before getting started, ensure you have:

- A GitHub repository (new or existing)
- Owner or maintainer permissions for the repository
- Basic familiarity with GitHub Actions and Markdown

## Overview

The `github-templates` project provides a preconfigured `.github/` directory containing:

- Issue templates for bug reports, features, documentation, and security reports.
- Pull request templates for code and documentation contributions.
- GitHub Actions workflows for CI, linting, testing, changelog, and deployments.

By following this guide, you’ll be able to integrate these templates into your project in under 5 minutes.

## Quickstart

### Step 1. **Clone** the `github-templates` repository and copy template files `.github`

Copy the `.github` directory from this template repository to your project's root directory:

```powershell
# Clones the repo into the current directory
git clone https://github.com/your-username/github-templates.git

# Copy the .github directory to your project
cp -r github-templates/.github/ <your-project>/.github/    # Or simply copy manually the `.github` folder (RECOMMENDED)
```

### Step 2: Configure Repository Settings

1. Navigate to your repository on GitHub
2. Go to **Settings** → **General**
3. Scroll to **Features** and ensure these are enabled:

- ✅ Issues
- ✅ Pull requests
- ✅ Discussions (optional but recommended)

4. Ensure GitHub Actions are enabled under **Settings > Actions**.
5. Grant workflows the required permissions. See [REFERENCE/permissions-needed.md][permissions-needed]
6. Optionally enable branch protection for `main` and require status checks. See
   [BEST_PRACTICES/release-management.md][release-management]

### Step 3: Set Up GitHub Actions Secrets

For workflows that require deployment or external services, configure secrets in **Settings** → **Secrets and
variables** → **Actions**:

| Secret Name     | Description              | Required For         |
| --------------- | ------------------------ | -------------------- |
| `NETLIFY_TOKEN` | Netlify deployment token | `deploy-netlify.yml` |
| `VERCEL_TOKEN`  | Vercel deployment token  | `deploy-vercel.yml`  |
| `NPM_TOKEN`     | npm publish token        | `release.yml`        |

### Step 4: Verify Initial Setup

1. Create a test issue to verify templates are working
2. Open a fake pull request to check PR templates
3. Push a commit to trigger initial CI workflows

## Template Structure Overview

Your repository should now contain:

```bash
.github/                           # GitHub workflows, templates & contribution guidelines
├── ISSUE_TEMPLATE/                # Predefined GitHub issue templates
│   ├── bug_report.yml             # Template for bug reports
│   ├── config.yml                 # Provides other contact links
│   ├── documentation.yml          # Template for documentation issues
│   ├── feature_request.yml        # Template for feature requests
│   └── security.yml               # Template for security issues
│
├── PULL_REQUEST_TEMPLATE/         # Directory for custom templates
│   ├── bugfix.md                  # Bugfix Pull Request
│   ├── documentation.md           # Documentation Pull Request
│   ├── feature.md                 # Feature Pull Request
│   ├── hotfix.md                  # Hotfix Pull Request
│   └── release.md                 # Release Pull Request
│
├── workflows/                     # Predefined GitHub workflows
│   ├── ci.yml                     # Ensures build + lint + test pass on PRs
│   ├── deploy-netlify.yml         # Auto-deploys to target host on merge or push to `main`
│   ├── lint-checks.yml            # Runs ESLint + Prettier independently - on push & PR for quick feedback
│   ├── pr-issue-handler.yml       # A smart Issues and PRs handler
│   ├── run-tests.yml              # Runs Vitest/Playwright suites - Keeps CI cleanly separated; may run parallel
│   ├── semantic-release.yml       # Generates changelog + semantic version tag
│   ├── sync-labels.yml            # Overwrites GitHub labels with our defined LABELS.yml
│   ├── sync-main-to develop.yml   # Automatically syncs main changes to develop
│   ├── update-changelog.yml       # Generate CHANGELOG.md file with git-cliff
│   └── validate-branches.yml      # Helper for main branch rules to accept merges from only release/* or hotfix/*
│
├── BRANCH_PROTECTION_RULES.json   # Branch rulesets for `main` and `develop`
├── CODE_OF_CONDUCT.md             # Community guidelines
├── CODEOWNERS                     # Defines ownership and auto-review assignment rules
├── CONTRIBUTING.md                # Contribution rules & setup
├── DEVELOPMENT_WORKFLOW.md        # Defines how branches are organized and how commits are structured
├── LABELS.yml                     # Defines our own labels
└── PULL_REQUEST_TEMPLATE.md       # Default template (always loaded by GitHub UI)
```

## Testing Your Setup

### Test Issue Templates

1. Go to your repository's **Issues** tab
2. Click **New issue**
3. Verify you see multiple template options:

- 🐛 Bug Report
- 📝 Documentation Update
- ✨ Feature Request
- 🛡️ Security Vulnerability

### Test Workflow Automation

1. Make a small change to your codebase
2. Create a pull request
3. Observe that:

- PR template pre-fills the description based on your contribution type: `code_change.md` or `documentation.md`.
- Required status checks appear
- CI workflow runs automatically. Each GitHub Action under `.github/workflows/` automates part of the development
  lifecycle. Use:

  ```powershell
  # Lists all workflows
  gh workflow list

  # Then manually trigger a workflow (e.g., labels)
  gh workflow run labels.yml
  ```

## How templates are wired

- Issue templates placed under `.github/ISSUE_TEMPLATE/` are automatically offered to contributors.
- The `PULL_REQUEST_TEMPLATE.md` provides single default PR template.
- `CODEOWNERS` controls auto-requesting reviewers and enforcing ownership for protected branches.

## Customization Checklist

After initial setup, customize these elements for your project:

- [ ] Verify Template Configuration.
- [ ] Update `CONTRIBUTING.md` with project-specific guidelines
- [ ] Configure `CODEOWNERS` with your team members
- [ ] Modify workflow files for your deployment targets
- [ ] **Secrets & Deploy Targets** — set provider tokens and environment-specific variables.
- [ ] Update issue templates with relevant labels and assignees
- [ ] Adjust `cliff.toml` for your changelog preferences

## Common Initial Issues

**Workflows not triggering?**

- Check that workflow files are in the correct `.github/workflows/` directory
- Verify the repository has Actions enabled in Settings
- Check repository-level Actions permissions and workflow `on:` triggers.
- See [REFERENCE/workflow-triggers.md][workflow-triggers]

**Templates not appearing?**

- Ensure template files have correct extensions (`.yml` for issue templates, `.md` for PR templates)
- Check that the `ISSUE_TEMPLATE` directory and `PULL_REQUEST_TEMPLATE.md` file are properly named.

**Permission errors in workflows?**

- Review the default GITHUB_TOKEN permissions in repository Settings
- Add required secrets for deployment workflows

## Next Steps

Once the basic setups are complete:

1. **Customize templates** for your specific project needs
2. **Configure deployment** for your hosting platform
3. **Set up branch protection rules** to enforce workflow requirements
4. **Train your team** on the new contribution process

## Checklist before first release

- [ ] Copy `.github/` into target repo.
- [ ] Set required secrets.
- [ ] Configure branch protection and required checks.
- [ ] Update template links.
- [ ] Run a PR to validate CI.

## See Also

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
