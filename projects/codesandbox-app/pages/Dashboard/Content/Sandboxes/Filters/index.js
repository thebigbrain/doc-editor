import React from 'react';
import { SortOptions } from './SortOptions/index';
import { FilterOptions } from './FilterOptions/index';
import { Container } from './elements';
export const Filters = ({ possibleTemplates, hideOrder, hideFilters, }) => (<Container>
    <FilterOptions hideFilters={hideFilters} possibleTemplates={possibleTemplates}/>
    <SortOptions hideOrder={hideOrder}/>
  </Container>);
