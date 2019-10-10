import React from 'react';

import { NotificationImage as Image } from '../elements';
import { Container, W } from './elements';


export const TeamAccepted = ({
                               read,
                               teamName,
                               userName,
                               userAvatar,
                             }) => (
  <div>
    <Container success read={read}>
      <Image src={userAvatar}/>
      <div>
        <W>{userName}</W> accepted your invitation to join <W>{teamName}!</W>
      </div>
    </Container>
  </div>
);
