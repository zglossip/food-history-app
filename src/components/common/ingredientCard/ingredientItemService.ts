import { Ingredient } from "@/types/Ingredient";
import { ComputedRef, Ref, computed } from "vue";

export const injectionKey = Symbol();

export interface IngredientItemService {
  formattedMeasurementText: ComputedRef<string>;
}

export const useIngredientItemService = (
  ingredient: Ref<Ingredient>
): IngredientItemService => {
  const formattedMeasurementText = computed(() => {
    if (ingredient.value.uom) {
      return `${ingredient.value.quantity} ${ingredient.value.uom}`;
    }

    return `${ingredient.value.quantity}`;
  });

  return { formattedMeasurementText };
};
