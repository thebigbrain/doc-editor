import toml from 'markty-toml'
import {parse} from '../../forked-vendors/jsonlint.browser'

function getCode(template, module, sandbox, resolveModule, configurationFile) {
  if (module) {
    return {code: module.code, generated: false}
  }
  if (configurationFile.getDefaultCode) {
    return {
      code: configurationFile.getDefaultCode(template, resolveModule),
      generated: true,
    }
  }
  if (sandbox && configurationFile.generateFileFromSandbox) {
    return {
      code: configurationFile.generateFileFromSandbox(sandbox),
      generated: true,
    }
  }
  return {code: '', generated: false}
}

function titleIncludes(module, test) {
  if ('title' in module) {
    return module.title.includes(test)
  }
  if ('path' in module) {
    return module.path.includes(test)
  }
  return false
}

/**
 * We convert all configuration file configs to an object with configuration per
 * type. This makes configs universal.
 */
export default function parseConfigurations(template, configurationFiles, resolveModule, sandbox) {
  const configurations = {}
  const paths = Object.keys(configurationFiles)
  for (let i = 0; i < paths.length; i++) {
    const path = paths[i]
    const module = resolveModule(path)
    const configurationFile = configurationFiles[path]
    const baseObject = {
      path,
      ...getCode(template, module, sandbox, resolveModule, configurationFile),
    }
    const {code} = baseObject
    if (code) {
      try {
        let parsed
        // it goes here three times and the third time it doesn't have a title but a path
        // that took a while ffs
        // if toml do it with toml parser
        if (module && titleIncludes(module, 'toml')) {
          // never throws
          parsed = toml(code)
        }
        else {
          parsed = parse(code)
        }
        configurations[configurationFile.type] = {
          ...baseObject,
          parsed,
        }
      }
      catch (e) {
        configurations[configurationFile.type] = {
          ...baseObject,
          error: e,
        }
      }
    }
  }
  return configurations
}
