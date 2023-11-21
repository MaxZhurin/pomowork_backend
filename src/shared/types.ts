export type QueryDTO = {
  filter: object;
  range: number[];
  sort: string[];
  limit?: number;
  offset?: number;
};
