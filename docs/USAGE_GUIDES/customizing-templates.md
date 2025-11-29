# Customizing Templates

Every project has unique needs. This guide explains how to adapt the GitHub Templates for your repository while
preserving structure and consistency.

## Design principles

- **Clarity over verbosity:** templates should be concise and ask only for necessary information.
- **Actionable fields:** use checklists and` front matter where useful to pre-populate metadata.
- **Optional vs. required:** use headings and guidance to indicate required info (GitHub won’t enforce required fields
  inside templates, so still provide checklist items).

## Why Customize?

Customization ensures templates reflect your workflow — for example:

- Adding additional issue types.
- Modifying pull request checklists.
- Updating labels or auto-assignees.
- Adjusting workflow triggers.

## Issue Templates

Issue templates live under `.github/ISSUE_TEMPLATE/`. Each issue template uses GitHub's form schema, i.e., it contains a
`name`, `description`, `title`, `labels`, `assignees`, and `body`.

```yaml
name: 🐛 Bug Report
description: Create a bug report to help improve this project
title: 'Bug: <brief-summary>'
labels: ['bug', 'needs-triage']
assignees: ['wasulabenjamin']

body:
  - type: markdown
    attributes:
      value: |
        ### 👋 Thank you for reporting an issue!
        Please fill out all required sections clearly to help reproduce and fix the bug efficiently.

  - type: textarea
    id: description
    attributes:
      label: Bug Description
      description: Please provide a clear and concise description of what the bug is and what you expected to happen
      placeholder: |
        Example:
        - When I click "Save", the app freezes.
        - I expected a success message instead.
    validations:
      required: true
```

### Common Issue Template Customization Patterns

#### Adding Project-Specific Fields

```yaml
- type: dropdown
  id: environment
  attributes:
    label: 'Environment'
    description: 'Where did you encounter this issue?'
    options:
      - 'Development'
      - 'Staging'
      - 'Production'
  validations:
    required: true

- type: input
  id: version
  attributes:
    label: 'Version'
    description: 'What version of the software are you using?'
    placeholder: 'e.g., 1.2.3'
```

#### Conditional Fields

Use the `visible` property to show/hide fields based on previous responses:

```yaml
- type: dropdown
  id: issue-type
  attributes:
    label: 'Issue Type'
    options: ['Bug', 'Performance', 'Security']
  validations:
    required: true

- type: textarea
  id: performance-metrics
  attributes:
    label: 'Performance Metrics'
    description: 'Provide specific performance measurements'
  visible:
    issue-type: ['Performance']
```

### Template Configuration File

The `config.yml` file in `ISSUE_TEMPLATE/` controls the issue creation interface:

```yaml
blank_issues_enabled: false # Prevent users from opening blank, unstructured issues

contact_links:
  - name: 📚 Documentation
    url: https://docs.yourproject.com
    about: Check our documentation for answers
  - name: 💬 Community Discussions
    url: https://github.com/your-org/your-repo/discussions
    about: Ask questions and discuss with the community
```

You can also add new templates like `performance.yml` or `design-feedback.yml`.

## Pull Request Templates

PR templates use standard Markdown with special comments for dynamic content:

```markdown
## Description

<!-- Describe your changes in detail -->

## Related Issues

<!-- Link to any related issues using #issue-number -->

Fixes #123

## Type of Change

- [ ] Bug fix
- [ ] New feature
- [ ] Breaking change
- [ ] Documentation update

## Checklist

- [ ] Tests added/updated
- [ ] Documentation updated
- [ ] CHANGELOG updated
```

#### Pull Request Template

This project uses a **single unified Pull Request template** located at `.github/PULL_REQUEST_TEMPLATE.md`

The goal is to keep contributions consistent and reduce the complexity of choosing between multiple templates. The
template includes sections that apply to different types of changes (code, documentation, configuration, CI, etc.).
Contributors only need to fill in the parts relevant to their change.

This simplifies the workflow while still ensuring PRs provide the context and checks needed for a proper review.

#### Adding Custom PR Templates

For example, create new template file `hotfix.md ` in `PULL_REQUEST_TEMPLATE/`:

```markdown
## Hotfix Details

