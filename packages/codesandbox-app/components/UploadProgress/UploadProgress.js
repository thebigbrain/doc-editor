import React from 'react';
import { Container, DeployAnimationContainer, DeployText, Result, StyledCube, StyledLocalLogo, StyledLogo, } from './elements';
export const UploadProgress = ({ message, result, }) => (<Container>
    {result ? (<Result>{result}</Result>) : (<>
        <DeployAnimationContainer deploying>
          <StyledLocalLogo />
          {[0, 1, 2, 3].map(i => (<StyledCube key={i} delay={i} size={20}/>))}
          <StyledLogo width={70} height={70}/>
        </DeployAnimationContainer>
        <DeployText>{message}</DeployText>
      </>)}
  </Container>);
