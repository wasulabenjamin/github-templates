# Frequently Asked Questions

This FAQ covers common questions about using and maintaining the `github-templates` repository. It is targeted at
developers, maintainers, and repository administrators.

## General Questions

### What is this project?

**Q: What exactly are "GitHub Templates" and what problem do they solve?**

**A**: GitHub Templates is a production-ready GitHub repository setup that provides:

- Standardized issue and pull request templates
- Automated GitHub Actions workflows for CI/CD
- Community management tools (CODE_OF_CONDUCT, CONTRIBUTING)
- Best practices for open source and enterprise projects

It solves the problem of every project reinventing the wheel for their GitHub setup, ensuring consistent quality and
saving development time.

### Who is this for?

**Q: What types of projects benefit from these templates?**

**A**: These templates are designed for:

| Project Type              | Benefits                                                           |
| ------------------------- | ------------------------------------------------------------------ |
| **Open Source**           | Professional issue triage, automated releases, community standards |
| **Enterprise Teams**      | Consistent workflows, security scanning, deployment automation     |
| **Startups**              | Rapid setup, scalable processes, best practices from day one       |
| **Individual Developers** | Professional project presentation, automated maintenance           |

### How do I get started?

**Q: What's the quickest way to start using these templates?**

**A**:

1. **Fork this repository**
2. **Copy the `.github` directory** to your project
3. **Customize the templates** for your specific needs
4. **Configure secrets** for deployment (if needed)

See [Getting Started Guide][getting-started] for detailed instructions.

## Setup and Configuration

### Template Installation

**Q: Do I need to copy all the files? Can I pick and choose?**

**A**: You can use the templates modularly:

- **Full setup**: Copy the entire `.github` directory
- **Partial setup**: Copy specific components you need
- **Custom setup**: Mix and match with your existing templates

The templates are designed to work together but can function independently.

### Repository Requirements

**Q: What are the requirements for using these templates?**

**A**:

- **GitHub repository** (any plan: Free, Pro, Team, or Enterprise)
- **GitHub Actions enabled** (enabled by default)
- **Basic understanding** of YAML and GitHub workflows
- **Appropriate permissions** to modify repository settings

### Customization

**Q: How much customization is needed for my specific project?**

**A**: The templates are designed to work out-of-the-box, but we recommend:

| Customization Level | Effort        | Recommended For                    |
| ------------------- | ------------- | ---------------------------------- |
| **Basic**           | 15-30 minutes | Personal projects, quick starts    |
| **Standard**        | 1-2 hours     | Most open source projects          |
| **Comprehensive**   | Half day      | Enterprise teams, complex projects |

## Workflow Questions

### GitHub Actions

**Q: Will these workflows work with my existing CI/CD setup?**

**A**: Yes, these workflows can:

- **Complement** your existing CI/CD
- **Replace** specific parts of your automation
- **Run alongside** other workflow files
- Be **selectively disabled** if not needed

Each workflow is independent and can be modified or removed.

### Cost and Usage

**Q: How much will these workflows cost to run?**

**A**: GitHub Actions pricing:

| Plan           | Included Minutes     | Cost Beyond   |
| -------------- | -------------------- | ------------- |
| **Free**       | 2,000 minutes/month  | N/A           |
| **Pro**        | 3,000 minutes/month  | $0.008/minute |
| **Team**       | 10,000 minutes/month | $0.008/minute |
| **Enterprise** | 50,000 minutes/month | $0.008/minute |

Most small-to-medium projects stay well within free tier limits.

### Performance Impact

**Q: Will this slow down my development process?**

**A**: Actually, they'll likely speed it up:

- **Fast feedback**: Lint workflow runs in 1–2 minutes
- **Parallel execution**: Multiple workflows can run simultaneously
- **Smart caching**: Dependencies and build outputs are cached
- **Conditional triggers**: Workflows only run when relevant files change

## Template Specific Questions

### Issue Templates

**Q: Why use YAML issue forms instead of Markdown templates?**

**A**: YAML issue forms provide:

| Feature             | YAML Forms                    | Markdown Templates    |
| ------------------- | ----------------------------- | --------------------- |
| **Validation**      | ✅ Required fields, dropdowns | ❌ No validation      |
| **Structured Data** | ✅ Consistent formatting      | ❌ Free-form text     |
| **Better UX**       | ✅ Guided forms               | ❌ Text areas only    |
| **Automation**      | ✅ Auto-labels, assignees     | ⚠️ Limited automation |

### Multiple PR Templates

**Q: How does GitHub choose which PR template to use?**

**A**: GitHub automatically selects templates based on:

- **File patterns** changed in the PR
- **Template filename** conventions
- **Default fallback** behavior

For now, this setup includes `PULL_REQUEST_TEMPLATE.md`

## Deployment Questions

### Supported Platforms

**Q: Which deployment platforms are supported?**

**A**: Currently supported:

| Platform     | Workflow     | Status                  |
| ------------ | ------------ | ----------------------- |
| **Netlify**  | `deploy.yml` | ⚠️ Manual configuration |
| **Vercel**   | `deploy.yml` | ⚠️ Manual configuration |
| **Supabase** | `deploy.yml` | ⚠️ Manual configuration |
| **AWS**      | Custom setup | ⚠️ Manual configuration |
| **Docker**   | Custom setup | ⚠️ Manual configuration |

### Adding New Platforms

**Q: How do I add support for another deployment platform?**

**A**:

1. **Add platform-specific steps** to `deploy.yml`
2. **Configure required secrets** in repository settings
3. **Update environment configurations**
4. **Test deployment** in staging first

