import { sortBy } from 'lodash-es';

export const state = {
  selectedSandboxes: [],
  trashSandboxIds: [],
  isDragging: false,
  orderBy: {
    order: 'desc',
    field: 'updatedAt',
  },
  filters: {
    blacklistedTemplates: [],
    search: '',
  },
  isTemplateSelected: ({ filters }) => templateName =>
    !filters.blacklistedTemplates.includes(templateName),
  getFilteredSandboxes: ({ orderBy, filters }) => sandboxes => {
    const orderField = orderBy.field;
    const orderOrder = orderBy.order;
    const { blacklistedTemplates } = filters;

    const isDateField =
      orderField === 'insertedAt' || orderField === 'updatedAt';

    let orderedSandboxes = (sortBy(sandboxes, s => {
      if (isDateField) {
        return +new Date(s[orderField]);
      }

      if (orderField === 'title') {
        return s.title || s.id;
      }

      return s[orderField];
    })).filter(
      x => blacklistedTemplates.indexOf(x.source.template) === -1,
    );

    if (orderOrder === 'desc') {
      orderedSandboxes = orderedSandboxes.reverse();
    }

    return orderedSandboxes;
  },
};
