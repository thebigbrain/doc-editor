import React from 'react'
import {DetailInfo} from './DetailInfo/index'
import {Container, IntegrationBlock, Name} from './elements'


export const Integration =
  ({
     small = false,
     loading,
     bgColor,
     Icon,
     name,
     onSignOut,
     userInfo,
     onSignIn,
     description,
   }) => (
    <Container small={small} loading={loading}>
      <IntegrationBlock small={small} bgColor={bgColor}>
        <Icon/>
        <Name>{name}</Name>
      </IntegrationBlock>
      {userInfo ? (
        <DetailInfo
          onSignOut={onSignOut}
          heading="Signed in as"
          info={userInfo.email || 'Loading...'}
        />
      ) : (
        <DetailInfo onSignIn={onSignIn} heading="Enables" info={description}/>
      )}
    </Container>
  )
