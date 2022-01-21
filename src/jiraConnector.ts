/* eslint-disable no-console */
import JiraApi, {IssueObject} from 'jira-client'
import {getInputs} from './inputs'

export class JiraConnector {
  private jira: JiraApi
  private issueKey: string

  constructor(prSourceBranch: string) {
    const {JIRA_URL, JIRA_USER, JIRA_PASSWORD, JIRA_ISSUE_REGEX} = getInputs()

    this.jira = new JiraApi({
      protocol: 'https',
      host: JIRA_URL,
      username: JIRA_USER,
      password: JIRA_PASSWORD,
      apiVersion: '2',
      strictSSL: true
    })

    if (JIRA_ISSUE_REGEX) {
      const customRegex = new RegExp(JIRA_ISSUE_REGEX)
      const issueKey = prSourceBranch.match(customRegex)
      this.issueKey = issueKey && issueKey[1] ? issueKey[1] : ''
    } else {
      this.issueKey = prSourceBranch
    }
  }

  getIssueKey(): string {
    return this.issueKey
  }

  private async setLabel(label: string): Promise<void> {
    const {
      APPROVED_LABEL_NAME,
      REQUEST_CHANGE_LABEL_NAME,
      JIRA_WORKFLOW_ID
    } = getInputs()

    const removeLabelQuery: IssueObject = {
      update: {
        labels: [
          {remove: APPROVED_LABEL_NAME},
          {remove: REQUEST_CHANGE_LABEL_NAME}
        ]
      }
    }
    try {
      await this.jira.updateIssue(this.issueKey, removeLabelQuery)
      const addLabelQuery: IssueObject = {update: {labels: [{add: label}]}}
      await this.jira.updateIssue(this.issueKey, addLabelQuery)
      if (label === REQUEST_CHANGE_LABEL_NAME && JIRA_WORKFLOW_ID) {
        const transitionQuery: IssueObject = {
          transition: {id: JIRA_WORKFLOW_ID}
        }
        await this.jira.transitionIssue(this.issueKey, transitionQuery)
      }
    } catch (error) {
      console.log('error')
      console.log('error: ', error)
      // return Promise.reject(error)
    }
  }

  async setApprovedLabel(): Promise<void> {
    const {APPROVED_LABEL_NAME} = getInputs()
    return await this.setLabel(APPROVED_LABEL_NAME)
  }

  async setChangeRequestLabel(): Promise<void> {
    const {REQUEST_CHANGE_LABEL_NAME} = getInputs()
    return await this.setLabel(REQUEST_CHANGE_LABEL_NAME)
  }
}
