import { sandboxUrl } from '@csb/common/lib/utils/url-generator'
import { getSandboxOptions } from '@csb/common/lib/url'
import history from '../../utils/history'

export default {
  replaceSandboxUrl({ id, alias, git }) {
    window.history.replaceState({}, null, sandboxUrl({ id, alias, git }))
  },
  updateSandboxUrl({ id, alias, git }) {
    history.push(sandboxUrl({ id, alias, git }),)
  },
  redirectToNewSandbox() {
    history.push('/s/new')
  },
  redirectToSandboxWizard() {
    history.replace('/s/')
  },
  getSandboxOptions() {
    return getSandboxOptions(decodeURIComponent(document.location.href))
  }
}
