## How to get started

When contributing to this project please consider discussing the changes you want to make. You can do that by commenting on any `open issue` which you wanna take on. If you have a **feature request**, **bug to report** or an **idea** feel free to open a `new issue` in the **issues** tab.

## Contributing to this project

1. Fork the repo & Download it to local machine.

   ```bash
   $ git clone https://github.com/your-username/image-upload-app.git

   $ cd image-upload

   $ git remote add upstream https://github.com/ShanikaEdiriweera/image-upload-app.git
   ```

1. Make a separate branch for each issue you are working on.

   When working on a new feature, create a new branch `feature/something` from the development branch, for example `feature/login-form`.

   ```bash
   $ git checkout -b feature/my-cool-new-feature
   ```

   When fixing a bug, create a new branch `fix/something` from the development branch, for example `fix/css-btn-issues`.

1. Commit Messages

   Writing good commit logs is important. A commit log should describe what changed and why. Follow these guidelines when writing one:

   - Keep the title minimal and meaningful.
   - Keep the second line blank
   - Wrap all other lines at 72 columns.

   Example of commit message:

   ```text
   fix a bug with download url.

   The download url was not using https.
   Body of commit message is a few lines of text, explaining things
   in more detail, possibly giving some background about the issue
   being fixed, etc. etc.

   The body of the commit message can be several paragraphs, and
   please do proper word-wrap and keep columns shorter than about
   72 characters or so. That way `git log` will show things
   nicely even when it is indented.
   ```

1. Once you are done, push the changes to your forked copy of repo.

   ```bash
   $ git push origin your-new-branch
   ```

1. Once everything is completed, you should create a **Pull Request** to the original project.

1. Voila, you have successfully submitted the **Pull Reqeust**. Now wait for it to get reviewed and merged.

1. Rebase to keep updated

   Use `git rebase` to sync your work from time to time.

   ```bash
   $ git fetch upstream
   $ git rebase master
   ```

1. Updating your local

   In order to update your local environment to the latest version on `development`, you will have to pull the changes using the `upstream` repository, for example: `git pull upstream development`. This will pull all the new commits from the origin repository to your local environment.

   Let's say you've been working on a feature for a couple days, most likely there are new changes in development and your branch is behind. In order to update it to the latest (You might not need/want to do this) you need to pull the latest changes to develop and then rebase your current branch.

   ```bash
   $ git checkout development
   $ git pull upstream development
   $ git checkout feature/something-awesome
   $ git rebase development
   ```
