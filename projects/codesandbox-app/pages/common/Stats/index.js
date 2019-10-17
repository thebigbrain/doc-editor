import React from 'react';
import {
  FaEye as EyeIcon
} from 'react-icons/fa';
import {
  GoRepoForked as ForkIcon
} from 'react-icons/go';
import { LikeHeart } from '~/pages/common/LikeHeart';
import { Stats as StatsWrapper } from './elements';
import { Stat } from './Stat';

export const Stats = ({ sandbox }) => (<StatsWrapper>
    <Stat Icon={<EyeIcon />} count={sandbox.viewCount}/>
    <Stat Icon={<LikeHeart sandbox={sandbox} colorless/>} count={sandbox.likeCount}/>

    <Stat Icon={<ForkIcon />} count={sandbox.forkCount}/>
  </StatsWrapper>);

