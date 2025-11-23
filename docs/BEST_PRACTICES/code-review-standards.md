# Code Review Standards

This document establishes code review standards for repositories that adopt templates from `github-templates`.
It is intended to help teams define consistent expectations for quality, security, and maintainability.

## Review responsibilities and roles

- Author: Provide a clear description, changelog entry, and tests.
- Reviewer(s): Validate correctness, test coverage, security, and documentation.
- Maintainer: Final approver for critical branches or releases.

Assign reviewers using CODEOWNERS or via PR template guidance.

## Checklist for reviewers

During code review, verify that commit messages:

- [ ] Use conventional commit prefix (`feat:`, `fix:`, etc.)
- [ ] Have clear, concise descriptions
- [ ] Reference related issues when applicable
- [ ] Include breaking change notices in footer when needed
- [ ] Follow the 50/72 character rule (50 char subject, 72 char body)
- [ ] Functionality
  - Does the code implement the described behavior?
  - Are edge cases handled?
- [ ] Tests
  - Are there unit/integration tests?
  - Do tests run in CI (`.github/workflows/ci.yml`) and pass?
- [ ] Style and readability
  - Follow style guides (lint passes)
  - Clear variable and function names
- [ ] Performance and security
  - Any obvious performance regressions?
  - Validate user input and sanitize outputs
- [ ] Documentation
  - Update `README`, `docs/`, or changelog if needed
  - Add migration notes for breaking changes

This structure ensures:
- **Discoverability**: Clear location in USAGE_GUIDES
- **Integration**: Connected to existing workflows and documentation
- **Automation**: Supports your existing git-cliff configuration
- **Completeness**: Provides both reference and explanatory content
- **Maintainability**: Easy to update as policies evolve

Example short review comment:

> Tests look good. Suggest renaming `doStuff()` to `processRequest()` for clarity.
> Also add a short note in `CHANGELOG.md` describing the new optional parameter.

## Guidelines for automated checks

- Block merges on failing CI using branch protection.
- Use linting (`lint.yml`) and type checks to catch issues early.
- Annotate PRs with findings from static analysis for reviewers to consider.

Example branch protection rules:
- Require status checks: `ci`, `lint`
- Require pull request reviews before merge
- Require signed commits (optional)

## Merging rules

- Non-critical fixes can be merged after at least one approving review and passing CI.
- Major or breaking changes require:
  - Multiple approvers
  - An updated CHANGELOG entry
  - A release plan in `docs/release-management.md`
- Use merge methods consistently (squash for small changes, merge commit for features).

## Examples of constructive review comments

- Describe the problem and propose actionable changes:
  - "This function throws on null input; consider adding a guard clause and a unit test."
- Reference design docs or style guides:
  - "Prefer using `async/await` consistent with the codebase; see `docs/style-guide.md`."

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
