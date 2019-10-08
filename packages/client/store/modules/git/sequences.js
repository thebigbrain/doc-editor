import { set, wait, when } from 'cerebral/operators'
import { props, state, string } from 'cerebral/tags'
import { fetchGitChanges } from '../../sequences'
import * as actions from './actions'

export const changeRepoTitle = [
  set(state`git.repoTitle`, props`title`),
  set(state`git.error`, null),
]

export const changeSubject = set(state`git.subject`, props`subject`)

export const changeDescription = set(
  state`git.description`,
  props`description`,
)

export const createRepo = [
  actions.whenValidRepo,
  {
    true: [
      set(state`git.isExported`, false),
      set(state`currentModal`, 'exportGithub'),
      actions.exportSandboxToGithub,
      actions.saveGithubData,
      set(
        props`id`,
        string`github/${props`git.username`}/${props`git.repo`}/tree/${props`git.branch`}/`,
      ),
      set(state`git.isExported`, true),
      set(state`currentModal`, null),
      actions.redirectToGithubSandbox,
    ],
    error: set(state`git.error`, props`error`),
  },
]

const whenDirectCommit = when(
  props`commit`,
  commit => !commit.newBranch && !commit.merge,
)

export const createCommit = [
  set(state`git.commit`, null),
  set(state`git.isComitting`, true),
  set(state`currentModal`, 'commit'),
  actions.createCommit,
  set(state`git.commit`, props`commit`),
  set(state`git.isComitting`, false),
  whenDirectCommit,
  {
    true: [wait(1000), set(state`currentModal`, null)],
    false: [],
  },
  set(state`git.subject`, ''),
  set(state`git.description`, ''),
  fetchGitChanges,
]

export const createPr = [
  set(state`git.pr`, null),
  set(state`git.isCreatingPr`, true),
  set(state`currentModal`, 'pr'),
  actions.createPr,
  set(state`git.pr`, props`pr`),
  set(state`git.isCreatingPr`, false),
  actions.setPRURL,
  wait(3000),
  actions.openPr,
  set(state`git.subject`, ''),
  set(state`git.description`, ''),
  set(state`git.originalGitChanges`, null),
  actions.redirectToPr,
]
