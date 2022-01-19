import {getInputs} from './inputs'
import * as github from '@actions/github'
import {Context} from '@actions/github/lib/context'
import {Octokit} from '@octokit/core'
import {Api} from '@octokit/plugin-rest-endpoint-methods/dist-types/types'
import {PaginateInterface} from '@octokit/plugin-paginate-rest'

export class PullRequestConnector {
  context: Context
  octokit: Octokit &
    Api & {
      paginate: PaginateInterface
    }

  constructor() {
    const {GITHUB_TOKEN} = getInputs()
    this.octokit = github.getOctokit(GITHUB_TOKEN)
    const {context} = github
    this.context = context
  }

  get reviewApproved(): boolean {
    return this.context.payload.review.state === 'approved'
  }

  get reviewChangeRequest(): boolean {
    return this.context.payload.review.state === 'changes_requested'
  }

  get sourceBranch(): string | undefined {
    const {pull_request} = this.context.payload
    return pull_request?.head.ref
  }
}
