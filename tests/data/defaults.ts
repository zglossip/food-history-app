import { Recipe } from "@/models/Recipe";

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
