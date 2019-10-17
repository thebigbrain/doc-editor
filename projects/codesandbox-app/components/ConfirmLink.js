import React from 'react'
import {Link} from 'react-router-dom'


export const ConfirmLink =
  ({
     enabled,
     message,
     ...props
   }) => (
    <Link
      onClick={(e) => {
        // eslint-disable-next-line
        if (enabled && !confirm(message)) {
          e.preventDefault()
          e.stopPropagation()
        }
      }}
      {...props}
    />
  )
