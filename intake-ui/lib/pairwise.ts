// Pure helpers for working with pairwise records on the client. Kept in a
// separate module so client components can import them without dragging the
// server-only `node:fs` / `node:path` imports from lib/artifacts.ts into the
// client bundle.

/**
 * Find the pairwise record for a pair (a, b) regardless of file ordering.
 * Returns the record with `winner` flipped if the file stored the pair in
 * (b, a) order, so the caller can render in their own (a, b) orientation.
 */
export function findPair<T extends { candidate_a: string; candidate_b: string; winner: string }>(
  records: T[] | undefined,
  a: string,
  b: string,
): { record: T; oriented: T } | undefined {
  if (!records) return undefined;
  for (const r of records) {
    if (r.candidate_a === a && r.candidate_b === b) {
      return { record: r, oriented: r };
    }
    if (r.candidate_a === b && r.candidate_b === a) {
      const flippedWinner = r.winner === "A" ? "B" : r.winner === "B" ? "A" : r.winner;
      const oriented = { ...r, candidate_a: a, candidate_b: b, winner: flippedWinner } as T;
      return { record: r, oriented };
    }
  }
  return undefined;
}
