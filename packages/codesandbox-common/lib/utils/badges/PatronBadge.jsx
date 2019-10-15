import React from 'react'
import Badge from './Badge'

const DEFAULT_BADGE = {
  id: 'patron_1',
  name: 'Patron I',
  visible: true,
}
const PatronBadge = ({size, ...props}) => (<Badge {...props} badge={DEFAULT_BADGE} size={size}/>)
export default PatronBadge
