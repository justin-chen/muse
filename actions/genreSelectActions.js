export const GENRE_TOGGLE = 'GENRE_TOGGLE';
export const genreToggle = genre => ({
  type: GENRE_TOGGLE,
  genre
});

export const GENRE_SELECT_ALL = 'GENRE_SELECT_ALL';
export const genreSelectAll = () => ({
  type: GENRE_SELECT_ALL,
});

export const GENRE_UNSELECT_ALL = 'GENRE_UNSELECT_ALL';
export const genreUnselectAll = () => ({
  type: GENRE_UNSELECT_ALL,
});
