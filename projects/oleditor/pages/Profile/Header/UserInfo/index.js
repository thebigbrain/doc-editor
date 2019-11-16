import * as React from 'react'

import Row from '@csb/common/lib/components/flex/Row'

import ProfileInfo from './ProfileInfo/index'
import { Stats } from './Stats/index'

function UserInfo({ user }) {
  return (
    <Row>
      <ProfileInfo
        username={user.username}
        name={user.name}
        avatarUrl={user.avatarUrl}
        subscriptionSince={user.subscription && user.subscription.since}
      />
      <Stats
        likeCount={user.receivedLikeCount}
        viewCount={user.viewCount}
        forkCount={user.forkedCount}
        badges={user.badges}
        username={user.username}
      />
    </Row>
  )
}

export default UserInfo
