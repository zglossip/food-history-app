import { Ingredient } from "@/types/Ingredient";
import { Recipe } from "@/types/Recipe";

const DEFAULT_RECIPE: Recipe = {
  name: "test",
  courseTypes: [],
  cuisineTypes: [],
  tags: [],
  servingAmount: 1,
  servingName: "serving",
};

export const generateRecipe = (recipe: Partial<Recipe> = {}): Recipe => ({
  ...DEFAULT_RECIPE,
  ...recipe,
});

const DEFAULT_INGREDIENT: Ingredient = {
  name: "Test",
  quantity: 1,
};

export const generateIngredient = (
  ingredient: Partial<Ingredient> = {},
): Ingredient => ({
  ...DEFAULT_INGREDIENT,
  ...ingredient,
});
