import { FilterChipData } from "@/types/FilterChipData";
import { FilterType } from "@/types/FilterType";

export const INJECTION_KEY = Symbol();

export interface FilterChipService {
  onClose: (filterType: FilterType, element: string) => void;
}

export const useFilterChipService = (
  removeChipEmit: (data: FilterChipData) => void,
): FilterChipService => {
  const onClose = (filterType: FilterType, element: string) =>
    removeChipEmit({
      type: filterType,
      value: element,
    });

  return { onClose };
};
