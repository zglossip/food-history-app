import { Recipe } from "@/types/Recipe";
import { ComputedRef, Ref, computed } from "vue";
import { Router } from "vue-router";

export const injectionKey = Symbol();

export interface RecipeService {
  formattedServingTag: ComputedRef<string>;
  formattedCuisineTag: ComputedRef<string | boolean>;
  formattedCourseTag: ComputedRef<string | boolean>;
  formattedTagTag: ComputedRef<string | boolean>;
  recipeSourceUrl: ComputedRef<string | null>;
  navigate: VoidFunction;
  onClick: () => void;
}

export const useRecipeService = (
  recipe: Ref<Recipe | null>,
  router?: Router,
  editEmit?: () => void,
): RecipeService => {
  const formatTag = (
    tagName: string,
    tags?: Array<string>,
  ): string | boolean => {
    if (!tags || tags.length === 0) {
      return false;
    }

    if (tags.length === 1) {
      return `${tagName}: ${tags[0]}`;
    }

    return `${tagName}s: ${tags.reduce(
      (prev: string, cur: string) => `${prev}, ${cur}`,
    )}`;
  };

  const formattedServingTag: ComputedRef<string> = computed(() => {
    return `${recipe.value?.servingAmount} ${recipe.value?.servingName}`;
  });

  const formattedCuisineTag: ComputedRef<string | boolean> = computed(() =>
    formatTag("Cusine", recipe.value?.cuisineTypes),
  );

  const formattedCourseTag: ComputedRef<string | boolean> = computed(() =>
    formatTag("Course", recipe.value?.courseTypes),
  );

  const formattedTagTag: ComputedRef<string | boolean> = computed(() =>
    formatTag("Tag", recipe.value?.tags),
  );

  const recipeSourceUrl: ComputedRef<string | null> = computed(() => {
    if (recipe.value && recipe.value.recipeSourceUrl) {
      return recipe.value.recipeSourceUrl;
    }

    return null;
  });

  const navigate = (): void => {
    router?.push(`/recipe/${recipe.value?.id}`);
  };

  const onClick = editEmit
    ? () => editEmit()
    : () => {
        throw Error("No emit provided");
      };

  return {
    formattedServingTag,
    formattedCuisineTag,
    formattedCourseTag,
    formattedTagTag,
    recipeSourceUrl,
    navigate,
    onClick,
  };
};
