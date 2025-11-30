# 🧩 Branching Strategy & Commit Naming Policy

This document defines how branches are organized and how commits are structured to maintain a consistent, traceable, and
automated release flow.

## 🌿 Branching Strategy

Our repository follows a **GitFlow-inspired branching model** optimized for CI/CD pipelines and changelog automation.

| **Branch**  | **Where From** | **Merges Into** | **Purpose**                                      | **End of Life**     | **Remarks**                                                     |
| ----------- | -------------- | --------------- | ------------------------------------------------ | ------------------- | --------------------------------------------------------------- |
| `main`      | repository     | n/a             | Production-ready, stable releases only           | Never               | Protected branch; only `release/*` or `hotfix/*` merges allowed |
| `develop`   | `main`         | n/a             | Continuous integration of all approved features  | Never               | Acts as a **staging** branch for integration and testing        |
| `chore/*`   | `develop`      | `develop`       | Initial project setups (docs/, .github, etc)     | Deleted after merge | The project initial skeleton essentially                        |
| `feature/*` | `develop`      | `develop`       | Develop new features or enhancements             | Deleted after merge | Each PR should represent one logical, isolated feature          |
| `bugfix/*`  | `develop`      | `develop`       | Resolve issues or bugs found during testing      | Deleted after merge | Typically references a tracked issue (e.g., `bugfix/#42`)       |
| `hotfix/*`  | `main`         | `main`          | Apply urgent production fixes                    | Deleted after merge | Must **back-merge** into `main` after deployment                |
| `hotfix/*`  | `release`      | `release`       | Apply urgent release fixes                       | Deleted after merge | Used for **pre-release stabilization**                          |
| `release/*` | `develop`      | `main`          | Final QA, version bump, and changelog generation | Deleted after merge | Used for **pre-release stabilization**                          |

### Branch Naming Conventions

<type(optional-scope): short-summary>

- **Features:** `feature/description` or `feature/issue-number-description`
  - Example: `feature/user-authentication` or `feature/123-user-auth`

- **Fixes:** `fix/description` or `fix/issue-number-description`
  - Example: `fix/login-validation` or `fix/456-login-issue`

- **Hotfixes:** `hotfix/description` or `hotfix/issue-number-description`
  - Example: `hotfix/critical-security-patch`

- **Releases:** `release/YYYY-MM-DD`
  - Example: `release/2025-10-13` or `release/2025-10-13a`

### Workflow Example

```bash
# Step 1: Initialize repository (Make sure to define a .gitignore first)
git init; git add --all; git commit -m "chore: initial project setup"; git branch -M main; git remote add origin <repo-url>; git push -u origin main;

# Step 2. Create and switch to develop branch. Push the branch immediately to remote for visibility:
git switch -c develop; git push -u origin HEAD

# Step 3. Create and switch to feature/* or fix/* branch. Push the branch immediately to remote for visibility:
git switch -c <type/branch-name>; git push -u origin HEAD

# Step 4. Work, Commit and Push to your branch repeatedly until you're done with work
git add --all; git commit -m "<type(optional-scope): short-summary>"; git push -u origin HEAD

  # Might find the below code useful in times of need
  # Checks out the branch, updates it cleanly by replaying your local changes on top of the latest remote commits.
  # git checkout <type/branch-name>; git pull --rebase --autostash origin <type/branch-name>; git fetch --prune;

# Step 5. Open a PR (Use GitHub Web UI) from your branch targeting the develop branch: type/* → develop, when ready
#   - Go to your repository on GitHub
#   - Click "Compare & pull request"
#   - Add description, request reviewers
#   - Wait for CI and Code reviews if any

# Step 6. CI and Code reviews
#   - If NOT successful → Return to Step 4, addressing review comments
#   - If successful     → Go back to Step 7

# Step 7. When CI passes & reviews approved, merge using GitHub UI:
#   - Click Merge and choose the org policy (Merge commit preferred)
#   - Optionally delete branch from GitHub UI at merge time

# Step 8. Switch back to develop branch, update and prune, then visually confirm your merge landed correctly.
#   WHY `reset --hard`? Changes to develop are EXTREMELY NOT TOLERATED!
git checkout develop; git fetch origin --prune; git reset --hard origin/develop; git clean -fd; git log --oneline --graph --decorate -10

# Step 9. Delete the feature/* or fix/* branch both locally and remotely
#   OR ALTERNATIVELY: Go to repo settings and enable Automatically delete head branches, then always skip this step
#   ONLY IF: Restrict deletions for branches main and develop are enabled. See attached BRANCH_PROTECTION_RULES.json
git branch -d <type/branch-name>; git push origin --delete <type/branch-name>


# Step 10. Release or Continue with work
#   - If there's more work to do    → Return to Step 3
#   - If there's no more work to do → Go back to Step 11

# Step 11. Create and switch to release/* branch. Push the branch immediately to remote for visibility:
git switch -c release/*; git push -u origin HEAD

# Step 12. Repeat steps 5-7, with now the release/* branch targeting main: release/* → main, when ready
#   -  IMPORTANT! Temporarily relax Require a pull request before merging branch ruleset for this then return it after

# Step 13. Wait for workflows to run, specifically the change-log, as this edits the main commit history also
#   HACK: changelog work flow runs on: push: branches: [main], it calculate v* and auto tags automatically.
#         No need to tag it manually, it would be hectic to always remember version number across projects

# Step 14: Resets local main and develop to match remote exactly, remove untracked files/directories, then visually confirm merges landed correctly.
#   WHY `reset --hard`? Changes to main and develop are EXTREMELY NOT TOLERATED!
git checkout main; git fetch origin --prune; git reset --hard origin/main; git clean -fd; git log --oneline --graph --decorate -10; git checkout develop; git fetch origin --prune; git reset --hard origin/develop; git clean -fd; git log --oneline --graph --decorate -10

# Step 15: Back to Step 3

# Updated .gitignore? unstage everything first, then stage again.
#   git reset; git rm -r --cached .; git add --all;
```

