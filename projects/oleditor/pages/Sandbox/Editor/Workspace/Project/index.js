import GithubBadge from '@csb/common/lib/components/GithubBadge'
import Tooltip from '@csb/common/lib/components/Tooltip'
import getTemplateDefinition from '@csb/common/lib/templates'
import { getSandboxName } from '@csb/common/lib/utils/get-sandbox-name'
import { githubRepoUrl, patronUrl, sandboxUrl } from '@csb/common/lib/utils/url-generator'

import { PrivacyStatus } from '~/components/PrivacyStatus'
import { Stats } from '~/pages/common/Stats'
import React from 'react'
import { TeamIcon } from '@muggle/icons'
import { Author } from './Author'
import { Description } from './Description/index'
import {
  BasicInfo,
  BundlerLink,
  Container,
  Explanation,
  Group,
  Icon,
  Item,
  PrivacyContainer,
  PrivacySelect,
  PropertyName,
  PropertyValue,
  StatsContainer,
  TemplateStyledLink,
} from './elements'
import { Frozen } from './Frozen/index'
import { Keywords } from './Keywords'
import { SandboxConfig } from './SandboxConfig/index'
import { Title } from './Title/index'
import {useOvermind} from '@muggle/hooks'

export const Project = ({ editable }) => {
  const {
    state: { editor, isPatron }, actions: { workspace: { sandboxPrivacyChanged } }
  } = useOvermind()
  const sandbox = editor.currentSandbox
  const template = getTemplateDefinition(sandbox.template)
  const { isServer } = template

  return (
    <Container>
      <BasicInfo>
        <Title editable={editable}/>
        <Description editable={editable}/>
      </BasicInfo>

      {!sandbox.team && sandbox.author && (<Author author={sandbox.author}/>)}

      {sandbox.team && (<Tooltip appendTo="parent" content="This sandbox is owned by this team">
        <Item style={{ color: 'white', display: 'flex' }}>
          <TeamIcon style={{ fontSize: '1.125em', marginRight: '.5rem' }}/>
          <div>{sandbox.team.name}</div>
        </Item>
      </Tooltip>)}

      {sandbox.git && (
        <Item>
          <GithubBadge
            url={githubRepoUrl(sandbox.git)}
            username={sandbox.git.username}
            repo={sandbox.git.repo}
            branch={sandbox.git.branch}
          />
        </Item>
      )}

      <StatsContainer>
        <Stats sandbox={sandbox}/>
      </StatsContainer>

      <Keywords editable={editable}/>

      <Group>
        <Item>
          <PropertyName>Privacy</PropertyName>
          <PropertyValue>
            <PrivacyContainer>
              {editable ? (<>
                <PrivacySelect value={sandbox.privacy} disabled={!isPatron} onChange={event => sandboxPrivacyChanged({
                  privacy: Number(event.target.value),
                })}>
                  <option value={0}>Public</option>
                  {isPatron && (<option value={1}>
                    Unlisted (only available by url)
                  </option>)}
                  {!isServer && isPatron && (<option value={2}>Private</option>)}
                </PrivacySelect>
              </>) : (<PrivacyStatus privacy={sandbox.privacy}/>)}
            </PrivacyContainer>
          </PropertyValue>
        </Item>

        {!isPatron && (<Explanation style={{ marginTop: '-1rem' }}>
          You can change privacy of a sandbox as a{' '}
          <a href={patronUrl()} rel="noopener noreferrer" target="_blank">
            patron
          </a>
          .
        </Explanation>)}

        {editable && <Frozen/>}

        {sandbox.forkedFromSandbox && (<Item>
          <PropertyName>Forked From</PropertyName>
          <PropertyValue>
            <TemplateStyledLink to={sandboxUrl(sandbox.forkedFromSandbox)}>
              {getSandboxName(sandbox.forkedFromSandbox)}
            </TemplateStyledLink>
          </PropertyValue>
        </Item>)}

        <Item>
          <PropertyName>
            Environment{' '}
            <Tooltip boundary="viewport" interactive content={<>
              The environment determines how a sandbox is executed, you
              can find more info{' '}
              <a target="_blank" href="/docs/environment">
                here
              </a>
              .
            </>}>
              <Icon/>
            </Tooltip>
          </PropertyName>
          <PropertyValue>
            <BundlerLink href={template.url}>
              {sandbox.template}
            </BundlerLink>
          </PropertyValue>
        </Item>
      </Group>

      {editable && <SandboxConfig/>}
    </Container>
  )
}
