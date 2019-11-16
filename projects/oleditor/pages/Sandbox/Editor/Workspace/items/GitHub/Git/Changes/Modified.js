import theme from '@csb/common/lib/theme';
import React from 'react';
import {
  GoDiffModified as ModifiedIcon
} from 'react-icons/go';

import { Changes } from './Changes';

export const Modified = ({ changes, hideColor }) => (
  <Changes
    changes={changes}
    color={theme.secondary}
    hideColor={hideColor}
    Icon={ModifiedIcon}
    title="Modified"
  />
);
