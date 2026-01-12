import { fetchRecipe } from "@/services/apiService";
import { EMPTY_RECIPE, ERROR_RECIPE, LOADING_RECIPE } from "@/services/constants";
import { Recipe } from "@/types/Recipe";
import { Ref, ref } from "vue";

export const INJECTION_KEY = Symbol();

export interface EditHeaderContainerService {
  recipe: Ref<Recipe>;
}

export const useEditHeaderContainerService = (
  id?: number,
): EditHeaderContainerService => {
  const recipe: Ref<Recipe> = ref(id === undefined ? EMPTY_RECIPE : LOADING_RECIPE);

  if (id !== undefined) {
    fetchRecipe(id).then((recipeResponse) => {
      recipe.value = recipeResponse.ok ? recipeResponse.data : ERROR_RECIPE;
    });
  }

  return { recipe };
};
