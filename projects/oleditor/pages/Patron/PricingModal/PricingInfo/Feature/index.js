import React from 'react';
import { Container, Feature as FeatureElement, Value } from './elements';
export const Feature = ({ disabled, feature, free, supporter, }) => (<Container disabled={disabled}>
    <FeatureElement>{feature}</FeatureElement>
    <Value>{free}</Value>
    <Value supporter>{supporter}</Value>
  </Container>);
