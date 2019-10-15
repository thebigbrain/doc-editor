import {absolute, join} from '../utils/path'
import Template from './template'
import configurations from './configuration'
import {decorateSelector} from '../theme'

function getAngularCLIEntries(parsed) {
  const entries = []
  if (parsed) {
    const app = parsed.apps && parsed.apps[0]
    if (app && app.root && app.main) {
      entries.push(absolute(join(app.root, app.main)))
    }
  }
  return entries
}

function getAngularJSONEntries(parsed) {
  const entries = []
  if (parsed) {
    const {defaultProject} = parsed
    const project = parsed.projects[defaultProject]
    const {build} = project.architect
    if (build.options.main) {
      entries.push(absolute(join(project.root, build.options.main)))
    }
  }
  return entries
}

function getAngularCLIHTMLEntry(parsed) {
  if (parsed) {
    const app = parsed.apps && parsed.apps[0]
    if (app && app.root && app.index) {
      return [absolute(join(app.root, app.index))]
    }
  }
  return []
}

function getAngularJSONHTMLEntry(parsed) {
  if (parsed) {
    const {defaultProject} = parsed
    const project = parsed.projects[defaultProject]
    const {build} = project.architect
    if (build && project.root != null && build.options && build.options.index) {
      return [absolute(join(project.root, build.options.index))]
    }
  }
  return []
}

class AngularTemplate extends Template {
  /**
   * Override entry file because of angular-cli
   */
  getEntries(configurationFiles) {
    let entries = []
    if (!configurationFiles['angular-config'].generated) {
      const {parsed} = configurationFiles['angular-config']
      entries = entries.concat(getAngularJSONEntries(parsed))
    } else {
      const {parsed} = configurationFiles['angular-cli']
      entries = entries.concat(getAngularCLIEntries(parsed))
    }
    if (configurationFiles.package.parsed &&
      configurationFiles.package.parsed.main) {
      entries.push(absolute(configurationFiles.package.parsed.main))
    }
    entries.push('/src/main.ts')
    entries.push('/main.ts')
    return entries
  }

  getHTMLEntries(configurationFiles) {
    let entries = []
    if (!configurationFiles['angular-config'].generated) {
      const {parsed} = configurationFiles['angular-config']
      entries = entries.concat(getAngularJSONHTMLEntry(parsed))
    } else if (configurationFiles['angular-cli']) {
      const {parsed} = configurationFiles['angular-cli']
      entries = entries.concat(getAngularCLIHTMLEntry(parsed))
    }
    entries.push('/public/index.html')
    entries.push('/index.html')
    return entries
  }
}

export default new AngularTemplate('angular-cli', 'Angular', 'https://github.com/angular/angular', 'angular', decorateSelector(() => '#DD0031'), {
  extraConfigurations: {
    '/.angular-cli.json': configurations.angularCli,
    '/angular.json': configurations.angularJSON,
  },
  netlify: false,
  isTypescript: true,
  distDir: 'dist',
  showOnHomePage: true,
  popular: true,
  main: true,
})