**Emergency**: [ ] Yes [ ] No **Production Impact**: [ ] High [ ] Medium [ ] Low

## Root Cause

<!-- What caused the issue? -->

## Verification

<!-- How was the fix verified? -->
```

#### Other Customization Patterns

You can modify checklists or add auto-labels:

```markdown
## Auto-label

> Add labels like `feature`, `bugfix`, or `hotfix` for easy filtering.
```

#### Best practices

- Use a lightweight checklist (build, tests, changelog).
- Provide a `breaking changes` section if you use semantic releases.
- Reference the related issue with `Closes #123` to an auto-link.

## Workflow Adjustments

To customize workflows, modify triggers or environments. Each workflow file in `.github/workflows/` can be customized
for your project's needs.

Example in `deploy.yml`:

```yaml
on:
  push:
    branches: [main] # Run on main only
```

### Automations that depend on template content

- Release and changelog workflows (e.g., `release.yml`) may parse commit messages and PR titles. Encourage contributors
  to prefix PR titles (`fix:`, `feat:`, `docs:`) if you rely on conventional commits.
- `stale.yml` often acts on labels — make sure your templates apply expected labels.
- You can adjust deployment providers or add conditions (e.g., only deploy tags).

### Environment-Specific Settings

```yaml
# In ci.yml - Customize strategy matrix for your testing framework
jobs:
  test:
    strategy:
      matrix:
        node-version: [16.x, 18.x, 20.x]
        os: [ubuntu-latest, windows-latest]

    steps:
      - name: Run tests
        run: npm test
        env:
          CI: true
          TEST_ENV: ${{ matrix.os == 'windows-latest' && 'windows' || 'unix' }}
```

### Custom Deployment Targets

```yaml
# In deploy.yml - Add your deployment platform
- name: Deploy to AWS
  if: contains(github.ref, 'main')
  uses: aws-actions/configure-aws-credentials@v1
  with:
    aws-access-key-id: ${{ secrets.AWS_ACCESS_KEY_ID }}
    aws-secret-access-key: ${{ secrets.AWS_SECRET_ACCESS_KEY }}
    aws-region: us-east-1
```

### Custom Workflow Triggers

Modify when workflows execute:

```yaml
# Custom branch and path triggers
on:
  push:
    branches: [main, develop]
    paths: ['src/**', 'package.json']
  pull_request:
    branches: [main]
    paths-ignore: ['docs/**', '*.md']
```

## Repository File Customizations

### CONTRIBUTING.md and CODE_OF_CONDUCT.md Configuration

- Ensure `CODE_OF_CONDUCT.md` includes enforcement contacts (these can be separate from public issue contacts).
- Link to `security.yml` the security issue template.
- Update contact points and support hours in `CONTRIBUTING.md`.

### CODEOWNERS Configuration

The `CODEOWNERS` file automatically assigns reviewers. Add and adjust list owners for `src/**`, `docs/**`, or packages
e.t.c.

## Coding Standards

- Use TypeScript for all new code
- Follow our ESLint configuration
- Write tests for all new features

## Testing Your Customizations

### Test Template Rendering

1. Create test issues using each template
2. Open PRs with different file changes
3. Verify automated workflows trigger correctly
4. Check that CODEOWNERS assignments work

## Best Practices for Customization

1. **Start Simple**: Begin with minimal changes and gradually add complexity
2. **Document Changes**: Update relevant documentation when modifying templates
3. **Test Thoroughly**: Always test templates in a non-production environment first
4. **Gather Feedback**: Solicit team input on template improvements

## Migration & upstream updates

If you fork or copy this repo and later want to pull upstream template updates:

1. Keep your `.github/` in a separate branch or commit history to make merges easier.
2. Use `git format-patch`/`git am` or a manual diff-and-apply strategy for large changes.
3. Document any local deviations in `CONTRIBUTING.md` (so future maintainers understand why changes were made).

## Tips

✅ Keep templates modular.  
✅ Use consistent naming (`feature_request.yml`, not `feature.yml`).  
✅ Test changes in a test repository before applying to production.

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
