# 🏷️ Release Pull Request

## 🎯 Overview

This PR promotes the final, tested code from the `release/*` branch into `main` for production deployment. All included
changes have already been reviewed, merged, and validated on `develop` previously.

## 📄 Included Changes

For full details, refer to:

- The individual PRs merged into `develop`
- The generated `CHANGELOG.md` entry for this release (on merge)

## 🚀 Release Actions (run automatically on merge)

_Automated processes that will trigger on merge:_

- CHANGELOG.md generation via git-cliff
- Semantic versioning and tag creation
- Production deployment to target environment
- Back-merge from `main` → `develop`

## 📋 Release Readiness Checklist

- [ ] Release branch validated and up-to-date
- [ ] CI checks pass on the `release/*` branch
- [ ] No known critical issues outstanding
- [ ] Ready for production deployment
