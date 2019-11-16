import React from 'react';
import {
  FaTwitter as TwitterIcon,
  FaGithub as GithubIcon
} from 'react-icons/fa';
import { Icon } from './elements';
import { SpectrumLogo } from '../SpectrumLogo';

export const SocialInfo = props => (
  <div {...props}>
    <Icon href="https://twitter.com/codesandbox">
      <TwitterIcon/>
    </Icon>
    <Icon href="https://github.com/codesandbox/codesandbox-client">
      <GithubIcon/>
    </Icon>
    <Icon href="https://spectrum.chat/codesandbox">
      <SpectrumLogo/>
    </Icon>
  </div>
);
