import { fetchIngredients, saveIngredients } from "@/services/apiService";
import { reorderIonicItems } from "@/services/util";
import { Ingredient } from "@/types/Ingredient";
import { Ref, ref } from "vue";
import { useRouter } from "vue-router";
import { usePageRefresher } from "@/composables/usePageRefresher";

export const INJECTION_KEY = Symbol();

export interface EditIngredientsService {
  ingredients: Ref<Ingredient[]>;
  onItemReorder: (evt: CustomEvent) => void;
  onSaveClick: () => void;
  onCancelClick: () => void;
}

export const useEditIngredientService = (
  id?: number,
): EditIngredientsService => {
  const ingredients: Ref<Ingredient[]> = ref([]);

  const router = useRouter();

  const refreshData = async (): Promise<void> => {
    if (id === undefined) {
      return;
    }
    const response = await fetchIngredients(id);
    if (response.ok) {
      ingredients.value = response.data.ingredients;
    }
  };

  usePageRefresher(refreshData);

  if (id !== undefined) {
    void refreshData();
  }

  const onItemReorder = (evt: CustomEvent) => {
    reorderIonicItems(evt, ingredients.value);
  };

  const onSaveClick = () => {
    if (id === undefined) {
      router.go(-1);
      return;
    }
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
