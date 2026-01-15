import { Recipe } from "@/types/Recipe";
import { ComputedRef, Ref, computed } from "vue";
import { useRouter } from "vue-router";

export const injectionKey = Symbol();

export interface RecipeService {
  formattedServingTag: ComputedRef<string>;
  formattedCuisineTag: ComputedRef<string | boolean>;
  formattedCourseTag: ComputedRef<string | boolean>;
  formattedTagTag: ComputedRef<string | boolean>;
  source: ComputedRef<string | null>;
  navigate: VoidFunction;
  onClick: () => void;
}

export const useRecipeService = (
  recipe: Ref<Recipe | null>,
  editEmit?: () => void,
): RecipeService => {
  const router = useRouter();

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
    if (!recipe.value) {
      return "";
    }

    const { servingAmount, servingName } = recipe.value;
    if (servingAmount === undefined || servingName === undefined) {
      return "";
    }

    return `${servingAmount} ${servingName}`.trim();
  });

  const formattedCuisineTag: ComputedRef<string | boolean> = computed(() =>
    formatTag("Cuisine", recipe.value?.cuisineTypes),
  );

  const formattedCourseTag: ComputedRef<string | boolean> = computed(() =>
    formatTag("Course", recipe.value?.courseTypes),
  );

  const formattedTagTag: ComputedRef<string | boolean> = computed(() =>
    formatTag("Tag", recipe.value?.tags),
  );

  const source: ComputedRef<string | null> = computed(() => {
    if (recipe.value && recipe.value.source) {
      return recipe.value.source;
    }

    return null;
  });

  const navigate = (): void => {
    router.push(`/recipe/${recipe.value?.id}`);
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
    source,
    navigate,
    onClick,
  };
};
