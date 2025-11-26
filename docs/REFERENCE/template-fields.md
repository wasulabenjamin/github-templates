# Template Fields Reference

This reference documents fields and structures used in issue forms, issue templates, and pull request templates
contained in `github-templates`. It covers the supported YAML schema for GitHub Issue Forms, front matter metadata,
and common conventions used in this repository.

## Issue template front matter (legacy)

Some repositories still use simple markdown templates with YAML front matter for `name`, `about`, `labels`,
and `assignees`. Example:

```markdown
---
name: Bug report
about: Report a bug
labels: bug
assignees: ''
---
**Describe the bug**
A clear and concise description...
```

If both a YAML issue form and a legacy template exist, GitHub prefers the issue form.

## Issue Template Fields

### Common Field Types

#### Markdown Fields
Used for providing instructions or information to users.

```yaml
- type: markdown
  attributes:
    value: |
      ## Bug Report Guidelines
      Please provide detailed information about the bug...
```

**Purpose**: Instructional content that doesn't require user input
**Validation**: None (display only)

#### Text Input Fields
Single-line text input for short responses.

```yaml
- type: input
  id: version
  attributes:
    label: "Version"
    description: "What version are you using?"
    placeholder: "e.g., 1.2.3"
  validations:
    required: true
```

**Attributes**:
- `label`: Field display name
- `description`: Help text shown below the field
- `placeholder`: Example text shown in empty field
- `value`: Default value (optional)

**Validation**:
- `required`: Boolean, whether field must be filled

#### Textarea Fields
Multi-line text input for detailed descriptions.

```yaml
- type: textarea
  id: description
  attributes:
    label: "Description"
    description: "Detailed description of the issue"
    placeholder: "Describe what happened..."
    render: markdown  # or text
  validations:
    required: true
```

**Additional Attributes**:
- `render`: Format for text rendering (`markdown` or `text`)
- `value`: Default content

#### Dropdown Fields
Single-choice selection from predefined options.

```yaml
- type: dropdown
  id: priority
  attributes:
    label: "Priority"
    description: "How urgent is this issue?"
    multiple: false
    options:
      - "Low"
      - "Medium"
      - "High"
      - "Critical"
  validations:
    required: true
```

**Attributes**:
- `multiple`: Allow multiple selections (boolean)
- `options`: Array of available choices
- `default`: Default selected option (optional)

#### Checkbox Fields
Multiple selections from predefined options.

```yaml
- type: checkboxes
  id: environments
  attributes:
    label: "Affected Environments"
    description: "Where does this issue occur?"
    options:
      - label: "Development"
        required: false
      - label: "Staging"
        required: false
      - label: "Production"
        required: true
```

**Attributes**:
- `options`: Array of checkbox items, each with:
  - `label`: Checkbox text
  - `required`: Whether this must be checked

## Field IDs and Their Purposes

### Bug Report Specific Fields

| Field ID             | Type     | Purpose                            | Required |
|----------------------|----------|------------------------------------|----------|
| `what-happened`      | textarea | Description of unexpected behavior | Yes      |
| `expected-behavior`  | textarea | What you expected to happen        | Yes      |
| `reproduction-steps` | textarea | Steps to reproduce the issue       | Yes      |
| `screenshots`        | textarea | Screenshots or screen recordings   | No       |
| `environment`        | dropdown | Where the issue occurs             | Yes      |
| `browser`            | input    | Browser and version (for web apps) | No       |
| `os`                 | input    | Operating system                   | No       |

### Feature Request Fields

| Field ID         | Type     | Purpose                          | Required |
|------------------|----------|----------------------------------|----------|
| `problem`        | textarea | Problem this feature would solve | Yes      |
| `solution`       | textarea | Proposed solution                | Yes      |
| `alternatives`   | textarea | Alternative solutions considered | No       |
| `value`          | dropdown | Value to users (Low/Medium/High) | Yes      |
| `implementation` | textarea | Technical implementation notes   | No       |

### Security Issue Fields

