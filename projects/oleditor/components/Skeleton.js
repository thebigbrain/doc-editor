import React from 'react';
import Fullscreen from '@csb/common/lib/components/flex/Fullscreen';
import Centered from '@csb/common/lib/components/flex/Centered';

import { Title } from '~/components/Title';
import { SubTitle } from '~/components/SubTitle';

export const Skeleton = ({ titles }) => (
  <Fullscreen style={{ height: '100vh' }}>
    <Centered horizontal vertical>
      <Title delay={titles[0].delay}>{titles[0].content}</Title>
      {titles.slice(1).map((title, index) => (
        // eslint-disable-next-line
        <SubTitle key={index} delay={title.delay}>
          {title.content}
        </SubTitle>
      ))}
    </Centered>
  </Fullscreen>
);
