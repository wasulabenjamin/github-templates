# Issue Triage Best Practices

Effective strategies for managing, categorizing, and resolving GitHub issues using the standardized templates and
workflows.

## Triage Workflow Overview

### Standard Triage Process

```bash
graph TD
  A[New Issue Created] → B{Template Used?}
  B → Yes ? C[Automated Labeling]
  B → No  ? D[Manual Triage Required]
  C → E[Priority Assessment]
  D → E.
  E → F [Assignee Selection]
  F → G [Milestone Planning]
  G → H [Development]
```

### Triage Team Responsibilities

| Role                   | Responsibilities                        |
| ---------------------- | --------------------------------------- |
| **Triage Lead**        | Overall process management, escalation  |
| **Maintainers**        | Technical assessment, priority setting  |
| **Contributors**       | Initial response, information gathering |
| **Community Managers** | User communication, duplicate detection |

## Automated Triage Features

### Template-Based Automation

The issue templates automatically:

1. **Apply labels** based on a template type.
2. **Set assignees** via CODEOWNERS rules
3. **Add to projects** based on an issue type.
4. **Trigger workflows** for validation

### Label Strategy

#### Priority Labels

| Label                | Color   | Response Time | Description                  |
| -------------------- | ------- | ------------- | ---------------------------- |
| `priority: critical` | #B60205 | 24 hours      | System down, security issues |
| `priority: high`     | #D93F0B | 3 days        | Major functionality broken   |
| `priority: medium`   | #FBCA04 | 1 week        | Important enhancements       |
| `priority: low`      | #0E8A16 | 2 weeks       | Nice-to-have improvements    |

#### Type Labels

| Label           | Usage                    | Auto-applied            |
| --------------- | ------------------------ | ----------------------- |
| `bug`           | Unexpected behavior      | Yes - bug template      |
| `enhancement`   | Feature requests         | Yes - feature template  |
| `documentation` | Docs improvements        | Yes - docs template     |
| `security`      | Security vulnerabilities | Yes - security template |
| `question`      | User questions           | Manual                  |

#### Status Labels

| Label            | Meaning               | Next Action              |
| ---------------- | --------------------- | ------------------------ |
| `needs-triage`   | Initial state         | Assign priority/assignee |
| `needs-info`     | Waiting on user       | Follow up in 3 days      |
| `ready-for-work` | Ready for development | Assign to sprint         |
| `in-progress`    | Actively being worked | Update weekly            |
| `blocked`        | Waiting on dependency | Identify blocker         |

## Manual Triage Procedures

### Initial Triage Checklist

For each new issue, a triage team should:

- [ ] **Verify completeness**: All required template fields are filled
- [ ] **Check for duplicates**: Search existing issues
- [ ] **Assess priority**: Based on impact and urgency
- [ ] **Identify scope**: Single component or cross-cutting
- [ ] **Determine complexity**: Simple fix or major effort
- [ ] **Set appropriate labels**: Type, priority, area
- [ ] **Assign to correct team**: Using CODEOWNERS

### Information Gathering

When issues lack information, use this template:

```markdown
## 🔍 More Information Needed

Thanks for reporting this issue! To help us investigate, could you please provide:

**Required Information:**

- [ ] Steps to reproduce the issue
- [ ] Expected vs. actual behavior
- [ ] Environment details (OS, browser, version)
- [ ] Error messages or logs.

**Optional but Helpful:**

- [ ] Screenshots or screen recordings.
- [ ] Related configuration files.
- [ ] Performance metrics if applicable.

Please update the issue with this information and we'll investigate further.
```

Apply label: `needs-info`

### Duplicate Detection

**Common duplicate patterns**:

- Same root cause, different symptoms
- User-specific vs general issues
- Different environments, same problem

**Duplicate resolution template**:

```markdown
## ♻️ Duplicate Issue

This appears to be a duplicate of #[ISSUE_NUMBER].

**Why it's a duplicate: **

- Same underlying cause
- Similar error messages
- Affects same components

**Next steps:**

- Please subscribe to #[ISSUE_NUMBER] for updates
- Add any additional context to the original issue
- This issue will be closed in 24 hours.

Thank you for your contribution!
```

## Priority Assessment Framework

### Impact vs Urgency Matrix

|                    | High Impact          | Medium Impact      | Low Impact         |
| ------------------ | -------------------- | ------------------ | ------------------ |
| **High Urgency**   | `priority: critical` | `priority: high`   | `priority: medium` |
| **Medium Urgency** | `priority: high`     | `priority: medium` | `priority: low`    |
| **Low Urgency**    | `priority: medium`   | `priority: low`    | `priority: low`    |

### Impact Assessment Criteria

**High Impact**:

- Affects all/most users
- Core functionality broke
- Security vulnerability
- Data loss potential

**Medium Impact**:

- Affects a subset of users
- Important feature impaired
- Workaround available

**Low Impact**:

- Edge case scenario
- Cosmetic issue
- Enhancement request

### Urgency Assessment Criteria

**High Urgency**:

- System unavailable
- Security exploit active
- Business-critical function

**Medium Urgency**:

- Affecting productivity
- No workaround available
- Many users affected

**Low Urgency**:

- Workaround exists
- Minor inconvenience
- Future enhancement

## Assignment and Ownership

### CODEOWNERS-Based Assignment

The `.github/CODEOWNERS` file automatically assigns reviewers:

```markdown
# Core platform teams

/src/core/ @platform-team /src/api/ @backend-team

# Frontend components

/src/components/ @frontend-team /src/styles/ @design-system-team

# Documentation

/docs/ @tech-writers README.md @maintainers
```