| Field ID              | Type       | Purpose                       | Required |
|-----------------------|------------|-------------------------------|----------|
| `vulnerability-type`  | dropdown   | Type of security issue        | Yes      |
| `affected-components` | checkboxes | Which parts are affected      | Yes      |
| `impact`              | textarea   | Potential impact if exploited | Yes      |
| `reproduction`        | textarea   | Steps to reproduce            | Yes      |
| `mitigation`          | textarea   | Suggested mitigation          | No       |

## Validation Rules

### Required Field Validation

```yaml
validations:
  required: true
```

**Effect**: User cannot submit the form without completing this field
**Error Message**: "This field is required"

### Custom Validation

```yaml
validations:
  required: true
  # GitHub doesn't support regex validation natively, but you can use description to guide an input format.
```

### Conditional Validation

While GitHub Forms don't support native conditional validation, you can use the `visible` property to show/hide fields:

```yaml
- type: dropdown
  id: issue-type
  attributes:
    label: "Issue Type"
    options: ["Bug", "Feature", "Question"]
  validations:
    required: true

- type: textarea
  id: reproduction-steps
  attributes:
    label: "Reproduction Steps"
  visible:
    issue-type: ["Bug"]  # Only show for bug reports
```

## Advanced Field Configurations

### Dynamic Content with Markdown

```yaml
- type: markdown
  attributes:
    value: |
      ## Support Guidelines
      
      Before submitting, please:
      - [ ] Check the [documentation](https://docs.example.com)
      - [ ] Search [existing issues](https://github.com/org/repo/issues)
      - [ ] Review the [FAQ](https://docs.example.com/faq)
```

### Pre-filled Values

```yaml
- type: input
  id: contact-email
  attributes:
    label: "Contact Email"
    value: "{{ GITHUB.ACTOR }}@users.noreply.github.com"
```

### Multiple Selection with Checkboxes

```yaml
- type: checkboxes
  id: acceptance-criteria
  attributes:
    label: "Acceptance Criteria"
    options:
      - label: "I have read the contributing guidelines"
        required: true
      - label: "I have searched for duplicate issues"
        required: true
      - label: "This issue includes all relevant information"
        required: true
```

## Pull Request Templates

This repository uses a **default Pull Request template** as a chooser and **specialized sub-templates** for different
types of PRs.

### Default PR Template (Chooser)

GitHub automatically loads `.github/PULL_REQUEST_TEMPLATE.md`

This template acts as a **gateway**, providing links to all specialized templates:

* 🐛 Bugfix PR
* 📚 Documentation PR
* ✨ Feature PR
* 🚑 Hotfix PR
* 🏷️ Release PR

**How it works:**
When a contributor opens a new PR, they will see the default template. They must click the appropriate link to load the
sub-template that matches their work. This ensures the PR is structured correctly from the start.

### Specialized Sub-Templates

Located in `.github/PULL_REQUEST_TEMPLATE/`:

```
.github/
├── PULL_REQUEST_TEMPLATE/
│   ├── bugfix.md          # Bugfix Pull Request
│   ├── documentation.md   # Documentation Pull Request
│   ├── feature.md         # Feature Pull Request
│   ├── hotfix.md          # Hotfix Pull Request
│   └── release.md         # Release Pull Request
```

Each sub-template contains fields relevant to PR type (e.g., bugfix details, feature description, testing checklist).

#### Example: Bugfix PR (`bugfix.md`)

```markdown
## 🐛 Bugfix Summary

<!-- Describe the bug and your fix -->

## 🧪 Verification Steps

<!-- How was the bug verified/fixed? -->

## ✅ Checklist
- [ ] Branch is up-to-date with `develop`
- [ ] Tests pass
- [ ] Documentation updated if needed
```

### Adding New Custom Templates

To add a new PR type:

1. Create a new `.md` file inside `.github/PULL_REQUEST_TEMPLATE/`, e.g., `improvement.md`.
2. Add the template link to `PULL_REQUEST_TEMPLATE.md`:

```markdown
* [🚀 Improvement PR](?expand=1&template=improvement.md)
```

### Recommended Template Fields

All PR templates should ideally include:

* **Summary & motivation:** What the change does and why.
* **Checklist:** Tests, changelog, documentation updates.
* **Validation steps:** How the PR was verified.
* **Deployment notes / backward compatibility:** If relevant.

### Standard PR Template Sections

