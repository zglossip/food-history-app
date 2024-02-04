//TODO: Rename this file to util

import { Ingredient } from "@/types/Ingredient";

//TODO Make sure this has a test
export const formatMeasurementText = (ingredient: Ingredient) => {
  if (ingredient.uom) {
    return `${ingredient.quantity} ${ingredient.uom}`;
  }

  return `${ingredient.quantity}`;
};
