import type { Meta, StoryObj } from "@storybook/vue3";

import RecipeCard from "./RecipeCard.vue";
import { generateRecipe } from "@tests/data/defaults";

const meta: Meta<typeof RecipeCard> = {
  component: RecipeCard,
};

export default meta;

type Story = StoryObj<typeof RecipeCard>;

const Template: Story = {
  render: (args: any) => ({
    components: { RecipeCard },
    setup: () => {
      return { args };
    },
    template: '<RecipeCard v-bind="args" />',
  }),
};

export const Default: Story = {
  ...Template,
  args: {
    recipe: generateRecipe({
      name: "Fried Rice",
      courseTypes: ["Main", "Side"],
      cuisineTypes: ["American", "Chinese"],
      tags: ["fav", "St. Louis"],
      servingAmount: 4,
      servingName: "servings",
    }),
  },
};

export const OneElementHasOne: Story = {
  ...Template,
  args: {
    recipe: generateRecipe({
      name: "Fried Rice",
      courseTypes: ["Main", "Side"],
      cuisineTypes: ["American", "Chinese"],
      tags: ["fav"],
      servingAmount: 4,
      servingName: "servings",
    }),
  },
};

export const OneElementEmpty: Story = {
  ...Template,
  args: {
    recipe: generateRecipe({
      name: "Fried Rice",
      courseTypes: ["Main", "Side"],
      cuisineTypes: ["American", "Chinese"],
      tags: [],
      servingAmount: 4,
      servingName: "servings",
    }),
  },
};
