import { Ingredient } from "@/models/Ingredient";

export type IngredientList = {
  recipeId: number;
  recipe?: string;
  ingredients: Ingredient[];
};
