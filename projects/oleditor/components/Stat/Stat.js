import React from 'react';
import { Container, Number, Property } from './elements';
import { formatNumber } from './formatNumber';
export const Stat = ({ name, count }) => (<Container>
    <Property>{name}</Property>
    <Number>{formatNumber(count)}</Number>
  </Container>);
