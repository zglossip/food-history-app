import { Ingredient } from "@/types/Ingredient";
import { Ref, ref } from "vue";
import { fetchIngredients } from "@/services/apiService";
import { IngredientList } from "@/types/IngredientList";

export const INJECTION_KEY = Symbol();

export interface IngredientCardService {
  ingredients: Ref<Ingredient[]>;
  isLoading: Ref<boolean>;
  onClick: () => void;
}

export const useIngredientCardService = (
  id: number,
  editEmit: () => void,
): IngredientCardService => {
  const ingredients: Ref<Ingredient[]> = ref([]);
  const isLoading: Ref<boolean> = ref(true);
  const onClick = () => editEmit();

  fetchIngredients(id)
    .then(
      (ingredientResponse: IngredientList) =>
        (ingredients.value = ingredientResponse.ingredients),
    )
    .finally(() => (isLoading.value = false));

  return { ingredients, isLoading, onClick };
};
