/* eslint-disable no-console */
import * as core from '@actions/core'
import {PullRequestConnector} from './pullRequestConnector'
// import {JiraConnector} from './jiraConnector'

async function run(): Promise<void> {
  try {
    const pullRequestConnector = new PullRequestConnector()
    // const jiraConnector = new JiraConnector()

    const {reviewApproved, reviewChangeRequest} = pullRequestConnector
    console.log('reviewChangeRequest:', reviewChangeRequest)
    console.log('reviewApproved:', reviewApproved)

    // if (reviewApproved) {
    //   jiraConnector.setApprovedLabel()
    //   console.log(`Review approved label set`)
    //   process.exit(0)
    // }

    // if (reviewChangeRequest) {
    //   jiraConnector.setChangeRequestLabel()
    //   console.log(`Review change request label set`)
    //   process.exit(0)
    // }

    process.exit(0)
  } catch (error) {
    console.log('Error: ', (error as Error).message)
    core.setFailed((error as Error).message)
  }
}

run()
