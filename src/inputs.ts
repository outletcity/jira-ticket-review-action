import * as core from '@actions/core'

interface Inputs {
  APPROVED_LABEL_NAME: string
  REQUEST_CHANGE_LABEL_NAME: string
  GITHUB_TOKEN: string
  JIRA_URL: string
  JIRA_USER: string
  JIRA_PASSWORD: string
  JIRA_ISSUE_REGEX: string
  JIRA_WORKFLOW_ID: string
}

export const getInputs = (): Inputs => {
  const APPROVED_LABEL_NAME: string = core.getInput('APPROVED_LABEL_NAME')
  const REQUEST_CHANGE_LABEL_NAME: string = core.getInput(
    'REQUEST_CHANGE_LABEL_NAME'
  )
  const GITHUB_TOKEN: string = core.getInput('GITHUB_TOKEN', {required: true})
  const JIRA_URL: string = core.getInput('JIRA_URL')
  const JIRA_USER: string = core.getInput('JIRA_USER')
  const JIRA_PASSWORD: string = core.getInput('JIRA_PASSWORD')
  const JIRA_ISSUE_REGEX: string = core.getInput('JIRA_ISSUE_REGEX')
  const JIRA_WORKFLOW_ID: string = core.getInput('JIRA_WORKFLOW_ID')

  return {
    GITHUB_TOKEN,
    APPROVED_LABEL_NAME,
    REQUEST_CHANGE_LABEL_NAME,
    JIRA_PASSWORD,
    JIRA_URL,
    JIRA_USER,
    JIRA_ISSUE_REGEX,
    JIRA_WORKFLOW_ID
  }
}
