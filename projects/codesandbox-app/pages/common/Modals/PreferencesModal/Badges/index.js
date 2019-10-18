import React from 'react'
import {useOvermind} from '@muggle/hooks'
import Margin from '@csb/common/lib/components/spacing/Margin'
import Badge from '@csb/common/lib/utils/badges/Badge'
import { Title } from '../elements'

function BadgesComponent() {
  const { state, actions } = useOvermind()
  const badgesCount = state.user.badges.length

  return (
    <div>
      <Title>Badges</Title>
      <strong>
        You currently have {badgesCount} badge
        {badgesCount === 1 ? '' : 's'}. You can click on the badges to toggle
        visibility.
      </strong>
      <Margin top={2}>
        {state.user.badges.map(badge => (
          <Badge
            key={badge.id}
            tooltip={false}
            onClick={b =>
              actions.preferences.setBadgeVisibility({
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

export const Badges = BadgesComponent
