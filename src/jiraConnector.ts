import JiraApi from 'jira-client'
import {getInputs} from './inputs'

export class JiraConnector {
  private jira: JiraApi
  // private jiraIssue: string

  constructor() {
    const {JIRA_URL, JIRA_USER, JIRA_PASSWORD} = getInputs()

    this.jira = new JiraApi({
      protocol: 'https',
      host: JIRA_URL,
      username: JIRA_USER,
      password: JIRA_PASSWORD,
      apiVersion: '2',
      strictSSL: true
    })
  }

  setIssueCodeFromBranch(branchName: string): string {
    const {JIRA_ISSUE_REGEX} = getInputs()
    if (JIRA_ISSUE_REGEX) {
      const customRegex = new RegExp(JIRA_ISSUE_REGEX)
      const issueKey = branchName.match(customRegex)
      return issueKey && issueKey[1] ? issueKey[1] : branchName
    }
    return branchName
  }

  async getfixVersionFromTicket(issueKey: string): Promise<string> {
    try {
      const issue = await this.jira.findIssue(issueKey)
      return issue?.fields?.fixVersions[0]?.name
    } catch (error) {
      return Promise.reject(error)
    }
  }

  isMatchedVersion(fixVersion: string, targetBranch: string): boolean {
    if (!fixVersion.includes('/')) {
      const rawBranch = targetBranch.split('/')
      if (rawBranch.length === 2) {
        return fixVersion === rawBranch[1]
      }
    }
    return fixVersion === targetBranch
  }
}
