import { sortViewSortsByPriority } from '@/views/utils/sortViewSortsByPriority';

describe('sortViewSortsByPriority', () => {
  it('orders by position ahead of insertion order', () => {
    const viewSorts = [
      { id: 'sort-b', position: 1, createdAt: '2026-01-02T00:00:00.000Z' },
      { id: 'sort-a', position: 0, createdAt: '2026-01-01T00:00:00.000Z' },
    ];

    expect(sortViewSortsByPriority(viewSorts).map(({ id }) => id)).toEqual([
      'sort-a',
      'sort-b',
    ]);
    expect(viewSorts.map(({ id }) => id)).toEqual(['sort-b', 'sort-a']);
  });

  it('breaks a shared position by createdAt, then id', () => {
    const createdAt = '2026-01-01T00:00:00.000Z';

    expect(
      sortViewSortsByPriority([
        { id: 'sort-b', position: 0, createdAt },
        {
          id: 'sort-a',
          position: 0,
          createdAt: '2026-01-02T00:00:00.000Z',
        },
        { id: 'sort-c', position: 0, createdAt },
      ]).map(({ id }) => id),
    ).toEqual(['sort-b', 'sort-c', 'sort-a']);
  });
});
