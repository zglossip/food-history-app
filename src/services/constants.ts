import { FilterType } from "@/types/FilterType";

//TODO: Add something in the readme about this
//TODO: Make this environment specific ESPECIALLY BEFORE DEPLOY
export const BACKEND_BASE = "http://localhost:8080";

export const FILTER_OPTIONS: FilterType[] = [
  FilterType.COURSE,
  FilterType.CUISINE,
  FilterType.TAG,
];
