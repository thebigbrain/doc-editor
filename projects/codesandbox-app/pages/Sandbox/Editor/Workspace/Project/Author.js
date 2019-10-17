import React from 'react';
import { profileUrl } from '@csb/common/lib/utils/url-generator';
import { UserWithAvatar } from '@csb/common/lib/components/UserWithAvatar';
import { Item, UserLink } from './elements';
export const Author = ({ author: { username, avatarUrl, subscription } }) => (<Item>
    <UserLink title={username} to={profileUrl(username)}>
      <UserWithAvatar username={username} avatarUrl={avatarUrl} subscriptionSince={subscription && subscription.since}/>
    </UserLink>
  </Item>);
