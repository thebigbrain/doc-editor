import React from 'react'
import SearchDependencies from '~/pages/Sandbox/SearchDependencies'
import {useOvermind} from '~/hooks'


function SearchDependenciesModal() {
  const {actions: signals} = useOvermind()

  return (
    <SearchDependencies
      onConfirm={(name, version) =>
        signals.editor.addNpmDependency({ name, version })
      }
    />
  )
}

export default SearchDependenciesModal
