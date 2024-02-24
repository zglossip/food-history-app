import { fetchIngredients } from "@/services/apiService";
import { Ingredient } from "@/types/Ingredient";
import { Ref, ref } from "vue";

export const INJECTION_KEY = Symbol();

export interface EditIngredientsService {
  ingredients: Ref<Ingredient[]>;
  onItemReorder: (evt: CustomEvent) => void;
}

export const useEditIngredientService = (
  id: number,
): EditIngredientsService => {
  const ingredients: Ref<Ingredient[]> = ref([]);

  fetchIngredients(id).then(
    (response) => (ingredients.value = response.ingredients),
  );

  const onItemReorder = (evt: CustomEvent) => {
    const from = evt.detail.from;
    const to = evt.detail.to;

    const element = ingredients.value.splice(from, 1)[0];
    ingredients.value.splice(to, 0, element);

    evt.detail.complete();
  };

  return { ingredients, onItemReorder };
};
