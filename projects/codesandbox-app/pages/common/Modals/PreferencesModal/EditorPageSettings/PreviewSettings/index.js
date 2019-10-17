import React from 'react'
import { inject, observer } from 'app/componentConnectors'

import { PaddedPreference, PreferenceContainer, Rule, SubContainer, SubDescription, Title } from '../../elements'

function PreviewSettingsComponent({ store, signals }) {
  const bindValue = name => ({
    value: store.preferences.settings[name],
    setValue: value =>
      signals.preferences.settingChanged({
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

export const PreviewSettings = inject('store', 'signals')(
  observer(PreviewSettingsComponent),
)
