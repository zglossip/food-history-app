import { fetchIngredients, saveIngredients } from "@/services/apiService";
import { reorderIonicItems } from "@/services/util";
import { Ingredient } from "@/types/Ingredient";
import { Ref, ref } from "vue";
import { useRouter } from "vue-router";

export const INJECTION_KEY = Symbol();

export interface EditIngredientsService {
  ingredients: Ref<Ingredient[]>;
  onItemReorder: (evt: CustomEvent) => void;
  onSaveClick: () => void;
  onCancelClick: () => void;
}

export const useEditIngredientService = (
  id: number,
): EditIngredientsService => {
  const ingredients: Ref<Ingredient[]> = ref([]);

  const router = useRouter();

  fetchIngredients(id).then(
    (response) => (ingredients.value = response.ingredients),
  );

  const onItemReorder = (evt: CustomEvent) => {
    reorderIonicItems(evt, ingredients.value);
  };

  const onSaveClick = () => {
    saveIngredients({
      ingredients: ingredients.value,
      recipeId: id,
    });

    router.go(-1);
  };

  const onCancelClick = () => {
    router.go(-1);
  };

  return { ingredients, onItemReorder, onSaveClick, onCancelClick };
};
