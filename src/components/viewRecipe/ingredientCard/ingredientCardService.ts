import { Ingredient } from "@/types/Ingredient";
import { Ref, ref } from "vue";
import { fetchIngredients } from "@/services/apiService";

export const INJECTION_KEY = Symbol();

export interface IngredientCardService {
  ingredients: Ref<Ingredient[]>;
  isLoading: Ref<boolean>;
  onClick: () => void;
}

export const useIngredientCardService = (
  ingredientUrl: string,
  editEmit: () => void,
): IngredientCardService => {
  const ingredients: Ref<Ingredient[]> = ref([]);
  const isLoading: Ref<boolean> = ref(true);
  const onClick = () => editEmit();

  fetchIngredients(ingredientUrl)
    .then(
      (ingredientResponse: Ingredient[]) =>
        (ingredients.value = ingredientResponse),
    )
    .finally(() => (isLoading.value = false));

  return { ingredients, isLoading, onClick };
};
