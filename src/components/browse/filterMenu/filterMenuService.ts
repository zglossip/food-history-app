import { FILTER_OPTIONS } from "@/services/constants";
import { FilterChipData } from "@/types/FilterChipData";
import { FilterType } from "@/types/FilterType";
import { Ref, readonly, ref } from "vue";

export interface FilterMenuService {
  filterOptions: FilterType[];
  currentFilterType: Ref<FilterType>;
  setCurrentFilterType: (_currentFilterType: FilterType) => void;
  filterText: Ref<string>;
  setFilterText: (_filterText: string) => void;
  courseTypeFilters: Ref<string[]>;
  cuisineTypeFilters: Ref<string[]>;
  tagFilters: Ref<string[]>;
  addFilter: () => void;
  removeChip: (data: FilterChipData) => void;
}

export const injectionKey = Symbol();

//TODO: Write tests
export const useFilterMenuService = (
  startingName: string,
  startingCourseTypes: string[],
  startingCuisineTypes: string[],
  startingTags: string[]
): FilterMenuService => {
  const currentFilterType = ref(FilterType.COURSE);
  const filterText = ref("");
  const courseTypeFilters: Ref<string[]> = ref(
    startingCourseTypes ? startingCourseTypes : []
  );
  const cuisineTypeFilters: Ref<string[]> = ref(
    startingCuisineTypes ? startingCuisineTypes : []
  );
  const tagFilters: Ref<string[]> = ref(startingTags ? startingTags : []);

  const setCurrentFilterType = (_currentFilterType: FilterType) =>
    (currentFilterType.value = _currentFilterType);
  const setFilterText = (_filterText: string) =>
    (filterText.value = _filterText);

  const addFilter = () => {
    switch (currentFilterType.value) {
      case FilterType.COURSE:
        if (courseTypeFilters.value.find((a: any) => a === filterText.value)) {
          break;
        }
        courseTypeFilters.value.push(filterText.value);
        break;
      case FilterType.CUISINE:
        if (cuisineTypeFilters.value.find((a: any) => a === filterText.value)) {
          break;
        }
        cuisineTypeFilters.value.push(filterText.value);
        break;
      case FilterType.TAG:
        if (tagFilters.value.find((a: any) => a === filterText.value)) {
          break;
        }
        tagFilters.value.push(filterText.value);
        break;
      default:
        return;
    }
  };

  const removeChip = (data: FilterChipData) => {
    switch (data.type) {
      case FilterType.COURSE:
        courseTypeFilters.value = courseTypeFilters.value.filter(
          (a) => a !== data.value
        );
        break;
      case FilterType.CUISINE:
        cuisineTypeFilters.value = cuisineTypeFilters.value.filter(
          (a) => a !== data.value
        );
        break;
      case FilterType.TAG:
        tagFilters.value = tagFilters.value.filter((a) => a !== data.value);
        break;
      default:
        return;
    }
  };

  return {
    filterOptions: FILTER_OPTIONS,
    currentFilterType: readonly(currentFilterType),
    setCurrentFilterType,
    filterText: readonly(filterText),
    setFilterText,
    courseTypeFilters: courseTypeFilters,
    cuisineTypeFilters: cuisineTypeFilters,
    tagFilters: tagFilters,
    addFilter,
    removeChip,
  };
};
