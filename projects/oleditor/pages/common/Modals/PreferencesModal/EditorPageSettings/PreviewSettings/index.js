import React from 'react'
import {useOvermind} from '@muggle/hooks'
import { PaddedPreference, PreferenceContainer, Rule, SubContainer, SubDescription, Title } from '../../elements'

function PreviewSettingsComponent() {
  const { state, actions } = useOvermind()
  const bindValue = name => ({
    value: state.preferences.settings[name],
    setValue: value =>
      actions.preferences.settingChanged({
        name,
        value,
      }),
  })

  return (
    <div>
      <Title>Preview</Title>

      <SubContainer>
        <PreferenceContainer>
          <PaddedPreference
            title="Preview on edit"
            type="boolean"
            {...bindValue('livePreviewEnabled')}
            tooltip="Only update on save"
          />
          <SubDescription>
            Preview the latest code without saving.
          </SubDescription>
          <Rule/>
          <PaddedPreference
            title="Clear console"
            type="boolean"
            {...bindValue('clearConsoleEnabled')}
            tooltip="Clear console when executing"
          />
          <SubDescription>
            Clear your developer console between every execution.
          </SubDescription>
          <Rule/>
          <PaddedPreference
            title="Instant preview"
            type="boolean"
            {...bindValue('instantPreviewEnabled')}
          />
          <SubDescription>Show preview on every keypress.</SubDescription>
        </PreferenceContainer>
      </SubContainer>
    </div>
  )
}

export const PreviewSettings = PreviewSettingsComponent
