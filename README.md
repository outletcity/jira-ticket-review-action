# Jira ticket fixversion check action

This action match the Jira issue fixversion and a PR target branch.

## Inputs
## `GITHUB_TOKEN`

**Required** Github Token.
## `NOT_FOUND_MESSAGE`

Comment message when no Fixversion found in Jira issue.
## `JIRA_ISSUE_REGEX`

Comment message when no Fixversion found in Jira issue.
## `JIRA_URL`

**Required** Jira URL.
## `JIRA_USER`

**Required** Jira user.
## `JIRA_PASSWORD`

**Required** Jira password.

## Example usage
```
name: 'Check Fixversion'
on:
  pull_request
jobs:
  test: # make sure the action works on a clean machine without building
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: bashess/jira-ticket-version-check-action@v1.1
        with:
          GITHUB_TOKEN: ${{secrets.GITHUB_TOKEN}}
          NOT_FOUND_MESSAGE: "Keine Jira Ticket Version angegeben, bitte prüfen!"
          JIRA_ISSUE_REGEX: '.*(PREFIX-\d+).*'
          JIRA_URL: ${{secrets.JIRA_URL}}
          JIRA_USER: ${{secrets.JIRA_USER}}
          JIRA_PASSWORD: ${{secrets.JIRA_PASSWORD}}
```
