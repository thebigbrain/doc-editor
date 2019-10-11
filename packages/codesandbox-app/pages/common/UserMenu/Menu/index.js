import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';

import {
  TiUser as UserIcon
} from 'react-icons/ti';
import {
  MdExitToApp as ExitIcon,
  MdFolder as FolderIcon,
  MdSettings as SettingsIcon,
  MdLibraryBooks as BookIcon
} from 'react-icons/md';
import { curatorUrl, dashboardUrl, patronUrl, profileUrl } from '@codesandbox/common/lib/utils/url-generator';
import PatronBadge from '@codesandbox/common/lib/utils/badges/PatronBadge';
import track from '@codesandbox/common/lib/utils/analytics';
import InfoIcon from '@codesandbox/common/lib/icons/sandbox.svg';

import { Container, Icon, Item, Separator } from './elements';
import { FeedbackIcon } from './FeedbackIcon';



export const Menu = ({
                       username,
                       curator,
                       openPreferences,
                       openStorageManagement,
                       openFeedback,
                       signOut,
                     }) => {
  useEffect(() => {
    track('User Menu Open');
  }, []);

  return (
    <Container>
      <Item as={Link} to={profileUrl(username)}>
        <Icon>
          <UserIcon/>
        </Icon>
        My Profile
      </Item>

      <Separator/>

      <Item as={Link} to={dashboardUrl()}>
        <Icon>
          <InfoIcon/>
        </Icon>
        Dashboard
      </Item>

      <Item as="a" href="/docs">
        <Icon>
          <BookIcon/>
        </Icon>
        Documentation
      </Item>

      {curator && (
        <Item as={Link} to={curatorUrl()}>
          <Icon>
            <span style={{ width: 14 }} role="img" aria-label="Star">
              ✨
            </span>
          </Icon>
          Curator Dashboard
        </Item>
      )}

      <Item as={Link} to={patronUrl()}>
        <Icon>
          <PatronBadge style={{ width: 24, margin: '-6px -5px' }} size={24}/>
        </Icon>
        Patron Page
      </Item>

      <Separator/>

      <Item onClick={openStorageManagement}>
        <Icon>
          <FolderIcon/>
        </Icon>
        Storage Management
      </Item>

      <Item onClick={openPreferences}>
        <Icon>
          <SettingsIcon/>
        </Icon>
        Preferences
      </Item>

      <Separator/>

      <Item onClick={openFeedback}>
        <Icon>
          <FeedbackIcon/>
        </Icon>
        Submit Feedback
      </Item>

      <Separator/>

      <Item onClick={signOut}>
        <Icon>
          <ExitIcon/>
        </Icon>
        Sign out
      </Item>
    </Container>
  );
};
