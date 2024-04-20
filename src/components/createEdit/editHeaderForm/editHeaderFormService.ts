import { Recipe } from "@/types/Recipe";
import { Ref, ref } from "vue";
import { createRecipe, saveRecipe } from "@/services/apiService";
import { FILTER_OPTIONS } from "@/services/constants";
import { FilterType } from "@/types/FilterType";
import { FilterChipData } from "@/types/FilterChipData";
import { useRouter } from "vue-router";

export const INJECTION_KEY = Symbol();

export interface EditHeaderFormService {
  newName: Ref<string>;
  newServingAmount: Ref<number>;
  newServingName: Ref<string>;
  newCourseTypes: Ref<string[]>;
  newCuisineTypes: Ref<string[]>;
  newTags: Ref<string[]>;
  filterOptions: FilterType[];
  filterText: Ref<string>;
  currentFilterType: Ref<FilterType>;
  removeChip: (data: FilterChipData) => void;
  addChip: () => void;
  onSaveClick: () => void;
  onCancelClick: () => void;
}

export const useEditHeaderFormService = (
  recipe?: Recipe | null,
): EditHeaderFormService => {
  const newName = ref(recipe?.name ?? "");
  const newServingAmount = ref(recipe?.servingAmount ?? 0);
  const newServingName = ref(recipe?.servingName ?? "");
  const newCourseTypes = ref(recipe?.courseTypes ?? []);
  const newCuisineTypes = ref(recipe?.cuisineTypes ?? []);
  const newTags = ref(recipe?.tags ?? []);
  const currentFilterType = ref(FilterType.COURSE);
  const filterText = ref("");

  const router = useRouter();

  const removeChip = (data: FilterChipData) => {
    switch (data.type) {
      case FilterType.COURSE:
        newCourseTypes.value = newCourseTypes.value.filter(
          (a) => a !== data.value,
        );
        break;
      case FilterType.CUISINE:
        newCuisineTypes.value = newCuisineTypes.value.filter(
          (a) => a !== data.value,
        );
        break;
      case FilterType.TAG:
        newTags.value = newTags.value.filter((a) => a !== data.value);
        break;
      default:
        return;
    }
  };

  const addChip = () => {
    switch (currentFilterType.value) {
      case FilterType.COURSE:
        if (newCourseTypes.value.find((a: any) => a === filterText.value)) {
          break;
        }
        newCourseTypes.value.push(filterText.value);
        break;
      case FilterType.CUISINE:
        if (newCuisineTypes.value.find((a: any) => a === filterText.value)) {
          break;
        }
        newCuisineTypes.value.push(filterText.value);
        break;
      case FilterType.TAG:
        if (newTags.value.find((a: any) => a === filterText.value)) {
          break;
        }
        newTags.value.push(filterText.value);
        break;
      default:
        return;
    }
  };

  const onSaveClick = () => {
    if (recipe) {
      saveRecipe({
        ...recipe,
        name: newName.value,
        servingAmount: newServingAmount.value,
        servingName: newServingName.value,
        courseTypes: newCourseTypes.value,
        cuisineTypes: newCuisineTypes.value,
        tags: newTags.value,
      });
    } else {
      createRecipe({
        name: newName.value,
        servingAmount: newServingAmount.value,
        servingName: newServingName.value,
        courseTypes: newCourseTypes.value,
        cuisineTypes: newCuisineTypes.value,
        tags: newTags.value,
      });
    }
    router.go(-1);
  };

  const onCancelClick = () => {
    router.go(-1);
  };

  return {
    newName,
    newServingAmount,
    newServingName,
    newCourseTypes,
    newCuisineTypes,
    newTags,
    currentFilterType,
    filterText,
    filterOptions: FILTER_OPTIONS,
    addChip,
    removeChip,
    onSaveClick,
    onCancelClick,
  };
};
