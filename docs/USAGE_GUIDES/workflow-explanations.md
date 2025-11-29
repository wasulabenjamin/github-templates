# Workflow Explanations

This document breaks down the purpose and key steps of each GitHub Actions workflow in this repository. It focuses on
_what_ the workflow does, _why_ it exists, and _which parts you should edit_ when adapting to your project. Only short,
focused YAML snippets are included — workflows are intentionally well-commented in `.github/workflows`.

## Available Workflows

| Workflow                          | Purpose                                            | Trigger                                              |
| --------------------------------- | -------------------------------------------------- | ---------------------------------------------------- |
| **sync-labels.yml**               | Synchronizes customs labels with GitHub            | Changes to `.github/LABELS.yml`                      |
| **lint-checks.yml**               | Run ESLint and Prettier checks                     | `push`, specified file types and folders             |
| **run-tests.yml**                 | Run Vitest/Playwright test suites                  | `push`, specified file types and folders             |
| **validate-branches.yml**         | Allow project defined PRs, inject custom PR bodies | On every pull request                                |
| **auto-close-issues-develop.yml** | Read repo files and close issues from `develop`    | Successful PR merge to `develop`                     |
| **update-changelog.yml**          | Update `CHANGELOG.md` via git-cliff                | `push`, non-docs changes                             |
| **sync-main-to-develop.yml**      | Keeps `main` and `develop` in sync                 | `workflow_run:` run after changelog-workflow on main |
| **ci.yml**                        | Run tests and linters then builds project          | `push`, `pull_request`,                              |
| **semantic-release.yml**          | Generate changelog + semantic release              | `workflow_run:` run after ci-workflow on main        |
| **deploy-netlify.yml**            | Auto-deploy app to hosting provider Netlify        | `workflow_run:` run after ci-workflow on main        |

Each file under `.github/workflows/` defines one automation process.

## `sync-labels.yml` — ♾️ Synchronizes GitHub Labels

**When it runs:**

- Runs when code is pushed (or merged from PR) directly to the branches `main` and `develop` for specified file type
  `.github/LABELS.yml`
- Also allows manual runs via GitHub’s “Actions” UI.

**Purpose:** Automatically overwrites default GitHub labels with our defined ones

**Key stages:**

- Defines a Sync job
- Downloads the repository’s code into the runner.
- Synchronize the newly uploaded LABELS.yml
- Output a Smart Summary

## `lint-checks.yml` — 🧹 Lint & Code Quality

**When it runs:**

- Runs when someone opens or updates a pull request targeting branches `main` and `develop` for specified file types and
  folders.
- Runs when code is pushed (or merged from PR) directly to all branches for specified file types and folders.

**Purpose:** Run static lint checks independently to provide quick feedback before full CI runs.

**Key stages:**

- Defines a Lint job
- Downloads the repository’s code into the runner.
- Installs Node.js on the runner and enables npm caching.
- Display environment info (for debugging clarity)
- Cache npm + node_modules for faster installations.
- Install exact dependencies from package-lock.json
- Run ESLint checks.
- Run Prettier checks.
- Run TypeScript checks.
- Upload a lint report for inspection.
- Output a Smart summary

## `run-tests.yml` — 🧪 E2E / Integration

**When it runs:**

- Runs when someone opens or updates a pull request targeting branches `main` and `develop` for specified file types and
  folders.
- Runs when code is pushed (or merged from PR) directly to all branches for specified file types and folders.

**Purpose:** Runs unit tests, also run Playwright or other browser-based suites. Kept separate, so heavy E2E tests can
be scheduled or run only on `main`.

**Key stages:**

- Defines a Test job
- Downloads the repository’s code into the runner.
- Installs Node.js on the runner and enables npm caching.
- Display environment info (for debugging clarity)
- Cache npm + node_modules for faster installations.
- Install exact dependencies from package-lock.json
- If there’s a test:unit script, run it; otherwise, fall back to a direct Vitest command.
- If there’s a test:e2e script, run it; otherwise, fall back to a direct Playwright command.
- Security audit for vulnerabilities
- Upload a test report for inspection.
- Output a Smart summary

## `validate-branches.yml` — 🔐 Enforce Allowed PR Source Branches

**When it runs:** Runs on every pull request

**Purpose:** Ensure only project defined PRs patterns succeed, i.e., only`release/*` or `hotfix/*` can merge into
`main`. This prevents accidental or unsafe merges (e.g., feature branches or random personal branches getting into
production-critical code).

**Key stages:**

- Defines a validate-pr job
- Downloads the repository’s code into the runner.
- Display detailed PR metadata (branch names, repos, refs) for debugging and audit clarity.
- Validate branches.
  - `release/ → main` : Must be descendant of develop
  - `feature/ → develop` : Must be descendant of develop
  - `bugfix/ → develop` : Must be descendant of develop
  - `hotfix/ → main` : Must be descendant of main
  - `hotfix/ → develop` : Must be descendant of main
  - `hotfix/ → release/` : Must be descendant of target release
  - Funny names all rejected automatically
- Output a pass/fail decision visible in GitHub’s required checks UI.
- Output a Smart summary

