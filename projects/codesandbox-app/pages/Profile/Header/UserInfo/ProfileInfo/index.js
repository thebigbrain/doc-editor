import React from 'react'

import Row from '@csb/common/lib/components/flex/Row'
import Column from '@csb/common/lib/components/flex/Column'

import Margin from '@csb/common/lib/components/spacing/Margin'
import { PatronStar } from '@csb/common/lib/components/PatronStar'

import { IconWrapper, Name, ProfileImage, Username } from './elements'

function ProfileInfo({ username, subscriptionSince, name, avatarUrl }) {
  return (
    <Row style={{ flex: 1 }}>
      <ProfileImage alt={username} height={175} width={175} src={avatarUrl}/>
      <Margin bottom={3}>
        <Column justifyContent="space-between">
          {name && (
            <Name>
              {name}
              {subscriptionSince && (
                <PatronStar subscriptionSince={subscriptionSince}/>
              )}
            </Name>
          )}
          <Username main={!name}>
            {username}
            <a
              href={`https://github.com/${username}`}
              rel="noopener noreferrer"
              target="_blank"
            >
              <IconWrapper/>
            </a>
          </Username>
        </Column>
      </Margin>
    </Row>
  )
}

export default ProfileInfo