## 🧱 Commit Strategy

We use a **semantic commit** convention (based on [Conventional Commits](https://www.conventionalcommits.org/)) to
enable **automatic versioning** and **CHANGELOG** generation with [`git-cliff`](https://git-cliff.org/).

| **Commit Prefix** | **Meaning**                             | **Implied Version Bump** | **Example**                                    |
| ----------------- | --------------------------------------- | ------------------------ | ---------------------------------------------- |
| `*!`              | Backward Incompatible API changes       | MAJOR                    | `feat!: added db column for user registration` |
| `feat:`           | New feature                             | MINOR                    | `feat: add user registration endpoint`         |
| `fix:`            | Bug fix                                 | PATCH                    | `fix: resolve memory leak in image processing` |
| `chore:`          | Build process or auxiliary tool changes | NONE                     | `chore: update dependencies`                   |
| `docs:`           | Documentation changes                   | NONE                     | `docs: update API documentation`               |
| `perf:`           | Performance improvements                | PATCH                    | `perf: optimize database queries`              |
| `refactor:`       | Code refactoring                        | NONE                     | `refactor: simplify authentication logic`      |
| `security:`       | Security updates                        | NONE                     | `security: fixed database auth                 |
| `style:`          | Code style changes (formatting, etc.)   | NONE                     | `style: format code with prettier`             |
| `test:`           | Test-related changes                    | NONE                     | `test: add unit tests for user service`        |
| `hotfix:`         | Critical production fix                 | PATCH                    | `hotfix: patch security vulnerability in auth` |

### 🧩 Commit Naming Conventions

Each commit message **must** follow this pattern:

```bash
git commit -m "<type(optional-scope): short-summary>"
```

**Examples:**

```bash
git commit -m "feat(ui): add dark mode toggle"
git commit -m "feat(api): add new endpoint"
git commit -m "fix(auth): correct token expiry"
git commit -m "chore(ci): improve workflow caching"
git commit -m "docs(readme): update setup guide"
git commit -m "style(css): adjust spacing"
git commit -m "refactor(core): simplify function"
git commit -m "perf(db): speed up query"
git commit -m "test(api): add integration tests"
git commit -m "build: adjust vite config"
git commit -m "ci(release): auto-tag version"
```

## 🚦 Release Integration

These conventions allow:

- **`release.yml`** workflow to publish versions
- **`changelog.yml`** workflow to generate `CHANGELOG.md` via `git-cliff` then automatically tag a version
- **`develop → release → main`** merges to create predictable release artifacts

### 🔖 Versioning Rules

| **Change Type**       | **Example Commit(s)**             | **Version Bump** | **Example New Version** |
| --------------------- | --------------------------------- | ---------------- | ----------------------- |
| Breaking API change   | `feat!: drop support for Node 16` | `MAJOR`          | 2.0.0 → 3.0.0           |
| New feature           | `feat: add password reset`        | `MINOR`          | 2.1.0 → 2.2.0           |
| Bug fix or patch      | `fix: correct login redirect`     | `PATCH`          | 2.2.0 → 2.2.1           |
| Docs, refactor, chore | `docs: update usage guide`        | none             | 2.2.1 → 2.2.1           |

## 🧭 Example Workflow in Practice

| **Stage**         | **Action**                       | **Example Command**                               |
| ----------------- | -------------------------------- | ------------------------------------------------- |
| Start new feature | Create branch from `develop`     | `git checkout -b feature/add-auth`                |
| Commit progress   | Follow commit rules              | `git commit -m "feat(auth): implement JWT login"` |
| Merge changes     | Create PR → merge into `develop` | GitHub PR                                         |
| Prepare release   | Branch from `develop`            | `git checkout -b release/v1.3.0`                  |
| Publish release   | Merge into `main`                | `git merge release/v1.3.0`                        |
| Sync develop      | Back-merge from `main`           | `git merge main develop`                          |

## See Also

- [CONTRIBUTING](./CONTRIBUTING.md) — General contribution workflow
- [Release Management](../docs/BEST_PRACTICES/release-management.md) — Tagging, changelog, and versioning best practices
- [Workflow Explanations](../docs/USAGE_GUIDES/workflow-explanations.md) — How CI/CD integrates with this policy
