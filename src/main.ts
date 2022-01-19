/* eslint-disable no-console */
import * as core from '@actions/core'
import {PullRequestConnector} from './pullRequestConnector'
import {JiraConnector} from './jiraConnector'

async function run(): Promise<void> {
  try {
    const pullRequestConnector = new PullRequestConnector()
    const {
      reviewApproved,
      reviewChangeRequest,
      sourceBranch
    } = pullRequestConnector

    if (!sourceBranch) {
      process.exit(0)
    }

    const jiraConnector = new JiraConnector(sourceBranch)
    const issueKey = jiraConnector.getIssueKey()
    console.log('reviewChangeRequest:', reviewChangeRequest)
    console.log('reviewApproved:', reviewApproved)

    if (issueKey && reviewApproved) {
      await jiraConnector.setApprovedLabel()
      console.log(`Review approved label set`)
    }

    if (issueKey && reviewChangeRequest) {
      await jiraConnector.setChangeRequestLabel()
      console.log(`Review change request label set`)
    }

    process.exit(0)
  } catch (error) {
    console.log('Error: ', (error as Error).message)
    core.setFailed((error as Error).message)
  }
}

run()
