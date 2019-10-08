import * as React from 'react'

import { EntryContainer, WorkspaceSubtitle } from '../elements'
import PublishFields from './PublishFields/index'

import { Description, VersionDate } from './elements'

// eslint-disable-next-line
export default class Versions extends React.PureComponent<Props> {
  render() {
    return (
      <div>
        <Description>
          You can publish versions of your sandbox to make your sandbox
          available for others to use as a dependency.
        </Description>

        <PublishFields/>

        <WorkspaceSubtitle>Published versions</WorkspaceSubtitle>
        {[].map(v => (
          <EntryContainer key={v.version}>
            <span>{v.version}</span>
            <VersionDate>
              {/* moment(v.insertedAt).format('lll') */}
            </VersionDate>
          </EntryContainer>
        ))}
      </div>
    )
  }
}
