import { sortViewSortsByPriority } from 'src/engine/metadata-modules/flat-view/utils/sort-view-sorts-by-priority.util';

describe('sortViewSortsByPriority', () => {
  it('orders by position before creation time', () => {
    const createdAt = new Date('2026-01-01T00:00:00.000Z');

    expect(
      sortViewSortsByPriority([
        {
          id: 'later',
          position: 1,
          createdAt: new Date('2026-01-01T00:00:00.000Z'),
        },
        {
          id: 'first',
          position: 0,
          createdAt: new Date('2026-01-03T00:00:00.000Z'),
        },
      ]).map(({ id }) => id),
    ).toEqual(['first', 'later']);

    expect(
      sortViewSortsByPriority([
        { id: 'sort-b', position: 0, createdAt },
        { id: 'sort-a', position: 0, createdAt },
      ]).map(({ id }) => id),
    ).toEqual(['sort-a', 'sort-b']);
  });

  it('falls back to creation time when position is missing', () => {
    const viewSorts = [
      { id: 'newest-sort', createdAt: new Date('2026-01-03T00:00:00.000Z') },
      { id: 'oldest-sort', createdAt: new Date('2026-01-01T00:00:00.000Z') },
      { id: 'middle-sort', createdAt: new Date('2026-01-02T00:00:00.000Z') },
    ];

    expect(sortViewSortsByPriority(viewSorts).map(({ id }) => id)).toEqual([
      'oldest-sort',
      'middle-sort',
      'newest-sort',
    ]);
    expect(viewSorts.map(({ id }) => id)).toEqual([
      'newest-sort',
      'oldest-sort',
      'middle-sort',
    ]);
  });
});
