import React from 'react'
import Helmet from 'react-helmet'
import { Query } from 'react-apollo'
import { basename } from 'path'
import {useOvermind} from '@muggle/hooks'

import { Content as Sandboxes } from '../../Sandboxes/index'
import { Navigation } from './Navigation/index'
// import Folders from './Folders';
import CreateNewSandbox from '../../CreateNewSandbox/index'
import getMostUsedTemplate from '../../../utils/get-most-used-template'

import { PATHED_SANDBOXES_CONTENT_QUERY } from '../../../queries'
import { getPossibleTemplates } from '../../Sandboxes/utils'

const PathedSandboxes = props => {
  const {state} = useOvermind()
  const path = '/' + decodeURIComponent(props.match.params.path || '')
  const { teamId } = props.match.params
  return (
    <>
      <Helmet>
        <title>{basename(path) || 'Dashboard'} - CodeSandbox</title>
      </Helmet>
      <Query
        query={PATHED_SANDBOXES_CONTENT_QUERY}
        variables={{ path, teamId }}
      >
        {({ loading, error, data }) => {

          if (error) {
            console.error(error)
            return <div>Error!</div>
          }

          const sandboxes =
            loading || !data.me.collection
              ? []
              : data.me.collection.sandboxes

          const possibleTemplates = getPossibleTemplates(sandboxes)

          // We want to hide all templates
          // TODO: make this a query variable for graphql and move the logic to the server
          const noTemplateSandboxes = sandboxes.filter(
            s => !s.customTemplate,
          )
          const orderedSandboxes = state.dashboard.getFilteredSandboxes(
            noTemplateSandboxes,
          )

          let mostUsedTemplate = null
          if (!loading) {
            try {
              mostUsedTemplate = getMostUsedTemplate(sandboxes)
            } catch (e) {
              // Not critical
            }
          }

          return (
            <Sandboxes
              ExtraElement={({ style }) => (
                <CreateNewSandbox
                  collectionId={
                    data &&
                    data.me &&
                    data.me.collection &&
                    data.me.collection.id
                  }
                  mostUsedSandboxTemplate={mostUsedTemplate}
                  style={style}
                />
              )}
              isLoading={loading}
              possibleTemplates={possibleTemplates}
              Header={<Navigation teamId={teamId} path={path}/>}
              // Fix React Virtualized First
              // SubHeader={
              //   <Folders me={data.me} loading={loading} teamId={teamId} />
              // }
              sandboxes={orderedSandboxes}
            />
          )
        }}
      </Query>
    </>
  )
}

export default PathedSandboxes
