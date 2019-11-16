import theme from '@csb/common/lib/theme';
import React from 'react';
import {
  GoDiffRemoved as RemovedIcon
} from 'react-icons/go';

import { Changes } from './Changes';

export const Deleted = ({ changes, hideColor }) => (
  <Changes
    changes={changes}
    color={theme.red}
    hideColor={hideColor}
    Icon={RemovedIcon}
    title="Deleted"
  />
);
