import React from 'react'
import sortBy from 'lodash/sortBy'
import * as templates from '../../../templates'
import {ConfigDescription, ConfigItem, PaddedConfig, PaddedPreference,} from '../elements'

export class ConfigWizard extends React.Component {
  constructor() {
    super(...arguments)
    this.bindValue = (file, property, defaultValue) => ({
      value: file[property] || defaultValue,
      setValue: (value) => {
        const code = JSON.stringify({
          ...file,
          [property]: value,
        }, null, 2)
        this.props.updateFile(code)
      },
    })
  }

  render() {
    const {file, sandbox} = this.props
    let parsedFile
    let error
    try {
      parsedFile = JSON.parse(file)
    } catch (e) {
      error = e
    }
    if (error) {
      return <div>Problem parsing sandbox.config.json: {error.message}</div>
    }
    if (!parsedFile) {
      return <div>Could not parse sandbox.config.json</div>
    }
    const currentTemplate = templates.default(sandbox.template)
    // $FlowIssue: Can't detect difference between filter/no-filter
    const possibleTemplates = Object.keys(templates)
      .filter(t => t !== 'default')
      .map(n => templates[n])
    const templateOptions = sortBy(possibleTemplates.filter(template => template.isServer === currentTemplate.isServer &&
      template.showOnHomePage), template => template.niceName).map(template => template.name)
    const templateNameMap = {}
    possibleTemplates.forEach(template => {
      templateNameMap[template.name] = template.niceName
    })
    return (<div>
      <PaddedConfig>
        <ConfigItem>
          <PaddedPreference title="Infinite Loop Protection"
                            type="boolean" {...this.bindValue(parsedFile, 'infiniteLoopProtection')}/>
        </ConfigItem>
        <ConfigDescription>
          Whether we should stop execution of the code when we detect an
          infinite loop.
        </ConfigDescription>
      </PaddedConfig>

      <PaddedConfig>
        <ConfigItem>
          <PaddedPreference title="Hard Reload on Change"
                            type="boolean" {...this.bindValue(parsedFile, 'hardReloadOnChange')}/>
        </ConfigItem>
        <ConfigDescription>
          Force refresh the sandbox for a change. This is helpful for
          sandboxes with global state, like intervals.
        </ConfigDescription>
      </PaddedConfig>


      <PaddedConfig>
        <ConfigItem>
          <PaddedPreference title="Template" type="dropdown" options={templateOptions}
                            mapName={name => templateNameMap[name]} {...this.bindValue(parsedFile, 'template', currentTemplate.name)}/>
        </ConfigItem>
        <ConfigDescription>
          Which template to use for this sandbox.
        </ConfigDescription>
      </PaddedConfig>
    </div>)
  }
}

export default {
  ConfigWizard,
}
