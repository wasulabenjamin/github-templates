<!--
  - Wasula Benjamin, Copyright (c) 2025
  - Contact : wasulabenjamin@gmail.com
  -
  - Project Name  : github-templates
  - File Name     : App.vue
  - Last Modified : 2025-11-28, 07:37pm
  -->

<script setup lang="ts">
import HelloWorld from "./components/HelloWorld.vue";
import { onMounted, ref } from "vue";

const isDark = ref(false);

const toggleTheme = () => {
  isDark.value = !isDark.value;
  localStorage.setItem("theme", isDark.value ? "dark" : "light");
  updateTheme();
};

const updateTheme = () => {
  if (isDark.value) {
    document.documentElement.classList.add("dark-theme");
  } else {
    document.documentElement.classList.remove("dark-theme");
  }
};

onMounted(() => {
  const savedTheme = localStorage.getItem("theme") || "light";
  isDark.value = savedTheme === "dark";
  updateTheme();
});
</script>

<template>
  <div class="app">
    <!-- Atlassian-inspired Header -->
    <header class="site-header">
      <div class="header-content">
        <div class="logo-container">
          <div class="logo-wrapper">
            <img src="/vite.svg" alt="GitHub Templates Logo" class="logo" />
          </div>
          <span class="site-title">GitHub Templates</span>
        </div>
        <nav class="navigation">
          <a href="https://github.com/wasulabenjamin/github-templates" class="nav-link">Repository</a>
          <a href="./docs/USAGE_GUIDES/getting-started.md" class="nav-link">Documentation</a>
          <a href="./.github/CONTRIBUTING.md" class="nav-link">Contribute</a>
          <button
            class="theme-toggle"
            :aria-label="isDark ? 'Switch to light theme' : 'Switch to dark theme'"
            @click="toggleTheme"
          >
            <span class="theme-icon">{{ isDark ? "☀️" : "🌙" }}</span>
            <span class="theme-text">{{ isDark ? "Light" : "Dark" }}</span>
          </button>
        </nav>
      </div>
    </header>

    <!-- Main Content Container -->
    <main class="main-content">
      <!-- Hero Section -->
      <section class="hero">
        <div class="container">
          <div class="hero-content">
            <h1 class="hero-title">Accelerate your development workflow</h1>
            <p class="hero-subtitle">
              Pre-configured GitHub templates and workflows to streamline project management, code quality, and
              deployment processes. Start faster, stay consistent, automate efficiently.
            </p>
            <div class="hero-buttons">
              <a href="https://github.com/wasulabenjamin/github-templates.git" class="btn btn-primary">View demo</a>
              <a
                href="https://github.com/wasulabenjamin/github-templates/issues/new?template=bug_report.yml"
                class="btn btn-secondary"
              >
                Report bug
              </a>
              <a
                href="https://github.com/wasulabenjamin/github-templates/issues/new?template=feature_request.yml"
                class="btn btn-outline"
              >
                Request feature
              </a>
            </div>
          </div>
        </div>
      </section>

      <!-- Features Section -->
      <section class="features">
        <div class="container">
          <div class="section-header">
            <h2 class="section-title">Streamline your development process</h2>
            <p class="section-subtitle">Everything you need to set up professional GitHub workflows in minutes</p>
          </div>
          <div class="features-grid">
            <div class="feature-card">
              <div class="feature-icon">📝</div>
              <h3>Smart issue templates</h3>
              <p>
                Pre-configured templates for bug reports, feature requests, documentation issues, and security
                vulnerabilities with structured forms.
              </p>
            </div>
            <div class="feature-card">
              <div class="feature-icon">⚡</div>
              <h3>Automated workflows</h3>
              <p>
                CI/CD pipelines, automated testing, linting, deployment, and semantic versioning with GitHub Actions.
              </p>
            </div>
            <div class="feature-card">
              <div class="feature-icon">🔐</div>
              <h3>Community standards</h3>
              <p>
                Complete contributor guidelines, code of conduct, PR templates, and development workflow documentation.
              </p>
            </div>
            <div class="feature-card">
              <div class="feature-icon">📚</div>
              <h3>Comprehensive docs</h3>
              <p>Detailed guides, best practices, reference materials, and usage examples for customization.</p>
            </div>
            <div class="feature-card">
              <div class="feature-icon">🎯</div>
              <h3>Release automation</h3>
              <p>Automated semantic versioning, changelog generation with git-cliff, and release management.</p>
            </div>
            <div class="feature-card">
              <div class="feature-icon">🛡️</div>
              <h3>Code quality</h3>
              <p>Integrated code quality tools, automated testing suites, and linting configurations.</p>
            </div>
          </div>
        </div>
      </section>

      <!-- Workflow Overview -->
      <section class="workflows">
        <div class="container">
          <div class="section-header">
            <h2 class="section-title">Included workflows</h2>
            <p class="section-subtitle">Comprehensive automation for your development lifecycle</p>
          </div>
          <div class="workflow-grid">
            <div class="workflow-card">
              <h4>CI/CD Pipeline</h4>
              <p>Build, test, and lint on every pull request</p>
            </div>
            <div class="workflow-card">
              <h4>Automated Deployment</h4>
              <p>Deploy to your hosting provider on merge</p>
            </div>
            <div class="workflow-card">
              <h4>Semantic Releases</h4>
              <p>Automatic versioning and changelog generation</p>
            </div>
            <div class="workflow-card">
              <h4>Label Management</h4>
              <p>Consistent labeling across issues and PRs</p>
            </div>
            <div class="workflow-card">
              <h4>Stale Issue Management</h4>
              <p>Auto-close inactive issues and PRs</p>
            </div>
            <div class="workflow-card">
              <h4>Quality Gates</h4>
              <p>ESLint, Prettier, and testing suites</p>
            </div>
          </div>
        </div>
      </section>

      <!-- Getting Started -->
      <section class="getting-started">
        <div class="container">
          <div class="section-header">
            <h2 class="section-title">Get started in minutes</h2>
            <p class="section-subtitle">Simple setup process to accelerate your workflow</p>
          </div>
          <div class="steps">
            <div class="step">
              <div class="step-number">1</div>
              <div class="step-content">
                <h3>Use as template</h3>
                <p>Click "Use this template" on GitHub or clone the repository to start a new project.</p>
              </div>
            </div>
            <div class="step">
              <div class="step-number">2</div>
              <div class="step-content">
                <h3>Customize configuration</h3>
                <p>Update package.json, workflows, and templates to match your project's needs.</p>
              </div>
            </div>
            <div class="step">
              <div class="step-number">3</div>
              <div class="step-content">
                <h3>Configure deployment</h3>
                <p>Set up deployment secrets and hosting configuration for automatic deployments.</p>
              </div>
            </div>
            <div class="step">
              <div class="step-number">4</div>
              <div class="step-content">
                <h3>Start developing</h3>
                <p>Begin with predefined development workflow and contribution guidelines.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Interactive Component -->
      <HelloWorld msg="Start building with confidence" />

      <!-- CTA Section -->
      <section class="cta">
        <div class="container">
          <div class="cta-content">
            <h2>Ready to streamline your development?</h2>
            <p>
              Join developers who have accelerated their project setup and maintained consistency across repositories.
            </p>
            <div class="cta-buttons">
              <a class="btn btn-primary" href="https://github.com/wasulabenjamin/github-templates">
                Get started on GitHub
              </a>
              <a href="./docs/USAGE_GUIDES/getting-started.md" class="btn btn-outline">Read documentation</a>
            </div>
          </div>
        </div>
      </section>
    </main>

    <!-- Atlassian-inspired Footer -->
    <footer class="site-footer">
      <div class="container">
        <div class="footer-content">
          <div class="footer-main">
            <div class="footer-brand">
              <div class="logo-container">
                <div class="logo-wrapper">
                  <img src="/vite.svg" alt="GitHub Templates Logo" class="logo" />
                </div>
                <span class="site-title">GitHub Templates</span>
              </div>
              <p class="footer-description">
                Streamline your development workflow with pre-configured templates and automation.
              </p>
            </div>

            <div class="footer-links-grid">
              <div class="footer-section">
                <h4>Resources</h4>
                <ul class="footer-links">
                  <li>
                    <a href="./docs/USAGE_GUIDES/getting-started.md">Getting started</a>
                  </li>
                  <li>
                    <a href="./.github/CONTRIBUTING.md">Contributing guide</a>
                  </li>
                  <li>
                    <a href="./.github/CODE_OF_CONDUCT.md">Code of conduct</a>
                  </li>
                  <li>
                    <a href="./docs/BEST_PRACTICES/code-review-standards.md">Code review standards</a>
                  </li>
                </ul>
              </div>

              <div class="footer-section">
                <h4>Templates</h4>
                <ul class="footer-links">
                  <li>
                    <a href="./.github/ISSUE_TEMPLATE/bug_report.yml">Bug report</a>
                  </li>
                  <li>
                    <a href="./.github/ISSUE_TEMPLATE/feature_request.yml">Feature request</a>
                  </li>
                  <li>
                    <a href="./.github/ISSUE_TEMPLATE/security.yml">Security issue</a>
                  </li>
                  <li>
                    <a href="./.github/PULL_REQUEST_TEMPLATE.md">Pull request</a>
                  </li>
                </ul>
              </div>

              <div class="footer-section">
                <h4>Workflows</h4>
                <ul class="footer-links">
                  <li><a href="./.github/workflows/ci.yml">CI pipeline</a></li>
                  <li>
                    <a href="./.github/workflows/deploy-netlify.yml">Deployment</a>
                  </li>
                  <li><a href="./.github/workflows/semantic-release.yml">Release</a></li>
                  <li><a href="./.github/workflows/lint-checks.yml">Linting</a></li>
                </ul>
              </div>
            </div>
          </div>

          <div class="footer-bottom">
            <div class="footer-info">
              <p>
                &copy; 2025 GitHub Templates. Released under the
                <a class="footer-link" href="./LICENSE">MIT License</a>
                .
              </p>
              <p>Built with Vue 3, Vite, and TypeScript.</p>
            </div>
            <div class="footer-credits">
              <p>
                Maintained by
                <a href="https://github.com/wasulabenjamin" class="footer-link">wasulabenjamin</a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  </div>
</template>

<!--suppress CssUnusedSymbol -->
<style scoped>
.theme-toggle {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  background: var(--ds-surface-sunken, #f7f8f9);
  border: 1px solid var(--ds-border, #dcdfe4);
  border-radius: var(--ds-border-radius-200, 0.5rem);
  color: var(--ds-text, #172b4d);
  cursor: pointer;
  transition: all 0.2s ease;
  font: var(--ds-font-body, 400 1rem/1.5 "Inter", sans-serif);
}

.theme-toggle:hover {
  background: var(--ds-background-neutral-subtle-hovered, #f1f2f4);
  border-color: var(--ds-border-bold, #8993a4);
}

.theme-icon {
  font-size: 1.125rem;
}

.theme-text {
  font-weight: 500;
}

/* Dark theme adjustments for the toggle in dark mode */
:global(.dark-theme) .theme-toggle {
  background: var(--ds-background-neutral, #1d2125);
  border-color: var(--ds-border, #a6c5e229);
  color: var(--ds-text, #c7d1db);
}

:global(.dark-theme) .theme-toggle:hover {
  background: var(--ds-background-neutral-subtle-hovered, #22272b);
  border-color: var(--ds-border-bold, #9fadbc);
}
</style>
