# Contributor's Guide

Feedback, bug reports, and pull requests are welcome.

Feel free to ask for help. You can reach me on Twitter @Christoph_Herr or in the [GenesisWP Slack group](genesiswp.slack.com), username christophherr.

Working on your first Pull Request? You can learn how from this _free_ series [How to Contribute to an Open Source Project on GitHub](https://egghead.io/series/how-to-contribute-to-an-open-source-project-on-github)

This guide has been modified from [freeCodeCamp's Contributors Guide](https://github.com/freeCodeCamp/freeCodeCamp/blob/staging/CONTRIBUTING.md)

## Forking the Project

### Setting Up Your System

1.  Install [Git](https://git-scm.com/) or your favorite Git client.
2.  (Optional) [Setup an SSH Key](https://help.github.com/articles/generating-an-ssh-key/) for GitHub.

### Forking prometheus

1.  Go to the top level prometheus repository: <https://github.com/christophherr/prometheus>
2.  Click the "Fork" Button in the upper right hand corner of the interface ([More Details Here](https://help.github.com/articles/fork-a-repo/))
3.  After the repository (repo) has been forked, you will be taken to your copy of the prometheus repo at <https://github.com/yourUsername/prometheus>

### Cloning Your Fork

1.  Open a Terminal / Command Line / Bash Shell in your project's directory (_i.e.: `/yourprojectdirectory/`_)
2.  Clone your fork of prometheus

```shell
$ git clone https://github.com/yourUsername/prometheus.git
```

**(make sure to replace `yourUsername` with your GitHub username)**

This will download the entire prometheus repo to your project's directory.

### Setup Your Upstream

1.  Change directory to the new prometheus directory (`cd prometheus`)
2.  Add a remote to the original prometheus repo:

```shell
$ git remote add upstream https://github.com/christophherr/prometheus.git
```

Congratulations, you now have a local copy of the prometheus repo!

### Maintaining Your Fork

Now that you have a copy of your fork, there is work you will need to do to keep it current.

#### Rebasing from Upstream

Do this prior to every time you create a branch for a PR:

1.  Make sure you are on the `staging` branch

```shell
$ git status
On branch staging
Your branch is up-to-date with 'origin/develop'.
```

If your aren't on `develop`, resolve outstanding files / commits and checkout the `develop` branch

```shell
$ git checkout develop
```

2.  Do a pull with rebase against `develop`

```shell
$ git pull --rebase upstream develop
```

This will pull down all of the changes to the official staging branch, without making an additional commit in your local repo.

3.  (_Optional_) Force push your updated develop branch to your GitHub fork

```shell
$ git push origin develop --force
```

This will overwrite the develop branch of your fork.
You don't necessarily need to use `--rebase` or `--force`.

### Create a Branch

Before you start working, you will need to create a separate branch specific to the issue / feature you're working on. You will push your work to this branch.

#### Naming Your Branch

There several strategies for naming branches.

You could name the branch something like `fix/xxx` or `feature/xxx` where `xxx` is a short description of the changes or
feature you are attempting to add. For example `fix/email-login` would be a branch where you fix something specific to email login.

I'd recommend to name it something that makes sense for what you are working on.

#### Adding Your Branch

To create a branch on your local machine (and switch to this branch):

```shell
$ git checkout -b [name_of_your_new_branch]
```

and to push to GitHub:

```shell
$ git push origin [name_of_your_new_branch]
```

**If you need more help with branching, take a look at [this](https://github.com/Kunena/Kunena-Forum/wiki/Create-a-new-branch-with-git-and-manage-branches).**

### Set Up Linting

If you have composer installed on your machine, please run `composer install` on the root of your `develop` branch.
After the installation finishes, you can run PHPCS over the code with the command `composer phpcs`.
If you don't have composer, you can go to [https://getcomposer.org/doc/00-intro.md](https://getcomposer.org/doc/00-intro.md) and follow the steps to install it.

When you open a pull request, Travis CI will run PHPCS over your code and let me know if there are any errors.

### Creating a Pull Request

#### What is a Pull Request?

A pull request (PR) is a method of submitting proposed changes to the prometheus repo (or any repo, for that matter). You will make changes to copies of the files in a personal fork, then apply to have them accepted by the original repo.

#### Need Help?

Feel free to ask for help. You can reach me on Twitter @Christoph_Herr or in the [GenesisWP Slack group](genesiswp.slack.com), username christophherr.

#### Important: ALWAYS EDIT ON A BRANCH

Take away only one thing from this document: Never, **EVER**
make edits to the `staging` branch. ALWAYS make a new branch BEFORE you edit
files. This is critical, because if your PR is not accepted, your copy of
staging will be forever sullied and the only way to fix it is to delete your
fork and re-fork.

#### Methods

There are two methods of creating a pull request for prometheus:

* Editing files on a local clone (recommended)
* Editing files via the GitHub Interface

##### Method 1: Editing via your Local Fork _(Recommended)_

This is the recommended method. Read about [How to Setup and Maintain a Local Instance](#maintaining-your-fork).

1.  Perform the maintenance step of rebasing `staging`.
2.  Ensure you are on the `staging` branch using `git status`:

        $ git status
        On branch staging
        Your branch is up-to-date with 'origin/develop'.

        nothing to commit, working directory clean

3.  If you are not on develop or your working directory is not clean, resolve any outstanding files/commits and checkout develop `git checkout develop`

4.  Create a branch off of `develop` with git: `git checkout -b branch/name-here`

5.  Edit your file(s) locally with the editor of your choice.

6.  Check your `git status` to see unstaged files.

7.  Add your edited files: `git add path/to/filename.ext` You can also do: `git add .` to add all unstaged files. Take care, though, because you can accidentally add files you don't want added. Review your `git status` first.

8.  Commit your edits. `git commit -m "your-commit-message"`

Please make sure to write a commit message that summarizes the changes.
If you find yourself in the need to use `and` it might be better to do two separate commits.

See [Useful Tips for writing better Git commit messages](https://code.likeagirl.io/useful-tips-for-writing-better-git-commit-messages-808770609503) for inspiration.

As a note, I started my commit messages in the past tense. `Added` instead of `Add`.

10. If you would want to add/remove changes to previous commit, add the files as in Step 5 earlier, and use `git commit --amend` or `git commit --amend --no-edit` (for keeping the same commit message).

11. Push your commits to your GitHub Fork: `git push origin branch/name-here`

12. Once the edits have been committed, you will be prompted to create a pull request on your fork's GitHub Page.

13. By default, all pull requests should be against the prometheus main repo, `develop` branch.
    **Make sure that your Base Fork is set to prometheus/develop when raising a Pull Request.**

14. Submit a pull request from your branch to prometheus's `develop` branch.

15. The title (also called the subject) of your PR should be descriptive of your changes and succinctly indicate what is being fixed.

    * **Do not add the issue number in the PR title or commit message.**

    * Examples: `Added missing CSS classes` `Fixed typo in readme.md`

16. In the body of your PR include a more detailed summary of the changes you made and why.

    * If the PR is meant to fix an existing bug/issue then, at the end of your PR's description, append the keyword `closes` and #xxxx (where xxxx is the issue number). Example: `closes #1337`. This tells GitHub to close the existing issue, if the PR is merged.

17. Indicate if you have tested on your local copy or not.

### Next Steps

#### If your PR is accepted

Once your PR is accepted, you may delete the branch you created to submit it. This keeps your working fork clean.

You can do this with a press of a button on the GitHub PR interface. You can delete the local copy of the branch with: `git branch -D branch/to-delete-name`

#### If your PR is rejected

Don't despair! You should receive solid feedback as to why it was rejected and what changes are needed.

Many Pull Requests, especially first Pull Requests, require correction or updating. If you have used the GitHub interface to create your PR, you will need to close your PR, create a new branch, and re-submit.

If you have a local copy of the repo, you can make the requested changes, commit them and push them to your fork.

Be sure to post in the PR conversation that you have made the requested changes.
