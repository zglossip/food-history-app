import { Recipe } from "@/models/Recipe";
import { ComputedRef, Ref, computed, toRefs } from "vue";

export interface RecipeCardService {
  formattedServingTag: ComputedRef<string>;
  formattedCuisineTag: ComputedRef<string | boolean>;
  formattedCourseTag: ComputedRef<string | boolean>;
  formattedTagTag: ComputedRef<string | boolean>;
}

export const useRecipeCardService = (
  recipe: Ref<Recipe>
): RecipeCardService => {
  const formatTag = (
    tagName: string,
    tags: Array<string>
  ): string | boolean => {
    if (!tags || tags.length === 0) {
      return false;
    }

    if (tags.length === 1) {
      return `${tagName}: ${tags[0]}`;
    }

    return `${tagName}s: ${tags.reduce(
      (prev: string, cur: string) => `${prev}, ${cur}`
    )}`;
  };

  const formattedServingTag: ComputedRef<string> = computed(() => {
    return `${recipe.value.servingAmount} ${recipe.value.servingName}`;
  });

  const formattedCuisineTag: ComputedRef<string | boolean> = computed(() =>
    formatTag("Cusine", recipe.value.cuisineTypes)
  );

  const formattedCourseTag: ComputedRef<string | boolean> = computed(() =>
    formatTag("Course", recipe.value.courseTypes)
  );

  const formattedTagTag: ComputedRef<string | boolean> = computed(() =>
    formatTag("Tag", recipe.value.tags)
  );

  return {
    formattedServingTag,
    formattedCuisineTag,
    formattedCourseTag,
    formattedTagTag,
  };
};