### Manual Assignment Guidelines

When CODEOWNERS doesn't apply:

1. **Expertise-based**: Assign to the most knowledgeable team member
2. **Load balancing**: Distribute across team members
3. **Development phase**: Align with current sprint focus
4. **Learning opportunity**: Assign to junior members with supervision

### Reassignment Protocol

**Reassign when**:

- Original assignee is OOO > 3 days
- Issue requires different expertise
- Workload needs rebalancing
- 7+ days without activity

**Reassignment message**:

```markdown
Reassigning to @new-assignee for [reason]. @previous-assignee thanks for your work on this so far.
```

## Communication Standards

### Initial Response Times

| Priority | First Response   | Status Updates |
| -------- | ---------------- | -------------- |
| Critical | 4 business hours | Daily          |
| High     | 1 business day   | Every 3 days   |
| Medium   | 3 business days  | Weekly         |
| Low      | 1 week           | Bi-weekly      |

### Update Templates

**Progress Update**:

```markdown
## 📈 Status Update

**Current Status: ** [In progress/Blocked/Testing] **Progress:** [What's been accomplished] **Next Steps: ** [What's
coming next] **ETA:** [If available.]

**Blockers:**

- [ ] [Blocker description]
```

**Waiting for User**:

```markdown
## ⏳ Waiting for Information

We need the following to proceed:

- [ ] [Specific information needed]
- [ ] [Any logs or details]

Please provide this information within 7 days, or we may close this issue.
```

### Closure Communication

**Resolution Template**:

```markdown
## ✅ Issue Resolved

This issue has been resolved in [PR #123|Version 1.2.3].

**Resolution details:**

- [Brief description of fix]
- [Any workarounds if applicable]
- [Related documentation updates]

Thank you for reporting this issue and helping improve our project!
```

**Wontfix Template**:

```markdown
## ❌ Won't Fix

After careful consideration, we've decided not to implement this change.

**Reasoning:**

- [Technical constraints]
- [Product alignment]
- [Maintenance burden]

**Alternatives:**

- [Suggested workarounds]
- [Related features that might help]

Thank you for the suggestion!
```

## Quality Control

### Issue Validation Checklist

Before development begins:

- [ ] **Reproducible**: Steps to reproduce are clear and work
- [ ] **Specific**: Issue scope is well-defined
- [ ] **Actionable**: Clear what needs to be done
- [ ] **Valuable**: Fix provides user/business value
- [ ] **Unique**: Not a duplicate of existing issues
- [ ] **Complete**: All necessary information provided

### Definition of Ready

An issue is ready for development when:

- [ ] All acceptance criteria defined
- [ ] Technical approach discussed
- [ ] Dependencies identified
- [ ] Effort estimated
- [ ] Assignee confirmed availability
- [ ] Linked to appropriate milestone

## Metrics and Improvement

### Key Triage Metrics

| Metric              | Target             | Measurement                               |
| ------------------- | ------------------ | ----------------------------------------- |
| First response time | <24 hours          | Time from creation to first team response |
| Triage completion   | <48 hours          | Time to apply labels/assignees            |
| Information wait    | <7 days            | Time issues sit in needs-info             |
| Resolution time     | Varies by priority | Time from creation to closure             |

### Continuous Improvement

**Monthly Triage Review**:

- Analyze triage timing metrics
- Review mis-categorized issues
- Update templates based on patterns
- Train team on common mistakes

**Template Optimization**:

- Add frequently requested information to templates
- Remove unused fields
- Improve guidance text based on user questions

## Security Issue Handling

### Special Security Triage

Security issues follow a different workflow:

1. **Immediate acknowledgment** within 4 hours
2. **Private discussion** if needed
3. **Rapid assessment** of impact
4. **Coordinated disclosure** planning
5. **Priority override** for critical issues

### Security Response Team

Designate specific team members for security issues:

- Primary security contact
- Backup contacts
- Executive escalation path

## Community Engagement

### Contributor-Friendly Triage

**For new contributors**:

- Provide extra guidance
- Tag with `good-first-issue` when appropriate
- Offer mentoring if complex
- Celebrate contributions

**Recognition**:

```markdown
## 🎉 Thanks for Your Contribution!

Special thanks to @contributor for:

- [Specific contribution description]
- [Impact of their work]

We appreciate your help improving our project!
```

### Cultural Considerations

- **Assume good faith** in all interactions
- **Be patient** with non-native speakers
- **Provide constructive** feedback
- **Celebrate diversity** of perspectives

## Emergency Procedures

### Critical Issue Response

For `priority: critical` issues:

1. **Immediate** page to on-call engineer
2. **War room** creation for coordination
3. **Hourly updates** until resolved
4. **Post-mortem** within 3 business days

### Communication Escalation

| Level        | Audience           | Trigger              |
| ------------ | ------------------ | -------------------- |
| Team         | Issue participants | Normal triage        |
| Department   | Related teams      | Cross-cutting issues |
| Organization | All engineers      | Critical outages     |
| Executive    | Leadership         | Business-impacting   |

## Tooling and Automation

### Useful GitHub Features

**Saved Replies**: Create standard responses for common situations

**Issue Templates**: Ensure consistent information collection

**Automated Workflows**: Labeling, assignment, notifications

**Projects**: Visual tracking of issue states

### Integration Tools

**Slack/Discord**: Notifications for critical issues

**Monitoring**: Automatic issue creation from alerts

**CI/CD**: Link issues to deployments and releases

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
