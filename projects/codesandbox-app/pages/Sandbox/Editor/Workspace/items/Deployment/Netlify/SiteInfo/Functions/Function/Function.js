import { hooksObserver, inject } from 'app/componentConnectors';
import React from 'react';
import LightningIcon from 'react-icons/lib/md/flash-on';
import { Link } from '../../../../elements';
export const Function = inject('store')(hooksObserver(({ function: { title }, store: { deployment: { building, netlifySite: { url: siteUrl }, }, }, }) => {
    const functionName = title.split('.js')[0];
    return (<Link disabled={building} href={`${siteUrl}/.netlify/functions/${functionName}`}>
          <LightningIcon />

          {functionName}
        </Link>);
}));
