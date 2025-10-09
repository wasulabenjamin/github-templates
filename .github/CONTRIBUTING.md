# Contributing Guidelines

Looking to contribute something to **github-templates?**

**Here's to how you can help.**

Please take a moment to review this document to make the contribution process easy and effective for everyone involved.

Following these guidelines helps to communicate that you respect the time of the developers managing and developing this
open source project. In return, they should reciprocate that respect in addressing your issue or assessing patches and
features.

## Development Workflow

### Branching Strategy

We follow a structured branching strategy.
Please read the [Branching Strategy Guide](DEVELOPMENT_WORKFLOW.md) for detailed information.

### Commit Conventions

All commits must follow our commit message conventions.
See the [Commit Conventions Guide](DEVELOPMENT_WORKFLOW.md) for detailed information.

## Using the issue tracker

The [issue tracker][issue_tracker] is the preferred channel for [bug reports][report_bug] and
[features requests][request_feature] and submitting pull requests, but please respect the following restrictions:
* Please **do not** use the issue tracker for personal support requests.
* Please **do not** derail or troll issues. Keep the discussion on the topic and respect the opinions of others.

## Issues and labels

The bug tracker uses several labels to help organize and identify issues. Here's what they represent and how we use
them:

- `blocked` - Waiting for something external (dependency, info)
- `bug` - A confirmed or suspected defect in functionality
- `chore` - Routine maintenance, dependency updates, or build process changes
- `documentation` - Improvements or additions to documentation
- `duplicate` - This issue or pull request already exists
- `enhancement` - An improvement to existing feature
- `feature` - New feature or request
- `good first issue` - Beginner-friendly: for on-boarding contributors
- `help wanted` - Extra attention is needed
- `invalid` - This doesn't seem right
- `needs triage` - Unreviewed: awaiting team assignment or confirmation
- `question` - Further information is requested
- `security` - Vulnerability or risk issue
- `wontfix` - This will not be worked on
- `work in progress` - Currently being worked on

For a complete look at our labels, see the [github-templates labels page.][gh_templates_labels]

> Issues may be auto-closed after 30 days of inactivity. You can reopen anytime if still relevant.

## Bug reports

A bug is a _demonstrable problem_ that is caused by the code in the repository. Good bug reports are extremely helpful,
so, thanks!

Guidelines for bug reports:
* **Validate your code** &mdash; To ensure your problem isn't caused by a simple error in your own code.
* **Use the GitHub issue search** &mdash; Check if the issue has already been reported.
* **Check if the issue has been fixed** &mdash; Try to reproduce it using the latest `main` or `development` branch in
  the repository.

A good bug report shouldn't leave contributors needing to chase you up for more information. Please try to be as
detailed as possible in your report. What is your environment? What steps will reproduce the issue? What browser(s)
experience the problem? Do other browser(s) show the bug differently? What would you expect to be the outcome? All these
details will help fix any potential bugs.

Example:
> Describe a clear and concise description of what the bug is.
>
> Provide steps to reproduce the behavior.
>
> Provide a clear and concise description of what you expected to happen.
>
> If applicable, add screenshots to help explain your problem.
>
> Any other information you want to share that is relevant to the issue being reported. This might include the lines of
code that you have identified as causing the bug, and potential solutions (and your opinions on their merits).

## Feature requests

Feature requests are welcome. But take a moment to find out whether your idea fits with the scope and aims of the
project. It's up to you to make a strong case to convince the project's developers of the merits of this feature.
Please provide as much detail and context as possible.

## Pull requests

Good pull requests &mdash; *patches, improvements, new features* &mdash; are a fantastic help. They should remain
focused in scope and avoid containing unrelated commits.

**Please ask first** before embarking on any significant pull request (e.g., implementing features, refactoring code);
otherwise you risk spending a lot of time working on something that the project's developers might not want to merge
into the project.

Please adhere to the coding guidelines and use them throughout the project (indentation, accurate comments, etc.) and
any other requirements (such as test coverage).

**Direct commits to main or develop are blocked by branch protection rules.** All work must start from a `feature/*` 
branch created off `develop`, and changes may only be merged back into `develop` through a pull request.

Adhering to the following process is the best way to get your work included in the project:
1. [Fork][fork_repo] the project, clone your fork, and configure the remotes:

   ```bash
   # Clones the repo into the current directory
   git clone https://github.com/wasulabenjamin/github-templates.git

   # Navigates to the newly cloned directory
   cd github-templates

   # Assign the original repo to a remote called "upstream"
   git remote add upstream https://github.com/wasulabenjamin/github-templates.git
   ```
2. If you cloned a while ago, get the latest changes for both `main` and `develop`:

   ```bash
   # Reset local main branch to match remote exactly, remove untracked files/directories
   # WHY `reset --hard`? Changes to main are EXTREMELY NOT TOLERATED!
   git checkout main; git fetch origin --prune; git reset --hard origin/main; git clean -fd; git log --oneline --graph --decorate -10

   # Reset local develop branch to match remote exactly, remove untracked files/directories
   # WHY `reset --hard`? Changes to develop are EXTREMELY NOT TOLERATED!
   git checkout develop; git fetch origin --prune; git reset --hard origin/develop; git clean -fd; git log --oneline --graph --decorate -10
   ```
3. Create a new topic branch (off the `develop` branch) to contain your feature, change, or fix:

   ```bash
   # Switch to develop branch first
   git checkout develop;

   # Create and switch to feature/* or fix/* branch. Push the branch immediately to remote for visibility:
   git switch -c <type/branch-name>; git push -u origin HEAD
   ```
4. Commit your changes in logical chunks. Please adhere to these [git commit message guidelines][commit_message_guides]
   or your code is unlikely to be merged into the `main` branch. Use Git's [interactive rebase][interactive_rebase]
   feature to tidy up your commits before making them public.

5. Commit changes and push your topic branch up to your branch:

   ```bash
   # Work, Commit and Push to your branch repeatedly until you're done with work
   git add --all; git commit -m "<type(optional-scope): short-summary>"; git push -u origin HEAD
   ```
6. [Open a Pull Request][pull_request] with a clear title and description against the `develop` branch.

7. After successful merge, update local development branch:

   ```bash
   # Reset local develop branch to match remote exactly, remove untracked files/directories
   # WHY `reset --hard`? Changes to develop are EXTREMELY NOT TOLERATED!
   git checkout develop; git fetch origin --prune; git reset --hard origin/develop; git clean -fd; git log --oneline --graph --decorate -10
   ```

## License

By contributing your code, you agree to license your contribution under the [MIT License][license_mit].

<!--
As you might notice, I'm using markdown "reference style" links for readability.
https://www.markdownguide.org/basic-syntax/
-->
[issue_tracker]: https://github.com/wasulabenjamin/github-templates/issues
[report_bug]: https://github.com/wasulabenjamin/github-templates/issues/new?template=bug_report.yml
[request_feature]: https://github.com/wasulabenjamin/github-templates/issues/new?template=feature_request.yml
[gh_templates_labels]: https://github.com/wasulabenjamin/github-templates/labels
[commit_message_guides]: https://tbaggery.com/2008/04/19/a-note-about-git-commit-messages.html
[interactive_rebase]: https://docs.github.com/en/get-started/using-git/about-git-rebase
[pull_request]: https://help.github.com/articles/about-pull-requests/
[license_mit]: https://github.com/wasulabenjamin/github-templates/blob/main/LICENSE
[fork_repo]: https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/working-with-forks/fork-a-repo
