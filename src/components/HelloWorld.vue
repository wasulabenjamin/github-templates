<!--
  - Wasula Benjamin, Copyright (c) 2025
  - Contact : wasulabenjamin@gmail.com
  -
  - Project Name  : github-templates
  - File Name     : HelloWorld.vue
  - Last Modified : 2025-11-25, 10:02pm
  -->

<script setup lang="ts">
import { ref } from 'vue';

defineProps<{ msg: string }>();

const count = ref(0);
const showDetails = ref(false);

const toggleDetails = () => {
  showDetails.value = !showDetails.value;
};
</script>

<template>
  <div class="hello-world">
    <div class="container">
      <div class="section-header">
        <h2 class="section-title">{{ msg }}</h2>
        <p class="section-subtitle">
          Explore the comprehensive GitHub Templates repository and accelerate your project setup
        </p>
      </div>

      <div class="interactive-card">
        <div class="card-content">
          <p>Get hands-on with our template features and see how they can transform your development workflow.</p>

          <div class="interactive-section">
            <button type="button" @click="count++" class="btn btn-primary">
              Template used {{ count }} {{ count === 1 ? 'time' : 'times' }}
            </button>

            <button @click="toggleDetails" class="btn btn-secondary">
              {{ showDetails ? 'Hide' : 'Show' }} project details
            </button>
          </div>

          <div v-if="showDetails" class="details-content">
            <div class="details-grid">
              <div class="detail-section">
                <h4>Project structure highlights</h4>
                <ul class="detail-list">
                  <li>
                    <strong>.github/</strong>
                    - Workflows, issue templates, and contribution guidelines
                  </li>
                  <li>
                    <strong>docs/</strong>
                    - Comprehensive documentation and best practices
                  </li>
                  <li>
                    <strong>Workflows/</strong>
                    - CI/CD, testing, deployment, and release automation
                  </li>
                  <li>
                    <strong>Templates/</strong>
                    - Bug reports, feature requests, security issues
                  </li>
                </ul>
              </div>

              <div class="detail-section">
                <h4>Key benefits</h4>
                <ul class="detail-list">
                  <li>Reduce project setup time from hours to minutes</li>
                  <li>Maintain consistency across multiple repositories</li>
                  <li>Automate repetitive tasks with GitHub Actions</li>
                  <li>Foster better collaboration with clear guidelines</li>
                  <li>Ensure code quality with built-in quality gates</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="resources-section">
        <h3>Quick links</h3>
        <div class="resource-grid">
          <a class="resource-card" href="https://github.com/wasulabenjamin/github-templates" target="_blank">
            <div class="resource-icon">📖</div>
            <div class="resource-content">
              <strong>Repository</strong>
              <span>Explore the source code</span>
            </div>
          </a>
          <a class="resource-card" href="./docs/USAGE_GUIDES/getting-started.md">
            <div class="resource-icon">🚀</div>
            <div class="resource-content">
              <strong>Getting started</strong>
              <span>Begin your journey</span>
            </div>
          </a>
          <a href="./.github/CONTRIBUTING.md" class="resource-card">
            <div class="resource-icon">🤝</div>
            <div class="resource-content">
              <strong>Contributing</strong>
              <span>Join our community</span>
            </div>
          </a>
          <a class="resource-card" href="./docs/BEST_PRACTICES/code-review-standards.md">
            <div class="resource-icon">✅</div>
            <div class="resource-content">
              <strong>Code review</strong>
              <span>Quality standards</span>
            </div>
          </a>
        </div>
      </div>

      <div class="docs-promo">
        <p>
          Learn more about creating workflows, issue templates, and CI/CD automation in
          <a class="promo-link" href="https://github.com/wasulabenjamin/github-templates" target="_blank">
            the repository documentation
          </a>
          .
        </p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.hello-world {
  padding: 4rem 0;
  background: var(--ds-background-neutral, #f7f8f9);
}

.section-header {
  text-align: center;
  margin-bottom: 3rem;
}

.section-title {
  font: var(--ds-font-headline-large, 500 2rem/1.2 'Inter', sans-serif);
  color: var(--ds-text, #172b4d);
  margin-bottom: 0.75rem;
}

.section-subtitle {
  font: var(--ds-font-body, 400 1rem/1.5 'Inter', sans-serif);
  color: var(--ds-text-subtle, #44546f);
  max-width: 600px;
  margin: 0 auto;
}

.interactive-card {
  background: var(--ds-surface, #ffffff);
  border: 1px solid var(--ds-border, #dcdfe4);
  border-radius: 12px;
  padding: 2rem;
  margin: 2rem auto;
  max-width: 800px;
  box-shadow: var(--ds-shadow-card, 0 1px 1px rgba(9, 30, 66, 0.25));
}

.card-content {
  text-align: center;
}

.card-content p {
  font: var(--ds-font-body, 400 1rem/1.5 'Inter', sans-serif);
  color: var(--ds-text, #172b4d);
  margin-bottom: 2rem;
}

.interactive-section {
  display: flex;
  gap: 1rem;
  justify-content: center;
  flex-wrap: wrap;
  margin: 2rem 0;
}

.details-content {
  margin-top: 2rem;
  padding-top: 2rem;
  border-top: 1px solid var(--ds-border, #dcdfe4);
}

.details-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
  text-align: left;
}

.detail-section h4 {
  font: var(--ds-font-headline-small, 600 1rem/1.2 'Inter', sans-serif);
  color: var(--ds-text, #172b4d);
  margin-bottom: 1rem;
}

.detail-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.detail-list li {
  padding: 0.5rem 0;
  border-bottom: 1px solid var(--ds-border-subtle, #f1f2f4);
  font: var(--ds-font-body, 400 0.875rem/1.5 'Inter', sans-serif);
  color: var(--ds-text-subtle, #44546f);
}

.detail-list li:last-child {
  border-bottom: none;
}

.detail-list strong {
  color: var(--ds-text, #172b4d);
  font-weight: 500;
}

.resources-section {
  margin: 3rem 0;
  text-align: center;
}

.resources-section h3 {
  font: var(--ds-font-headline-medium, 500 1.25rem/1.2 'Inter', sans-serif);
  color: var(--ds-text, #172b4d);
  margin-bottom: 1.5rem;
}

.resource-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
  max-width: 600px;
  margin: 0 auto;
}

.resource-card {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 1rem;
  background: var(--ds-surface, #ffffff);
  border: 1px solid var(--ds-border, #dcdfe4);
  border-radius: 8px;
  text-decoration: none;
  transition: all 0.2s ease;
  text-align: left;
}

.resource-card:hover {
  background: var(--ds-background-neutral-subtle-hovered, #f1f2f4);
  border-color: var(--ds-border-bold, #8993a4);
  transform: translateY(-1px);
}

.resource-icon {
  font-size: 1.5rem;
  flex-shrink: 0;
}

.resource-content {
  display: flex;
  flex-direction: column;
}

.resource-content strong {
  font: var(--ds-font-body, 500 0.875rem/1.2 'Inter', sans-serif);
  color: var(--ds-text, #172b4d);
  margin-bottom: 0.25rem;
}

.resource-content span {
  font: var(--ds-font-body-small, 400 0.75rem/1.2 'Inter', sans-serif);
  color: var(--ds-text-subtle, #44546f);
}

.docs-promo {
  text-align: center;
  margin-top: 2rem;
  padding-top: 2rem;
  border-top: 1px solid var(--ds-border-subtle, #f1f2f4);
}

.docs-promo p {
  font: var(--ds-font-body, 400 0.875rem/1.5 'Inter', sans-serif);
  color: var(--ds-text-subtle, #44546f);
  margin: 0;
}

.promo-link {
  color: var(--ds-link, #0c66e4);
  text-decoration: none;
  font-weight: 500;
}

.promo-link:hover {
  text-decoration: underline;
}

@media (max-width: 768px) {
  .details-grid {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }

  .interactive-section {
    flex-direction: column;
    align-items: center;
  }

  .resource-grid {
    grid-template-columns: 1fr;
  }

  .interactive-card {
    padding: 1.5rem;
    margin: 1.5rem auto;
  }
}
</style>
