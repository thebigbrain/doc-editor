import { types } from 'mobx-state-tree'

export default {
  project: types.model({
    title: types.string,
    description: types.string,
    alias: types.string,
  }),
  tags: types.model({
    tagName: types.string,
  }),

  openedWorkspaceItem: types.maybeNull(types.string),
  workspaceHidden: types.boolean,
}
