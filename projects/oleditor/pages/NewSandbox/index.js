import React, { useEffect } from 'react'
import Centered from '@csb/common/lib/components/flex/Centered'
import MaxWidth from '@csb/common/lib/components/flex/MaxWidth'
import Margin from '@csb/common/lib/components/spacing/Margin'
import { sandboxUrl } from '@csb/common/lib/utils/url-generator'
import { Navigation } from '~/pages/common/Navigation'
import history from '~/utils/history'
import { NewSandboxModal } from '../Dashboard/Content/CreateNewSandbox/NewSandboxModal'
import {useOvermind} from '@muggle/hooks'

const createSandbox = template => {
  history.push(sandboxUrl({ id: template.shortid }))
}

const NewSandbox = () => {
  const {actions} = useOvermind()

  useEffect(() => {
    actions.sandboxPageMounted()
  }, [actions.sandboxPageMounted])

  return (
    <MaxWidth
      css={`
        height: 100vh;
      `}
    >
      <Margin horizontal={1.5} style={{ height: '100%' }} vertical={1.5}>
        <Navigation title="New Sandbox"/>

        <Margin top={5}>
          <Centered horizontal vertical>
            <Margin style={{ maxWidth: '100%', width: 900 }} top={2}>
              <NewSandboxModal createSandbox={createSandbox} width={980}/>
            </Margin>
          </Centered>
        </Margin>
      </Margin>
    </MaxWidth>
  )
}

export default NewSandbox
