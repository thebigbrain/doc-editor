import React from 'react';

import { Added, Deleted, Modified } from '../Changes';


export const TotalChanges = ({ gitChanges, hideColor }) => (
  <>
    <Added changes={gitChanges.added} hideColor={hideColor}/>

    <Modified changes={gitChanges.modified} hideColor={hideColor}/>

    <Deleted changes={gitChanges.deleted} hideColor={hideColor}/>
  </>
);

TotalChanges.defaultProps = {
  gitChanges: {},
};
