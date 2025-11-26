# 🚑 Hotfix Pull Request

## ⚠️ Pre-Requisites

> ⚠️ **CRITICAL**: Hotfix PRs must target `main` branch only
> This is for urgent production fixes that cannot wait for normal release cycle
> Must be followed by immediate back-merge to `develop`

**Emergency Checklist:**

- [ ] Fix addresses critical production issue (downtime, security, data loss)
- [ ] All CI checks pass locally
- [ ] Branch follows naming: `hotfix/<issue-number-or-description>`
- [ ] Fix has been tested in staging/equivalent environment

## 🎯 Purpose

<!--- 
Describe the critical issue and your emergency fix in detail
Include: Impact, Root Cause, Solution, Rollback Plan
-->

**Production Impact:**
<!-- What is breaking in production? -->

**Root Cause:**
<!-- What caused the issue? -->

**Emergency Fix:**
<!-- How does this resolve the issue immediately? -->

**Rollback Plan:**
<!-- How can we quickly revert if this causes issues? -->

## 🧩 Related Issue

Closes #ISSUE_ID <!--- Link to the critical issue -->

## 🚨 Emergency Validation

<!-- Mark with an `x` all the checkboxes that apply. -->

- [ ] 🔥 Fix addresses immediate production threat
- [ ] ⚡ Minimal, focused changes only
- [ ] 🧪 Fix tested in isolated environment
- [ ] 🔍 No unintended side effects introduced
- [ ] 📋 Rollback procedure documented

## 🚀 Deployment Readiness

- [ ] **URGENT**: Ready for immediate production deployment
- [ ] Back-merge to `develop` planned post-deployment
- [ ] Team notified of emergency release

## 📸 Evidence

<!-- Screenshots, logs, or monitoring data showing the issue and fix -->

## 🗒️ Emergency Context

<!-- Additional context about the emergency situation -->

## 🚦 Validation Status

<!-- For maintainers -->

- [ ] Emergency code review completed
- [ ] Critical path tests passing
- [ ] Ready for immediate production deployment
