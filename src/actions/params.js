export const setSortDirection = name => ({
  type: 'SORT_DIRECTION',
  payload: name,
});

export const setSortField = name => ({
  type: 'SORT_FIELD',
  payload: name,
});

export const setPage = page => ({
  type: 'SET_PAGE',
  payload: page,
});

export const setFilters = () => ({
  type: 'SET_FILTERS',
});
