import React from "react"
import {reAuth, skipAuth} from "../session"


function Session(props) {
  const [hasAuth, setHasAuth] = React.useState(skipAuth())

  React.useEffect(() => {
    let aborted = false

    reAuth().then(() => {
      if (aborted) return
      setHasAuth(true)
    }).catch(() => {
      // toLogin()
      console.log('session check false: no auth')
    })

    return () => {
      aborted = true
    }
  })

  if (!hasAuth) return null
  return props.children
}

export default Session
