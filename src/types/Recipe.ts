export type Recipe = {
  id?: number;
  link?: string;
  name: string;
  courseTypes: string[];
  cuisineTypes: string[];
  tags: string[];
  servingAmount: number;
  servingName: string;
  recipeSourceUrl?: string;
  ingredients?: string;
  instructions?: string;
  uploaded: string | null;
};
