import GithubBadge from '@codesandbox/common/lib/components/GithubBadge'
import Tooltip from '@codesandbox/common/lib/components/Tooltip'
import getTemplateDefinition from '@codesandbox/common/lib/templates'
import { getSandboxName } from '@codesandbox/common/lib/utils/get-sandbox-name'
import { githubRepoUrl, patronUrl, sandboxUrl } from '@codesandbox/common/lib/utils/url-generator'
import { PrivacyStatus } from '~/components/PrivacyStatus'
import { Stats } from '~/pages/common/Stats'
import React from 'react'
import { MdPeople as TeamIcon } from 'react-icons/md'
// import AliasComponent from './Alias';
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

export const Project = ({ editable, store: { editor, isPatron }, signals: { workspace: { sandboxPrivacyChanged } } }) => {
  const sandbox = editor.currentSandbox
  const template = getTemplateDefinition(sandbox.template)
  const { isServer } = template
  return (<Container>
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

    {sandbox.git && (<Item>
      <GithubBadge url={githubRepoUrl(sandbox.git)} username={sandbox.git.username} repo={sandbox.git.repo}
                   branch={sandbox.git.branch}/>
    </Item>)}

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
  </Container>)
}
