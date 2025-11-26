<!--suppress HtmlDeprecatedAttribute -->
<div align="center">
  <p>
    <a href="https://github.com/wasulabenjamin/github-templates.git">
      <img src="https://img.icons8.com/?size=120&id=63777&format=png&color=000000" alt="logo">
    </a>
  </p>

<h3>GitHub Templates</h3>

  <p>
    A comprehensive collection of GitHub Templates and workflows to streamline your project management, code quality, 
    and deployment processes. This repository provides pre-configured GitHub Actions, issue templates, and contribution 
    guidelines to help you set up a professional development workflow quickly.
    <br><br>
    <a href="https://github.com/wasulabenjamin/github-templates.git">View Demo</a> . 
    <a href="https://github.com/wasulabenjamin/github-templates/issues/new?template=bug_report.yml">Report Bug</a> . 
    <a href="https://github.com/wasulabenjamin/github-templates/issues/new?template=feature_request.yml">
      Request Feature
    </a>
  </p>

<br><br>
  <p>
    <a href="https://app.netlify.com/projects/wb-github-templates/deploys">
      <img 
        src="https://api.netlify.com/api/v1/badges/e6831997-1b79-4d45-99f0-26d8f890396b/deploy-status" 
        alt="Netlify Status"
      />
    </a> &nbsp;
    <a href="https://app.codacy.com/gh/wasulabenjamin/github-templates/dashboard">
      <img src="https://app.codacy.com/project/badge/Grade/64e2c7603c094223a88d0ad9b50eeb09" alt="Codacy Badge"/>
    </a> &nbsp;
    <a href="https://github.com/wasulabenjamin/github-templates/graphs/contributors">
        <img src="https://img.shields.io/github/contributors/wasulabenjamin/github-templates" alt="Contributors"/>
    </a> &nbsp;
    <a href="https://github.com/wasulabenjamin/github-templates/network/members">
      <img src="https://img.shields.io/github/forks/wasulabenjamin/github-templates" alt="Forks"/>
    </a> &nbsp;
    <a href="https://github.com/wasulabenjamin/github-templates/stargazers">
      <img src="https://img.shields.io/github/stars/wasulabenjamin/github-templates" alt="Stars"/>
    </a> &nbsp;
    <a href="https://github.com/wasulabenjamin/github-templates/issues">
      <img src="https://img.shields.io/github/issues/wasulabenjamin/github-templates" alt="Issues"/>
    </a> &nbsp;
    <a href="https://github.com/wasulabenjamin/github-templates/blob/master/LICENSE">
      <img src="https://img.shields.io/github/license/wasulabenjamin/github-templates" alt="License"/>
    </a> &nbsp;
    <a href="https://github.com/wasulabenjamin/github-templates/blob/master/.github/CODE_OF_CONDUCT.md">
      <img src="https://img.shields.io/badge/Contributor%20Covenant-2.1-4baaaa.svg" alt="Contributor Covenant v2.1"/>
    </a> &nbsp;
  </p>
  <br><br>
</div>

# 📘 Introduction

**GitHub Templates** provides a pre-configured foundation for new repositories — including workflows, issue templates,
release automation, contribution standards, and community management tools. It’s designed to help you **start faster,
stay consistent, and automate the boring stuff**.

### 🎯 Audience
Developers, maintainers, and teams that are looking to bootstrap a professional GitHub repository with minimal setup.

### ⚙️ Prerequisites
You should already be familiar with:
- Git & GitHub basics (forking, branching, pull requests)
- Basic CI/CD concepts
- YAML syntax (for modifying workflows)

# 🚀 Getting Started

### Clone or Use as Template

You can either:

1. **Use this repository as a template:** Click the **“Use this template”** button on GitHub, or.

2. **Clone manually**
   ```bash
   git clone https://github.com/wasulabenjamin/github-templates.git
   cd github-templates
   ```

### Customize for Your Project

* Update `README.md` with your project info and
* Delete everything in `CHANGELOG.md` as this will be regenerated
* Edit `.github/workflows/` to match your CI/CD stack
* Adjust `.github/LABELS.yml` and issue templates to suit your workflow
* Review docs in `/docs/USAGE_GUIDES` for in-depth customization steps

> 📝 Pro tip: Keep this repository separate from your product codebase — treat it as your **“template blueprint”**.

# Project Structure

Below is an overview of the repository structure and the purpose of each main directory.  
The goal is to keep the repo clean, modular, and easy to adapt for any new GitHub project.

