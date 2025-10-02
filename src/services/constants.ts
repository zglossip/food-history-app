import { FilterType } from "@/types/FilterType";

//TODO: Add something in the readme about this
//TODO: Make this environment specific ESPECIALLY BEFORE DEPLOY
export const BACKEND_BASE = import.meta.env.VITE_BACKEND_BASE;

export const FILTER_OPTIONS: FilterType[] = [
  FilterType.COURSE,
  FilterType.CUISINE,
  FilterType.TAG,
];