#### Description Section
```markdown
## Description
<!-- Please describe your changes in detail -->

**Changes included:**
- [ ] Feature implementation.
- [ ] Bug fix.
- [ ] Documentation update.
- [ ] Refactoring.
- [ ] Performance improvement.
```

#### Related Issues Section
```markdown
## Related Issues
<!-- Link issues that this PR addresses -->

Fixes #123
Related to #456
```

#### Testing Section
```markdown
## Testing
<!-- Describe how you tested these changes -->

**Test scenarios:**
- [ ] Unit tests added/updated.
- [ ] Integration tests passing.
- [ ] E2E tests verified.
- [ ] Manual testing completed.
```

### PR Template Variables

GitHub provides dynamic variables in PR templates:

| Variable             | Purpose                | Example                     |
|----------------------|------------------------|-----------------------------|
| `{{ GITHUB.REF }}`   | Branch reference       | `refs/heads/feature-branch` |
| `{{ GITHUB.SHA }}`   | Commit hash            | `a1b2c3d4...`               |
| `{{ GITHUB.ACTOR }}` | Username of PR creator | `octocat`                   |

### Conditional Sections in PR Templates

While not natively supported, you can use comments to guide contributors:

```markdown
<!-- For API changes -->
## API Changes
- [ ] Backward compatible
- [ ] Breaking changes documented

<!-- For database changes -->
## Database Changes
- [ ] Migrations created
- [ ] Data migration tested
```

## Best Practices for Field Design

### 1. Keep Forms Concise
- Limit to essential fields only
- Use descriptions to explain why information is needed
- Group related fields together

### 2. Provide Clear Examples
```yaml
- type: input
  id: reproduction-url
  attributes:
    label: "Reproduction URL"
    placeholder: "https://codesandbox.io/s/..."
    description: "Link to a minimal reproduction (CodeSandbox, StackBlitz, etc.)"
```

### 3. Use Appropriate Field Types
- Use `dropdown` for mutually exclusive options
- Use `checkboxes` for multiple selections
- Use `textarea` for free-form descriptions

### 4. Set Sensible Defaults
```yaml
- type: dropdown
  id: priority
  attributes:
    label: "Priority"
    options: ["Low", "Medium", "High", "Critical"]
    default: 1  # Default to "Medium"
```

### 5. Validate User Input
While GitHub doesn't support complex validation, use clear descriptions:

```yaml
- type: input
  id: node-version
  attributes:
    label: "Node.js Version"
    placeholder: "18.17.1"
    description: "Please provide the exact Node.js version (run `node --version`)"
```

## Field Dependencies and Logic

### Simple Visibility Control

```yaml
- type: dropdown
  id: platform
  attributes:
    label: "Platform"
    options: ["Web", "Mobile", "Desktop"]

- type: input
  id: browser-version
  attributes:
    label: "Browser Version"
  visible:
    platform: ["Web"]  # Only show for a web platform
```

### Complex Conditional Logic

For more complex logic, you may need multiple templates:

```yaml
# Separate templates for different platforms
- type: dropdown
  id: template-selection
  attributes:
    label: "Issue Type"
    options: 
      - "Web Bug"
      - "Mobile Bug" 
      - "Desktop Bug"
      - "Feature Request"
```

## Internationalization Considerations

### Field Labels and Descriptions

Consider supporting multiple languages:

```yaml
- type: input
  id: title
  attributes:
    label: 
      en: "Title"
      es: "Título"
      fr: "Titre"
    description:
      en: "Brief description of the issue"
      es: "Descripción breve del problema"
      fr: "Description brève du problème"
```

## Template Configuration (config.yml)

The `config.yml` file controls the overall issue template behavior

## JSON alternatives

Issue forms can also be expressed as JSON; however, YAML is more readable. Example JSON snippet equivalent:

```json
{
  "name": "Bug report",
  "description": "Report a bug",
  "body": [
    { "type": "markdown", "attributes": { "value": "Provide details." } }
  ]
}
```

## Validation Tips

- Use a YAML linter (e.g., `yamllint`) to validate syntax.
- Ensure `id` fields are unique if you rely on scripts to parse form responses.
- Test templates in a staging repository before committing to production.

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