## `pr-issue-handler` — 🧠 Issues and PRs Smart Handler

Defines 2 jobs discussed below

### `smart-handler`

**When it runs:** Runs on successful merge of a pull request to `develop` and `main`.

**Purpose:** Automates labeling issues as `ready for release` from develop branch, then later closing them on main

**Key stages:**

- Defines a smart-handler job
- Downloads the repository’s code into the runner.
- Avoid shell interpretation of the PR body content
- Extract issue references from PR Description (develop only)
- Relabeling found issues from develop
- Smart closing of issues
- Output a Smart summary

### `stale` — Auto Closes Stale Issues and PRs

**When it runs:**

- Automatically runs Monday to Friday at 08:30AM (EAT, UTC+3)
- Also allows manual runs via GitHub’s “Actions” UI.

**Purpose:** Automatically mark and close stale issues/PRs. It relies on labels applied by templates or maintainers.

**Key stages:**

- Defines a Stale job
- Based on defined timers and inactivity thresholds, clean up stale issues and PRs.
- Output a Smart Summary

## `update-changelog.yml` — 📄 Auto Update Changelog

**When it runs:** Runs when code is pushed (or merged from PR) directly to the `main` branch while preventing run on
doc-only edits.

**Purpose:** Periodically regenerate `CHANGELOG.md` or update it when automated changes occur.

**Key stages:**

- Defines a Changelog Update job
- Generate GitHub App token to bypass branch protection
- Downloads the repository’s code into the runner.
- Verify if changelog config cliff.toml exists
- Determine semantic version
- Generate CHANGELOG.md
- Check if changes were made to CHANGELOG.md
- Commit and push changes made to CHANGELOG.md
- Tag the main branch with the newly extracted version (only if that tag doesn't already exist)
- Output a Smart Summary

## `sync-main-to-develop.yml` — 🔄 Sync main to develop

**When it runs:**

- Runs automatically on the `main` branch, but after waiting for the `changelog` workflow to complete running.
- Runs when code is pushed (or merged from PR) directly to the `main` branch on doc-only edits.
- Also allows manual runs via GitHub’s “Actions” UI.

**Purpose:** Keeps `main` and `develop` branches in sync

**Key stages:**

- Defines a Main to Develop synchronization job
- Generate GitHub App token to bypass branch protection
- Downloads the repository’s code into the runner.
- SMART TRIGGER CHECK - Prevent duplicate runs
- Skip workflow if develop branch doesn't exist
- Synchronize updated main branch to develop
- Output a Smart Summary

## `ci.yml` — 📦 Continuous Integration

**When it runs:**

- Runs when someone opens or updates a pull request targeting branches `main` and, `develop`
- Runs when code is pushed (or merged from PR) directly to the `develop` branch.
- Runs automatically on the `main` branch, but after waiting for the `changelog` workflow to complete running.

**Purpose:** Runs lint and unit tests, then builds a project.

**Key stages**

- Defines a Build job
- Downloads the repository’s code into the runner.
- Installs Node.js on the runner and enables npm caching.
- Display environment info (for debugging clarity)
- Cache npm + node_modules for faster installations.
- Install exact dependencies from package-lock.json
- Build the project.
- Strong verification - Helps catch cases where the build command ran but didn’t output anything.
- Upload build artifacts for re-use by release and deployment workflows.
- Output a Smart Summary

## `semantic-release.yml` — 🏷️ Semantic Release

**When it runs:** Runs automatically on the `main` branch, but after waiting for the `ci` workflow to complete running.

**Purpose:** Only runs when a commit is marked as a release, i.e., If a previous changelog workflow tagged main branch
with a version number e.g., v1.0.0, etc.

**Key stages:**

- Defines a Release job
- Downloads the repository’s code into the runner.
- Download pre-built artifacts from a previous ci job
- Verify build artifacts
- Get and Validate the latest semantic tag
- Create a distribution package
- Create GitHub Release (USE ACTUAL TAG)
- Cleanup after you
- Output a Smart summary

## `deploy-netlify.yml` — 🚀 Deploy to Netlify

**When it runs:** Runs automatically on the `main` branch, but after waiting for the `ci` workflow to complete running.

**Purpose:** Deploy a build to a hosting provider (Netlify/Vercel/Supabase).

**Key stages:**

- Defines a Deployment job
- Download pre-built artifacts from a previous ci job
- Verify build artifacts
- Install Netlify CLI
- Deploy to Netlify
- Output a Smart Summary

## Secrets & Permissions

Most workflows require secrets (deploy tokens) and specific permissions:

- `contents: write` for pushing tags or updating files.
- `actions: write` if workflows dispatch other workflows. See `docs/REFERENCE/permissions-needed.md` for a complete list
  and examples.

## Troubleshooting

- **Workflow fails on checkout:** ensure `actions/checkout` version is recent and `fetch-depth` is sufficient for tag
  operations.
- **Permission errors when pushing tags:** confirm the workflow actor has `contents: write` and that branch protection
  allows GitHub Actions to push tags.
- **Long-running E2E jobs:** consider `concurrency` and matrix splitting to reduce runtime.

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
