// A missing position keeps the previous createdAt, then id, order until the column exists.
export const sortViewSortsByPriority = <
  TViewSort extends { id: string; createdAt: Date; position?: number },
>(
  viewSorts: TViewSort[],
): TViewSort[] =>
  [...viewSorts].sort(
    (firstViewSort, secondViewSort) =>
      (firstViewSort.position ?? 0) - (secondViewSort.position ?? 0) ||
      firstViewSort.createdAt.getTime() - secondViewSort.createdAt.getTime() ||
      firstViewSort.id.localeCompare(secondViewSort.id),
  );
