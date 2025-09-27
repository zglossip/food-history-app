import { fetchRecipe } from "@/services/apiService";
import { Recipe } from "@/types/Recipe";
import { Ref, ref } from "vue";

export const INJECTION_KEY = Symbol();

export interface EditHeaderContainerService {
  recipe: Ref<Recipe | null>;
}

export const useEditHeaderContainerService = (
  id: number,
): EditHeaderContainerService => {
  const recipe: Ref<Recipe | null> = ref(null);

  fetchRecipe(id).then((recipeResponse) => (recipe.value = recipeResponse));

  return { recipe };
};
