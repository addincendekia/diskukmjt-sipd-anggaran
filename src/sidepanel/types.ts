export type FilterType = "tag" | "group" | "description";

export type ActiveFilter = {
  type: FilterType;
  value: string;
};
