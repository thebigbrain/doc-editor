import React from 'react';
import { Container } from './elements';
export function Unread({ status, unread }) {
    return (<Container unread={unread} status={status}>
      {unread}
    </Container>);
}
