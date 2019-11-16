import React from 'react';
import { EyeIcon, ForkIcon } from '@muggle/icons';
import { LikeHeart } from '~/pages/common/LikeHeart';
import { Stats as StatsWrapper } from './elements';
import { Stat } from './Stat';

export const Stats = ({ sandbox }) => (
  <StatsWrapper>
    <Stat Icon={<EyeIcon />} count={sandbox.viewCount || 0}/>
    <Stat Icon={<LikeHeart sandbox={sandbox} colorless/>} count={sandbox.likeCount || 0}/>

    <Stat Icon={<ForkIcon />} count={sandbox.forkCount || 0}/>
  </StatsWrapper>
);

