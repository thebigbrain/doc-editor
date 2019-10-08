import React from 'react'
import { inject, observer } from 'app/componentConnectors'
import themes from '@codesandbox/common/lib/themes'

import PreferenceText from '@codesandbox/common/lib/components/Preference/PreferenceText'
import { PaddedPreference, PreferenceContainer, Rule, SubContainer, SubDescription, Title } from '../elements'
import { BigTitle } from './elements'
import VSCodePlaceholder from '../VSCodePlaceholder'

function EditorSettings({ store, signals }) {
  const bindValue = (name, setUndefined) => ({
    value: setUndefined
      ? store.preferences.settings[name] || undefined
      : store.preferences.settings[name],
    setValue: value =>
      signals.preferences.settingChanged({
        name,
        value,
      }),
  })

  const fontOptions = ['Menlo', 'Dank Mono', 'Source Code Pro']
  const themeOptions = themes.map(t => t.name)

  return (
    <div>
      <Title>Appearance</Title>

      <SubContainer>
        <PreferenceContainer>
          <VSCodePlaceholder>
            <PaddedPreference
              title="Font Size"
              type="number"
              {...bindValue('fontSize')}
            />
            <Rule/>
            <PaddedPreference
              title="Font Family"
              type="dropdown"
              options={['Custom'].concat(fontOptions)}
              placeholder="Source Code Pro"
              {...bindValue('fontFamily')}
            />
            <SubDescription>
              We use{' '}
              <a
                href="https://dank.sh/affiliate?n=cjgw9wi2q7sf20a86q0k176oj"
                rel="noreferrer noopener"
                target="_blank"
              >
                Dank Mono
              </a>{' '}
              as default font, you can also use locally installed fonts
            </SubDescription>
            {!fontOptions.includes(store.preferences.settings.fontFamily) && (
              <PreferenceText
                style={{ marginTop: '1rem' }}
                placeholder="Enter your custom font"
                block
                {...bindValue('fontFamily')}
              />
            )}
            <Rule/>
            <PaddedPreference
              title="Font Ligatures"
              type="boolean"
              {...bindValue('enableLigatures')}
            />
            <SubDescription>
              Whether we should enable{' '}
              <a
                href="https://en.wikipedia.org/wiki/Typographic_ligature"
                target="_blank"
                rel="noopener noreferrer"
              >
                font ligatures
              </a>
              .
            </SubDescription>
            <Rule/>
            <PaddedPreference
              title="Line Height"
              type="number"
              placeholder="1.15"
              step="0.05"
              {...bindValue('lineHeight')}
            />
            <Rule/>
            <PaddedPreference
              title="Zen Mode"
              type="boolean"
              {...bindValue('zenMode')}
            />
            <SubDescription>
              Hide all distracting elements, perfect for lessons and
              presentations.
            </SubDescription>
          </VSCodePlaceholder>

          {store.preferences.settings.experimentVSCode ? (
            <div>
              <BigTitle>Editor Theme</BigTitle>
              <SubDescription>
                You can select your editor theme by selecting File {'->'}{' '}
                Preferences {'->'} Color Theme in the menu bar.
              </SubDescription>
              <Rule/>

              <SubDescription style={{ marginBottom: '1rem' }}>
                Custom VSCode Theme
              </SubDescription>

              <SubDescription style={{ marginBottom: '1rem' }}>
                After changing this setting you
                {'\''}
                ll have to reload the browser and select {'"'}
                Custom
                {'"'} as your color theme.
              </SubDescription>

              <PreferenceText
                isTextArea
                style={{ fontFamily: 'Source Code Pro', fontSize: '.8rem' }}
                block
                rows={7}
                placeholder={`You can use your own theme from VSCode directly:
1. Open VSCode
2. Press (CMD or CTRL) + SHIFT + P
3. Enter: '> Developer: Generate Color Scheme From Current Settings'
4. Copy the contents and paste them here!`}
                {...bindValue('manualCustomVSCodeTheme', true)}
              />
            </div>
          ) : (
            <div>
              <BigTitle>Editor Theme</BigTitle>

              <PaddedPreference
                title="VSCode Theme"
                type="dropdown"
                options={themeOptions}
                {...bindValue('editorTheme')}
              />
              <SubDescription>
                This will be overwritten if you enter a custom theme.
              </SubDescription>
              <Rule/>

              <SubDescription style={{ marginBottom: '1rem' }}>
                Custom VSCode Theme
              </SubDescription>

              <PreferenceText
                isTextArea
                style={{ fontFamily: 'Source Code Pro', fontSize: '.8rem' }}
                block
                rows={7}
                placeholder={`You can use your own theme from VSCode directly:
1. Open VSCode
2. Press (CMD or CTRL) + SHIFT + P
3. Enter: '> Developer: Generate Color Scheme From Current Settings'
4. Copy the contents and paste them here!`}
                {...bindValue('customVSCodeTheme', true)}
              />
            </div>
          )}
        </PreferenceContainer>
      </SubContainer>
    </div>
  )
}

export const Appearance = inject('store', 'signals')(observer(EditorSettings))
