import React from 'react';

import { SortOptions } from './SortOptions/index';
import { FilterOptions } from './FilterOptions/index';

import { Container } from './elements';
import { ITemplate } from '../types';

interface Props {
  possibleTemplates: ITemplate[];
  hideOrder?: boolean;
  hideFilters?: boolean;
}

export const Filters = ({
                          possibleTemplates,
                          hideOrder,
                          hideFilters,
                        }: Props) => (
  <Container>
    <FilterOptions
      hideFilters={hideFilters}
      possibleTemplates={possibleTemplates}
    />
    <SortOptions hideOrder={hideOrder}/>
  </Container>
);
