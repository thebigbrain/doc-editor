import React from 'react'

import {Question} from '@muggle/icons'

import { Prettier } from './Prettier/index'
import { Title } from '../elements'

export function CodeFormatting() {
  return (
    <div>
      <Title>
        Prettier Settings{' '}
        <a
          href="https://prettier.io/docs/en/options.html"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Question style={{ marginBottom: '3px' }}/>
        </a>
      </Title>

      <Prettier/>
    </div>
  )
}