```bash
github-templates/
├── .github/                           # GitHub workflows, templates & contribution guidelines
│   ├── ISSUE_TEMPLATE/                # Predefined GitHub issue templates
│   │   ├── bug_report.yml             # Template for bug reports
│   │   ├── config.yml                 # Provides other contact links
│   │   ├── documentation.yml          # Template for documentation issues
│   │   ├── feature_request.yml        # Template for feature requests
│   │   └── security.yml               # Template for security issues
│   │
│   ├── PULL_REQUEST_TEMPLATE/         # Directory for custom templates
│   │   ├── bugfix.md                  # Bugfix Pull Request
│   │   ├── documentation.md           # Documentation Pull Request
│   │   ├── feature.md                 # Feature Pull Request
│   │   ├── hotfix.md                  # Hotfix Pull Request
│   │   └── release.md                 # Release Pull Request
│   │
│   ├── workflows/                     # Predefined GitHub workflows
│   │   ├── ci.yml                     # Ensures build + lint + test pass on PRs
│   │   ├── deploy-netlify.yml         # Auto-deploys to target host on merge or push to `main`
│   │   ├── lint-checks.yml            # Runs ESLint + Prettier independently - on push & PR for quick feedback
│   │   ├── pr-issue-handler.yml       # A smart Issues and PRs handler 
│   │   ├── run-tests.yml              # Runs Vitest/Playwright suites - Keeps CI cleanly separated; may run parallel
│   │   ├── semantic-release.yml       # Generates changelog + semantic version tag
│   │   ├── sync-labels.yml            # Overwrites GitHub labels with our defined LABELS.yml
│   │   ├── sync-main-to develop.yml   # Automatically syncs main changes to develop
│   │   ├── update-changelog.yml       # Generate CHANGELOG.md file with git-cliff
│   │   └── validate-branches.yml      # Helper for main branch rules to accept merges from only release/* or hotfix/*
│   │
│   ├── BRANCH_PROTECTION_RULES.json   # Branch rulesets for `main` and `develop`
│   ├── CODE_OF_CONDUCT.md             # Community guidelines
│   ├── CODEOWNERS                     # Defines ownership and auto-review assignment rules
│   ├── CONTRIBUTING.md                # Contribution rules & setup
│   ├── DEVELOPMENT_WORKFLOW.md        # Defines how branches are organized and how commits are structured
│   ├── LABELS.yml                     # Defines our own labels
│   └── PULL_REQUEST_TEMPLATE.md       # Default template (always loaded by GitHub UI)
│
├── .vscode/
│   └── extensions.json
│
├── docs/                              # Project documentation
│   ├── BEST_PRACTICES/
│   │   ├── code-review-standards.md   # Using the PR templates effectively
│   │   ├── issue-triage.md            # How to handle different issue types
│   │   └── release-management.md      # Semantic versioning and changelog best practices
│   │
│   ├── REFERENCE/
│   │   ├── permissions-needed.md      # Required repo permissions for workflows
│   │   ├── template-fields.md         # Explanation of each template field
│   │   ├── troubleshooting.md         # Common issues and solutions
│   │   └── workflow-triggers.md       # When each workflow runs (events, branches)
│   │
│   ├── USAGE_GUIDES/
│   │   ├── customizing-templates.md   # How to modify templates for specific needs
│   │   ├── deployment-setup.md        # How to configure auto-deployment (Vercel/Netlify/etc.)
│   │   ├── getting-started.md         # How to use these templates in a new project
│   │   └── workflow-explanations.md   # Detailed breakdown of each GitHub Action workflow
│   │
│   ├── FAQ.md                         # Frequently asked questions
│   ├── INTEGRATIONS.md                # How these templates work with other tools
│   └── ROADMAP.md                     # Future plans for the template project
│
├── public/
│   ├── 404.html                       # Fallback error page, (plain HTML/CSS, maybe a reload-to-home link)
│   ├── favicon.ico                    # Browser favicon
│   ├── icon.png                       # App icon (PNG)
│   ├── robots.txt                     # Robots (SEO crawler rules)
│   ├── site.webmanifest               # PWA manifest
│   └── vite.svg                       # App icon (SVG)
│
├── scripts/
│   └── generate-sitemap.js
│
├── src/
│   ├── assets/
│   │   └── css/
│   │       └── style.css              # Main project style-sheet
│   ├── components/
│   │   └── HelloWOrld.vue
│   ├── App.vue
│   └── main.ts
│
├── .codacy.yaml                       # Codacy config (code quality)
├── .gitignore                         # Files ignored by Git
├── .prettierrc
├── CHANGELOG.md                       # Changelog (release history)
├── cliff.toml                         # git-cliff ~ configuration file
├── eslint.config.js
├── index.html
├── LICENSE                            # License file
├── package.json
├── README.md                          # Project documentation
├── stylelint.config.js
├── tsconfig.app.json
├── tsconfig.json
├── tsconfig.node.json
└── vite.config.ts
```

### 🧭 Quick Summary

* **`.github/`** → The automation and governance center. Houses workflows, issue templates, and contributor rules.
* **`docs/`** → Your knowledge base. Contains guides, standards, and reference docs for setup and usage.
* **Root Files** → Define project metadata, ignore rules, versioning, and quality configurations.
* **`CHANGELOG.md` & `cliff.toml`** → Together manage semantic versioning and automated release notes.
* **`LICENSE`** → Specifies terms of use for open-source sharing and collaboration.

