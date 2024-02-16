import { fetchRecipe } from "@/services/apiService";
import { Recipe } from "@/types/Recipe";
import { Ref, ref } from "vue";

export const INJECTION_KEY = Symbol();

export interface ViewRecipeContainerService {
  isLoading: Ref<boolean>;
  recipe: Ref<Recipe | null>;
}

export const useViewRecipeContainerService = (
  id: number,
): ViewRecipeContainerService => {
  const isLoading: Ref<boolean> = ref(false);
  const recipe: Ref<Recipe | null> = ref(null);

  fetchRecipe(id).then((r) => (recipe.value = r));

  return { isLoading, recipe };
};
