import * as React from 'react'

import Margin from '@codesandbox/common/lib/components/spacing/Margin'
import getDefinition from '@codesandbox/common/lib/templates'
import {WorkspaceSubtitle} from '../elements'

import AddVersion from './AddVersion/index'
import {VersionEntry} from './VersionEntry/index'
import AddResource from './AddResource/index'
import ExternalResource from './ExternalResource/index'

import {ErrorMessage} from './elements'
import {useOvermind} from "~/overmind"

const Dependencies = () => {
  const {state: {editor}, actions: {workspace, editor: editorSignals}} = useOvermind()
  const sandbox = editor.currentSandbox

  if (!editor.parsedConfigurations.package) {
    return <ErrorMessage>Unable to find package.json</ErrorMessage>
  }

  const {parsed, error} = editor.parsedConfigurations.package

  if (error) {
    return (
      <ErrorMessage>
        We weren
        {'\''}t able to parse the package.json
      </ErrorMessage>
    )
  }

  const dependencies = parsed.dependencies || {}
  // const devDependencies = parsed.devDependencies || {};

  const templateDefinition = getDefinition(sandbox.template)

  return (
    <div>
      <Margin bottom={0}>
        {Object.keys(dependencies)
          .sort()
          .map(dep => (
            <VersionEntry
              key={dep}
              dependencies={dependencies}
              dependency={dep}
              onRemove={name =>
                editorSignals.npmDependencyRemoved({name})
              }
              onRefresh={(name, version) =>
                editorSignals.addNpmDependency({
                  name,
                  version,
                })
              }
            />
          ))}
        {/* {Object.keys(devDependencies).length > 0 && (
          <WorkspaceSubtitle>Development Dependencies</WorkspaceSubtitle>
        )}
        {Object.keys(devDependencies)
          .sort()
          .map(dep => (
            <VersionEntry
              key={dep}
              dependencies={devDependencies}
              dependency={dep}
              onRemove={name => signals.editor.npmDependencyRemoved({ name })}
              onRefresh={(name, version) =>
                signals.editor.addNpmDependency({
                  name,
                  version,
                })
              }
            />
          ))} */}
        <AddVersion>Add Dependency</AddVersion>
      </Margin>
      {templateDefinition.externalResourcesEnabled && (
        <div>
          <WorkspaceSubtitle>External Resources</WorkspaceSubtitle>
          {(sandbox.externalResources || []).map(resource => (
            <ExternalResource
              key={resource}
              resource={resource}
              removeResource={() =>
                workspace.externalResourceRemoved({
                  resource,
                })
              }
            />
          ))}
          <AddResource
            addResource={resource =>
              workspace.externalResourceAdded({
                resource,
              })
            }
          />
        </div>
      )}
    </div>
  )
}

export default Dependencies
