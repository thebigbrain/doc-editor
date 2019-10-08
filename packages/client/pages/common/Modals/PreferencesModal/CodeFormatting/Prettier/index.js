import React from 'react'
import { inject, observer } from 'app/componentConnectors'

import { PaddedPreference, PreferenceContainer, Rule, SubContainer, SubDescription } from '../../elements'

function PrettierComponent({ store, signals }) {
  const bindValue = name => ({
    value: store.preferences.settings.prettierConfig[name],
    setValue: value =>
      signals.preferences.settingChanged({
        name: `prettierConfig.${name}`,
        value,
      }),
  })

  return (
    <SubContainer>
      <PreferenceContainer>
        <SubDescription>
          This configuration can be overridden by a{' '}
          <a
            href="https://prettier.io/docs/en/configuration.html"
            target="_blank"
            rel="noopener noreferrer"
          >
            .prettierrc
          </a>{' '}
          JSON file at the root of the sandbox.
        </SubDescription>
        <Rule/>
        <PaddedPreference
          title="Fluid print width"
          type="boolean"
          {...bindValue('fluid')}
        />
        <SubDescription>
          Wrap the code based on the editor width.
        </SubDescription>
        <Rule/>
        <PaddedPreference
          style={{
            opacity: store.preferences.settings.prettierConfig.fluid ? 0.5 : 1,
          }}
          title="Print width"
          type="number"
          {...bindValue('printWidth')}
        />
        <SubDescription
          style={{
            opacity: store.preferences.settings.prettierConfig.fluid ? 0.5 : 1,
          }}
        >
          Specify the line length that the printer will wrap on.
        </SubDescription>
        <Rule/>

        <PaddedPreference
          title="Tab width"
          type="number"
          {...bindValue('tabWidth')}
        />
        <SubDescription>
          Specify the number of spaces per indentation-level.
        </SubDescription>
        <Rule/>

        <PaddedPreference
          title="Use tabs"
          type="boolean"
          {...bindValue('useTabs')}
        />
        <SubDescription>
          Indent lines with tabs instead of spaces.
        </SubDescription>
        <Rule/>

        <PaddedPreference
          title="Semicolons"
          type="boolean"
          {...bindValue('semi')}
        />
        <SubDescription>
          Print semicolons at the ends of statements.
        </SubDescription>
        <Rule/>

        <PaddedPreference
          title="Use single quotes"
          type="boolean"
          {...bindValue('singleQuote')}
        />
        <SubDescription>
          Use {'\''}single{'\''} quotes instead of {'"'}double{'"'} quotes.
        </SubDescription>
        <Rule/>

        <PaddedPreference
          title="Trailing commas"
          type="dropdown"
          options={['none', 'es5', 'all']}
          {...bindValue('trailingComma')}
        />
        <SubDescription>
          Print trailing commas wherever possible.
        </SubDescription>
        <Rule/>

        <PaddedPreference
          title="Bracket spacing"
          type="boolean"
          {...bindValue('bracketSpacing')}
        />
        <SubDescription>
          Print spaces between brackets in object literals.
        </SubDescription>
        <Rule/>

        <PaddedPreference
          title="JSX Brackets"
          type="boolean"
          {...bindValue('jsxBracketSameLine')}
        />
        <SubDescription>
          Put the `{'>'}` of a multi-line JSX element at the end of the last
          line instead of being alone on the next line.
        </SubDescription>
        <Rule/>
        <PaddedPreference
          title="Arrow Function Parentheses"
          type="dropdown"
          options={['avoid', 'always']}
          {...bindValue('arrowParens')}
        />
        <SubDescription>
          Include parentheses around a sole arrow function parameter.
        </SubDescription>
      </PreferenceContainer>
    </SubContainer>
  )
}

export const Prettier = inject('store', 'signals')(observer(PrettierComponent))
