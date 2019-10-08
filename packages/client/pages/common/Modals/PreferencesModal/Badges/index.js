import React from 'react'
import { inject, observer } from 'app/componentConnectors'

import Margin from '@codesandbox/common/lib/components/spacing/Margin'
import Badge from '@codesandbox/common/lib/utils/badges/Badge'
import { Title } from '../elements'

function BadgesComponent({ store, signals }) {
  const badgesCount = store.user.badges.length

  return (
    <div>
      <Title>Badges</Title>
      <strong>
        You currently have {badgesCount} badge
        {badgesCount === 1 ? '' : 's'}. You can click on the badges to toggle
        visibility.
      </strong>
      <Margin top={2}>
        {store.user.badges.map(badge => (
          <Badge
            key={badge.id}
            tooltip={false}
            onClick={b =>
              signals.preferences.setBadgeVisibility({
                ...b,
                visible: !b.visible,
              })
            }
            badge={badge}
            visible={badge.visible}
            size={128}
          />
        ))}
      </Margin>
    </div>
  )
}

export const Badges = inject('store', 'signals')(observer(BadgesComponent))
