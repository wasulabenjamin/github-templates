# Release Management Best Practices

Comprehensive guide for managing software releases with semantic versioning, automated changelog generation, and GitHub
workflows designed for reliability, consistency, and zero redundant builds.

## Release Strategy

### Release Philosophy

This project treats **automation as governance** — not a convenience. All versioning, changelog updates, and tagging are
performed automatically through workflows triggered on the `main` branch.

Human intervention is reserved for *stability decisions*, not repetitive mechanical steps.

The `develop` branch serves as the integration ground for active development, while short-lived `release/YYYY-MM-DD`
branches act only as *handover conduits* to stabilize and merge into `main`.

### Release Types

| Release Type | Version Bump      | Frequency   | Automation Level |
|--------------|-------------------|-------------|------------------|
| **Patch**    | `1.2.3` → `1.2.4` | As needed   | Fully automated  |
| **Minor**    | `1.2.3` → `1.3.0` | 2–4 weeks   | Semi-automated   |
| **Major**    | `1.2.3` → `2.0.0` | 6–12 months | Manual oversight |

### Release Channels

#### Main Branch (Stable)

* Canonical source of truth
* Production-ready code only
* Triggers `update-changelog.yml` → `ci.yml` → `semantic-release.yml` workflows
* Generates and tags semantic versions automatically
* Deploys to production using pre-built CI artifacts

#### Develop Branch (Integration)

* Active development and feature integration
* Always deployable to staging
* Continuous linting and testing
* Acts as the origin for new release branches

#### Release Branches (`release/YYYY-MM-DD`)

* Serve only as *staging conduits* between `develop` and `main`
* Used for final verification, QA signoff, and preparing production merge
* Do **not** carry semantic versions — they are dated for traceability
* Once merged to `main`, automated workflows take over (changelog → tag → release)

#### Feature Branches

* Experimental or isolated development
* Frequently rebased against `develop`
* Never trigger release-related workflows

## Semantic Versioning

### Version Number Structure

```
MAJOR.MINOR.PATCH
```

**MAJOR** – Breaking changes.
**MINOR** – Backward-compatible new features.
**PATCH** – Bug fixes and minor improvements.

Version increments are automatically determined from commit messages using conventional commit rules.

### Commit Message Conventions

```bash
# Major version bump
feat!: remove deprecated authentication flow

# Minor version bump
feat: introduce payment API endpoints

# Patch version bump
fix: resolve null reference in logging

# No version bump
chore: update build configuration
docs: clarify environment setup
```

### Pre-release Versioning

Pre-releases (if any) can be generated manually for testing builds via workflow dispatch:

```bash
# Beta releases
1.2.4-beta.1
1.2.4-beta.2

# Release candidates
1.2.4-rc.1
1.2.4-rc.2

# Final release
1.2.4
```

## Release Automation

### Workflow Chain Overview

Releases are automated in three distinct workflows triggered in sequence:

1. **`update-changelog.yml`** – Runs on `main`.
   Generates `CHANGELOG.md`, bumps semantic version, and creates a Git tag.
2. **`ci.yml`** – Builds the project and uploads artifacts for downstream use.
   (Triggered on both PRs and pushes to `main`/`develop`.)
3. **`semantic-release.yml`** – Publishes GitHub release, reusing build artifacts from CI to avoid redundant builds.
4. **`deploy-netlify.yml`** – Deploys to production using the exact same artifact from CI.

### Workflow Configuration Example

```yaml
name: Release
on:
  push:
    branches: [ main ]
  workflow_dispatch:

jobs:
  release:
    runs-on: ubuntu-latest
    needs: ci
    steps:
      - name: Download build artifact
        uses: actions/download-artifact@v4
        with:
          name: build-output

      - name: Create GitHub Release
        uses: softprops/action-gh-release@v2
        with:
          files: |
            dist/**
```

### Artifact Reuse Principle

Both **release** and **deploy** workflows reuse CI’s uploaded artifacts.
This ensures:

* Identical binaries across CI, release, and production.
* Reduced build time.
* Guaranteed reproducibility between environments.

## Release Process

### Release Branch Flow

1. **Create a Release Branch**

   ```bash
   git checkout develop
   git pull origin develop
   git checkout -b release/2025-10-31
   ```

2. **Stabilize**

  * Run full test and lint workflows.
  * Ensure CI pipeline passes.
  * Conduct QA or UAT reviews.

