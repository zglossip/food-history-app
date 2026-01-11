import { fetchRecipe } from "@/services/apiService";
import { ERROR_RECIPE, LOADING_RECIPE } from "@/services/constants";
import { Recipe } from "@/types/Recipe";
import { Ref, ref } from "vue";

export const INJECTION_KEY = Symbol();

export interface EditHeaderContainerService {
  recipe: Ref<Recipe>;
}

export const useEditHeaderContainerService = (
  id: number,
): EditHeaderContainerService => {
  const recipe: Ref<Recipe> = ref(LOADING_RECIPE);

  fetchRecipe(id).then((recipeResponse) => {
    recipe.value = recipeResponse.ok ? recipeResponse.data : ERROR_RECIPE;
  });

  return { recipe };
};
