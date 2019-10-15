import React from 'react'
import {format} from 'date-fns'
import StarIcon from 'react-icons/lib/go/star'
import Tooltip from '../Tooltip'
import {Container} from './elements'

export function PatronStar({subscriptionSince, ...props}) {
  return (<Tooltip content={`Patron since ${format(new Date(subscriptionSince), 'MMM yyyy')}`}>
    <Container>
      <StarIcon {...props}/>
    </Container>
  </Tooltip>)
}
