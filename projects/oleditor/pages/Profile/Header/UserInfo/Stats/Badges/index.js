import React from 'react'
import { Link } from 'react-router-dom'

import Margin from '@csb/common/lib/components/spacing/Margin'
import Badge from '@csb/common/lib/utils/badges/Badge'
import ContributorsBadge from '@csb/common/lib/components/ContributorsBadge'

import { patronUrl } from '@csb/common/lib/utils/url-generator'

function Badges({ badges, username }) {
  return (
    <Margin style={{ display: 'flex', alignItems: 'center' }} right={2}>
      <Link to={patronUrl()}>
        {badges.map(badge => (
          <Badge key={badge.id} badge={badge} size={64}/>
        ))}
      </Link>

      <ContributorsBadge
        username={username}
        style={{
          marginLeft: '1rem',
          fontSize: '3rem',
          display: 'inline-block',
        }}
      />
    </Margin>
  )
}

export default Badges
