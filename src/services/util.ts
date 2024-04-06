import { Ingredient } from "@/types/Ingredient";

export const formatMeasurementText = (ingredient: Ingredient) => {
  if (ingredient.uom) {
    return `${ingredient.quantity} ${ingredient.uom}`;
  }

  return `${ingredient.quantity}`;
};

/** This function is specific to the Ionic reorder component */
export const reorderIonicItems = (evt: CustomEvent, array: any[]) => {
  const from = evt.detail.from;
  const to = evt.detail.to;

  const element = array.splice(from, 1)[0];
  array.splice(to, 0, element);

  evt.detail.complete();
};
