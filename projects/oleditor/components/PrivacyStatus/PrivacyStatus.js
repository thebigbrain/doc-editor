import React from 'react'
import Tooltip from '@csb/common/lib/components/Tooltip'
import { Icon, StyledPrivate, StyledUnlisted } from './elements'

export const PrivacyStatus = ({ privacy = 0, asIcon = false }) => {
  const PRIVACY_MESSAGES = [
    {
      title: 'Public',
      tooltip: 'Everyone can see the sandbox',
      icon: null,
    },
    {
      title: 'Unlisted',
      tooltip: 'Only users with the url can see the sandbox',
      icon: <StyledUnlisted/>,
    },
    {
      title: 'Private',
      tooltip: 'Only you can see the sandbox',
      icon: <StyledPrivate/>,
    },
  ]
  if (asIcon) {
    return (<Tooltip content={PRIVACY_MESSAGES[privacy].tooltip}>
      {PRIVACY_MESSAGES[privacy].icon}
    </Tooltip>)
  }
  return (<Tooltip content={PRIVACY_MESSAGES[privacy].tooltip}>
    {PRIVACY_MESSAGES[privacy].title}
    <Icon/>
  </Tooltip>)
}