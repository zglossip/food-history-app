import { Ingredient } from "@/types/Ingredient";
import { Ref, ref } from "vue";
import { fetchIngredients } from "@/services/apiService";

export const injectionKey = Symbol();

export interface IngredientCardService {
  ingredients: Ref<Ingredient[]>;
  isLoading: Ref<boolean>;
}

export const useIngredientCardService = (
  recipeId: number
): IngredientCardService => {
  const ingredients: Ref<Ingredient[]> = ref([]);
  const isLoading: Ref<boolean> = ref(true);

  fetchIngredients(recipeId).then(
    (ingredientResponse: Ingredient[]) =>
      (ingredients.value = ingredientResponse)
  )
  .finally(() => isLoading.value = false)

  return { ingredients, isLoading };
};
