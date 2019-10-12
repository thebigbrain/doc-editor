import theme from '@codesandbox/common/lib/theme';
import React from 'react';
import {
  GoDiffAdded as AddedIcon
} from 'react-icons/go';

import { Changes } from './Changes';

export const Added = ({ changes, hideColor }) => (
  <Changes
    changes={changes}
    color={theme.green}
    hideColor={hideColor}
    Icon={AddedIcon}
    title="Added"
  />
);