3. **Merge to Main**

   ```bash
   git checkout main
   git merge --no-ff release/2025-10-31
   git push origin main
   ```

4. **Automatic Chain Reaction**

  * `main` triggers:

    * **Changelog workflow** → updates changelog and tags a new version.
    * **CI workflow** → builds and uploads artifacts.
    * **Release workflow** → publishes GitHub release and attaches artifacts.
    * **Deploy workflow** → deploys using those artifacts.

### Pre-release Checklist

**Code Quality**

* [ ] CI ✅ (lint + test passing)
* [ ] Code coverage maintained
* [ ] Security scan passes

**Documentation**

* [ ] CHANGELOG auto-generated
* [ ] README & setup instructions verified
* [ ] Any migration guides updated

**Dependencies**

* [ ] Latest versions verified
* [ ] No critical vulnerabilities
* [ ] License compliance checked

### Release Day Execution

Since versioning and changelog are automatic, release day focuses on *verification, not mechanics.*

**Preparation (Before Merge)**

* Ensure `develop` is stable.
* Confirm the release branch passed all checks.
* Notify QA and stakeholders.

**Execution (Merge)**

```bash
git merge release/2025-10-31 --no-ff
git push origin main
```

**Post-Release**

* Monitor release pipeline completion.
* Validate deployment success.
* Communicate release notes automatically generated.

## Changelog Management

Changelogs are generated automatically on `main` using `git-cliff`.
They summarize meaningful changes and derive version numbers from conventional commit patterns.

**Structure Example:**

```markdown
# Changelog

## [1.3.0] - 2025-10-31

### Added
- Introduced role-based access control

### Fixed
- Corrected issue with offline caching

### Changed
- Updated build target to ES2022
```

Changelog content is human-readable and version-tag linked, ensuring clear release transparency.

## Quality Assurance

Quality control is embedded directly into automation pipelines.

**Continuous Checks**

* `lint.yml` → ensures code health
* `test.yml` → validates logic and reliability
* `ci.yml` → confirms build reproducibility

**Manual QA**

* Conducted during a release branch freeze window.
* Focus on feature completeness and regression coverage.

## Emergency Procedures

### Hotfixes

For production issues:

```bash
git checkout -b hotfix/critical main
# apply fix
git commit -m "fix: urgent patch for production"
git push origin hotfix/critical
```

Once merged into `main`, the automated pipeline handles tagging, changelog update, and release as usual.

### Rollbacks

If deployment fails, the deployment workflow supports rollback via environment triggers.
Manual fallback:

```bash
git revert <last_tag>
git push origin main
```

## Metrics and Continuous Improvement

| Metric            | Target              | Description                                 |
|-------------------|---------------------|---------------------------------------------|
| Release Frequency | Weekly or bi-weekly | Ensures velocity without chaos              |
| Lead Time         | < 4 hours           | Fast delivery from commit to production     |
| Rollback Rate     | < 2%                | Reflects release quality                    |
| Build Redundancy  | 0                   | All downstream workflows reuse CI artifacts |

Every post-release review includes:

* What slowed the chain?
* Which manual steps can be automated next?
* Are workflow triggers aligned with intent?

## Security & Compliance

**Secrets**

* Managed through GitHub Environments and Actions secrets.
* Rotated periodically.

**Integrity**

* Signed commits and tags.
* Dependency vulnerability scans on each workflow run.

**Traceability**

* Each release linked to its CI artifact checksum.
* Each tag is tied to an auto-generated changelog.

## Documentation Consistency

* Update developer guides after major/minor releases.
* Version CHANGELOG.md, README.md, and setup files.
* Ensure workflow references in `/docs/` reflect the current automation structure.

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
[template-fields]: ../REFERENCE/template-fields.md
[workflow-triggers]: ../REFERENCE/workflow-triggers.md
[permissions-needed]: ../REFERENCE/permissions-needed.md
[troubleshooting]: ../REFERENCE/troubleshooting.md
[issue-triage]: ./issue-triage.md
[code-review-standards]: ./code-review-standards.md
[release-management]: ./release-management.md
[ROADMAP]: ../ROADMAP.md
[FAQ]: ../FAQ.md
[INTEGRATIONS]: ../INTEGRATIONS.md
[changelog]: ../../.github/workflows/update-changelog.yml
[cliff]: ../../cliff.toml
[test]: ../../.github/workflows/run-tests.yml
