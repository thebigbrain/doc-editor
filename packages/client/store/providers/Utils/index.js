import { Provider } from 'cerebral'
import { resolveModule } from '@codesandbox/common/lib/sandbox/modules'
import { isEqual } from 'lodash-es'
import prettify from 'app/utils/prettify'

let nextOptimisticId = 0

export default Provider({
  createOptimisticId() {
    return 'OPTIMISTIC_' + nextOptimisticId++
  },
  prettify(fileName, code, config, isCurrentModule) {
    return prettify(fileName, code, config, isCurrentModule)
  },
  resolveModule,
  isEqual,
  getZip(sandbox) {
    return import(/* webpackChunkName: 'create-zip' */ './create-zip').then(
      module =>
        module
          .getZip(sandbox, sandbox.modules, sandbox.directories)
          .then(result => ({ file: result.file })),
    )
  },
  zipSandbox(sandbox) {
    return import(/* webpackChunkName: 'create-zip' */ './create-zip').then(
      module =>
        module
          .default(sandbox, sandbox.modules, sandbox.directories)
          .then(file => ({ file })),
    )
  },
})
