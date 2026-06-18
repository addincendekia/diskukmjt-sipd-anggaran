export type FilterType = "tag" | "tim" | "description";

export type ActiveFilter = {
  type: FilterType;
  value: string;
};