See [Deployment Setup Guide][deployment-setup] for examples.

## Troubleshooting Common Issues

### Workflow Not Triggering

**Q: My workflow isn't running when I push changes. Why?**

**A**: Common causes and solutions:

1. **Check file location**: Workflows must be in `.github/workflows/`
2. **Verify YAML syntax**: Use YAML validators to check syntax
3. **Review branch filters**: Ensure your branch matches `branches:` filters
4. **Check path filters**: Verify changed files match `paths:` patterns

### Permission Errors

**Q: I'm getting "Resource not accessible by integration" errors.**

**A**: This usually means the GITHUB_TOKEN needs more permissions:

```yaml
# Add to your workflow
permissions:
  contents: write
  issues: write
  pull-requests: write
```

Or use a Personal Access Token with broader scopes.

### Template Not Appearing

**Q: My custom issue template doesn't show up in the "New issue" menu.**

**A**: Check:

1. **Directory structure**: Must be `.github/ISSUE_TEMPLATE/`
2. **File extension**: Must be `.yml` for forms
3. **YAML validity**: No syntax errors in template
4. **Config file**: Check `.github/ISSUE_TEMPLATE/config.yml`

## Advanced Usage

### Monorepo Support

**Q: Do these templates work with monorepos?**

**A**: Yes, with some configuration:

- **Path-based triggers**: Workflows can run only when specific paths change
- **Matrix strategies**: Test against multiple packages
- **Selective deployment**: Deploy only changed services

See [Workflow Explanations][workflow-explanations] for examples.

### Self-Hosted Runners

**Q: Can I use these with self-hosted GitHub runners?**

**A**: Absolutely. Modify the workflow:

```yaml
jobs:
  build:
    runs-on: [self-hosted, linux] # Use self-hosted runners
```

### Enterprise GitHub

**Q: Do these work with GitHub Enterprise Server?**

**A**: Mostly yes, but check:

- **GitHub Actions availability**: Required feature
- **Supported versions**: Some newer actions may not work
- **Network access**: Self-hosted runners may have firewall considerations

## Migration Questions

### From Existing Setup

**Q: I already have GitHub workflows. Will these conflict?**

**A**: They can coexist. We recommend:

1. **Test in a branch** first
2. **Gradually adopt** workflows one by one
3. **Compare and merge** with existing workflows
4. **Monitor for conflicts** in workflow names or outputs

### From Other Template Systems

**Q: I'm using another template system. How do I migrate?**

**A**: Migration steps:

1. **Backup your current setup**
2. **Compare templates** side by side
3. **Merge customizations** you want to keep
4. **Test thoroughly** before replacing
5. **Update documentation** for your team

## Community and Support

### Getting Help

**Q: Where can I get help if I'm stuck?**

**A**:

1. **Check documentation**: This FAQ and other guides
2. **Search issues**: Look for similar problems
3. **Community discussions**: Ask in GitHub Discussions
4. **Create an issue**: For bugs and feature requests

### Contributing Back

**Q: How can I contribute improvements?**

**A**: We welcome contributions!

1. **Fork the repository**
2. **Make your changes**
3. **Test thoroughly**
4. **Submit a pull request**

See [.github/CONTRIBUTING.md][CONTRIBUTING] for details.

## Best Practices

### Security Considerations

**Q: What security practices should I follow?**

**A**:

- **Never commit secrets** to version control
- **Use environment-specific configurations**
- **Regularly update dependencies**
- **Enable security scanning workflows**
- **Review third-party action usage**

### Performance Optimization

**Q: How can I optimize workflow performance?**

**A**:

- **Use caching** for dependencies and build outputs
- **Split large workflows** into smaller, parallel jobs
- **Use path filters** to avoid unnecessary runs
- **Optimize Docker images** for faster startup

## Version and Updates

### Template Updates

**Q: How do I get updates to the templates?**

**A**: Since you copy the templates to your repository, updates aren't automatic. We recommend:

1. **Periodically check** for new releases
2. **Review changelog** for relevant improvements
3. **Manually apply updates** that benefit your project
4. **Subscribe to releases** to get notifications

### Compatibility

**Q: How do I know if an update is compatible with my setup?**

**A**:

- **Check release notes** for breaking changes
- **Test in a branch** before applying to main
- **Review workflow changes** for compatibility
- **Backup your current setup** before updating

## See Also

- [Community Discussions](https://github.com/wasulabenjamin/github-templates/discussions)
- [GitHub Issues](https://github.com/wasulabenjamin/github-templates/issues)
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

[getting-started]: ./USAGE_GUIDES/getting-started.md
[customizing-templates]: ./USAGE_GUIDES/customizing-templates.md
[workflow-explanations]: ./USAGE_GUIDES/workflow-explanations.md
[deployment-setup]: ./USAGE_GUIDES/deployment-setup.md
[template-fields]: ./REFERENCE/template-fields.md
[workflow-triggers]: ./REFERENCE/workflow-triggers.md
[permissions-needed]: ./REFERENCE/permissions-needed.md
[troubleshooting]: ./REFERENCE/troubleshooting.md
[issue-triage]: ./BEST_PRACTICES/issue-triage.md
[code-review-standards]: ./BEST_PRACTICES/code-review-standards.md
[release-management]: ./BEST_PRACTICES/release-management.md
[ROADMAP]: ./ROADMAP.md
[FAQ]: ./FAQ.md
[INTEGRATIONS]: ./INTEGRATIONS.md
[CONTRIBUTING]: ../.github/CONTRIBUTING.md
