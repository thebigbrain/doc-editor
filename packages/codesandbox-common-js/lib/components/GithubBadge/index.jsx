import React from 'react';
import GithubIcon from 'react-icons/lib/go/mark-github';
import { BorderRadius, Text, Icon, StyledA } from './elements';
const DivOrA = ({ href, ...props }) => href ? (<StyledA target="_blank" rel="noopener noreferrer" href={href} {...props}/>) : (<div {...props}/>);
const GithubBadge = ({ username, repo, url, branch, ...props }) => (<DivOrA {...props} href={url}>
    <BorderRadius hasUrl={Boolean(url)}>
      <Icon>
        <GithubIcon />
      </Icon>
      <Text>
        {username}/{repo}
        {branch && branch !== 'master' ? `@${branch}` : ''}
      </Text>
    </BorderRadius>
  </DivOrA>);
export default GithubBadge;
