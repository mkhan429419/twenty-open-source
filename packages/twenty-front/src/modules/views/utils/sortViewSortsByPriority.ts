// The metadata store keeps sorts in insertion order. Position is the priority.
export const sortViewSortsByPriority = <
  TViewSort extends {
    id: string;
    createdAt?: string | null;
    position?: number | null;
  },
>(
  viewSorts: TViewSort[],
): TViewSort[] =>
  [...viewSorts].sort(
    (firstViewSort, secondViewSort) =>
      (firstViewSort.position ?? 0) - (secondViewSort.position ?? 0) ||
      (firstViewSort.createdAt ?? '').localeCompare(
        secondViewSort.createdAt ?? '',
      ) ||
      firstViewSort.id.localeCompare(secondViewSort.id),
  );
