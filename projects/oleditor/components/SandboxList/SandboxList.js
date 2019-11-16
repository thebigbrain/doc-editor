import * as React from 'react';
import { format } from 'date-fns';
import { Link } from 'react-router-dom';
import FullHeartIcon from 'react-icons/lib/fa/heart';
import EyeIcon from 'react-icons/lib/fa/eye';
import ForkIcon from 'react-icons/lib/go/repo-forked';
import { sandboxUrl } from '@csb/common/lib/utils/url-generator';
import getIcon from '@csb/common/lib/templates/icons';
import { DeleteSandboxButton } from '../DeleteSandboxButton/index';
import { PrivacyStatus } from '../PrivacyStatus/index';
import { Body, DeleteBody, HeaderRow, HeaderTitle, SandboxRow, StatBody, StatTitle, Table } from './elements';
export const SandboxList = ({ sandboxes, isCurrentUser, onDelete, }) => (<Table>
    <thead>
    <HeaderRow>
      <HeaderTitle>Title</HeaderTitle>
      <HeaderTitle>Created</HeaderTitle>
      <HeaderTitle>Updated</HeaderTitle>
      <StatTitle />
      <StatTitle>
        <FullHeartIcon />
      </StatTitle>
      <StatTitle>
        <EyeIcon />
      </StatTitle>
      <StatTitle>
        <ForkIcon />
      </StatTitle>
      {isCurrentUser && <HeaderTitle />}
    </HeaderRow>
    </thead>
    <Body>
    {sandboxes.map((s, i) => {
    // TODO: investigate type mismatch between SmallSandbox and getIcon
    // @ts-ignore
    const Icon = getIcon(s.template);
    return (<SandboxRow delay={i} key={s.id}>
          <td>
            
            <Link to={sandboxUrl(s)}>{s.title || s.id}</Link>
            <PrivacyStatus privacy={s.privacy} asIcon/>
          </td>
          <td>{format(s.insertedAt, 'MMM DD, YYYY')}</td>
          <td>{format(s.updatedAt, 'MMM DD, YYYY')}</td>
          <StatBody>
            <Icon width={30} height={30}/>
          </StatBody>
          <StatBody>{s.likeCount}</StatBody>
          <StatBody>{s.viewCount}</StatBody>
          <StatBody>{s.forkCount}</StatBody>
          {isCurrentUser && onDelete ? (<DeleteBody>
              <DeleteSandboxButton id={s.id} onDelete={onDelete}/>
            </DeleteBody>) : null}
        </SandboxRow>);
})}
    </Body>
  </Table>);
