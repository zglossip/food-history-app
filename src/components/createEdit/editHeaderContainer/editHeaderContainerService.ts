import { fetchRecipe } from "@/services/apiService";
import { ERROR_RECIPE, LOADING_RECIPE } from "@/services/constants";
import { Recipe } from "@/types/Recipe";
import { Ref, ref } from "vue";

export const INJECTION_KEY = Symbol();

export interface EditHeaderContainerService {
  recipe: Ref<Recipe | undefined>;
}

export const useEditHeaderContainerService = (
  id?: number,
): EditHeaderContainerService => {
  const recipe: Ref<Recipe | undefined> = ref(
    id === undefined ? undefined : LOADING_RECIPE,
  );

  if (id !== undefined) {
    fetchRecipe(id).then((recipeResponse) => {
      recipe.value = recipeResponse.ok ? recipeResponse.data : ERROR_RECIPE;
    });
  }

  return { recipe };
};
