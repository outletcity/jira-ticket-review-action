# Jira ticket review action

This action match the Jira issue fixversion and a PR target branch.

## Inputs
## `GITHUB_TOKEN`

**Required** Github Token.
## `REQUEST_CHANGE_LABEL_NAME`

Label name for change request.
## `APPROVED_LABEL_NAME`

Label name for change request.
## `JIRA_WORKFLOW_ID`

Workflow id to transition on request changes.
## `JIRA_ISSUE_REGEX`

Label name for approved reviews.
## `JIRA_URL`

**Required** Jira URL.
## `JIRA_USER`

**Required** Jira user.
## `JIRA_PASSWORD`

**Required** Jira password.

## Example usage
```
name: 'Check Review'
on:
  pull_request_review:
    types: [submitted]
jobs:
  test: # make sure the action works on a clean machine without building
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: outletcity/jira-ticket-review-action
        with:
          GITHUB_TOKEN: ${{secrets.GITHUB_TOKEN}}
          JIRA_ISSUE_REGEX: '.*(PREFIX-\d+).*'
          JIRA_URL: ${{secrets.JIRA_URL}}
          JIRA_USER: ${{secrets.JIRA_USER}}
          JIRA_PASSWORD: ${{secrets.JIRA_PASSWORD}}
          JIRA_WORKFLOW_ID: 'JIRA_WORKFLOW_ID'
          REQUEST_CHANGE_LABEL_NAME: 'LABEL_NAME'
          APPROVED_LABEL_NAME: 'LABEL_NAME'
```
