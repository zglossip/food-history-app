import { Ingredient } from "@/types/Ingredient";

export type IngredientList = {
  recipeId: number;
  recipe?: string;
  ingredients: Ingredient[];
};