> See [`docs/`](./docs) for deeper explanations and examples of customization.

### ⚡️ Workflows Overview

Each GitHub Action in `.github/workflows` automates a specific lifecycle task:

| Workflow                     | Purpose                                            | Trigger                                              |
|------------------------------|----------------------------------------------------|------------------------------------------------------|
| **sync-labels.yml**          | Synchronizes customs labels with GitHub            | Changes to `.github/LABELS.yml`                      |
| **lint-checks.yml**          | Run ESLint and Prettier checks                     | `push`, specified file types and folders             |
| **run-tests.yml**            | Run Vitest/Playwright test suites                  | `push`, specified file types and folders             |
| **validate-branches.yml**    | Allow project defined PRs, inject custom PR bodies | On every pull request                                |
| **pr-issue-handler.yml**     | Smartly handle issues and PRs                      | Schedule and Successful PR merge to `main/develop`   |
| **update-changelog.yml**     | Update `CHANGELOG.md` via git-cliff                | `push`, non-docs changes                             |
| **sync-main-to-develop.yml** | Keeps `main` and `develop` in sync                 | `workflow_run:` run after changelog-workflow on main |
| **ci.yml**                   | Run tests and linters then builds project          | `push`, `pull_request`,                              |
| **semantic-release.yml**     | Generate changelog + semantic release              | `workflow_run:` run after ci-workflow on main        |
| **deploy-netlify.yml**       | Auto-deploy app to hosting provider Netlify        | `workflow_run:` run after ci-workflow on main        |

👉 For a detailed explanation, check [`docs/USAGE_GUIDES/workflow-explanations.md`][workflow-explanations]

### 📝 Templates & Guidelines

- **Issue Templates** - Bug reports, feature requests, security issues, documentation
- **Pull Request Template** - Standardized PR submissions
- **Code of Conduct** - Community guidelines
- **Contributing Guide** - Contribution rules & setup
- **Development Workflow** - Branch organization and commit structure

# 🧩 Contributing Guidelines

This is an open source example template, therefore, developers are encouraged to contribute and help maintain the
project throughout its life cycle. Any contributions will be highly appreciated.

Looking to contribute something to this template?

* Read the [Contributing Guidelines][contributing-guidelines]
* Review our [Code of Conduct](.github/CODE_OF_CONDUCT.md)
* Follow the [Development Workflow](.github/DEVELOPMENT_WORKFLOW.md)

Ways to contribute:

1. Submit issues and feature requests
2. Improve documentation or examples
3. Enhance workflows and automation logic

# 🐛 Bugs and Feature Requests

Have a bug or a feature request? **Here is to how you can help:**

* Having problems related to this project? [Please report a bug][report-bug]
* Is your problem or idea you would wish implemented not addressed yet? [Please request a feature.][request-feature]
* Or alternatively **Ask a Question** using [Discussions][discussions]

# 🧠 Other Resources

* [Getting Started Guide][getting-started]
* [Workflow Explanations][workflow-explanations]
* [Code Review Standards][review-standards]
* [Release Management][release-management]
* [Roadmap][roadmap]

# ⚖️ License

Distributed under the **MIT License**.
See [`LICENSE`](./LICENSE) for more information.

# 💬 Acknowledgements

Inspired by common GitHub automation patterns, semantic versioning, and open-source community conventions.
If this repository saves you time, consider leaving a ⭐ — it helps others discover it.

* [JetBrains](https://www.jetbrains.com/) for a rich suite of tools that provide an exceptional developer experience.
* [GitHub](https://github.com/) for repository hosting and workflows
* [Codacy](https://www.codacy.com/) for their quality automated code quality and coverage platform.
* [Bootstrap](https://getbootstrap.com/docs/5.3) for a powerful, feature-packed front-end toolkit.
* [Tailwind](https://tailwindcss.com/docs/) Labs for incredible dev ergonomics.
* [Vite](https://vite.dev/) for a blazing fast frontend build tool powering the next generation of web applications.
* [Vue core](https://www.tutorialspoint.com/vuejs/index.htm) team for building something simple yet powerful.
* [Supabase](https://supabase.com/dashboard/org) team for simplifying backend.

<!--
As you might notice, I'm using markdown "reference style" links for readability.
https://www.markdownguide.org/basic-syntax/
-->
[contributing-guidelines]: ./.github/CONTRIBUTING.md
[discussions]: https://github.com/wasulabenjamin/github-templates/discussions
[getting-started]: ./docs/USAGE_GUIDES/getting-started.md
[report-bug]: https://github.com/wasulabenjamin/github-templates/issues/new?template=bug_report.yml
[release-management]: ./docs/BEST_PRACTICES/release-management.md
[request-feature]: https://github.com/wasulabenjamin/github-templates/issues/new?template=feature_request.yml
[review-standards]: ./docs/BEST_PRACTICES/code-review-standards.md
[roadmap]: ./docs/ROADMAP.md
[workflow-explanations]: ./docs/USAGE_GUIDES/workflow-explanations.md
