import type { Meta, StoryObj } from "@storybook/vue3";

import IngredientCard from "./IngredientCard.vue";
import { provide, ref } from "vue";
import { IngredientCardService, injectionKey } from "./ingredientCardService";
import { generateIngredient } from "@tests/data/defaults";

const meta: Meta<typeof IngredientCard> = {
  component: IngredientCard,
  argTypes: { onEdit: { action: "edit clicked" } },
};

export default meta;

type Story = StoryObj<typeof IngredientCard>;

const Template: Story = {
  render: (args: any) => ({
    components: { IngredientCard },
    setup: () => {
      provide(
        injectionKey,
        (): IngredientCardService => ({
          isLoading: ref(args.isLoading),
          ingredients: ref(args.ingredients),
        }),
      );

      return { args };
    },
    template: '<IngredientCard v-bind="args" />',
  }),
  args: {
    ingredientUrl: "www.test.com",
    isLoading: false,
    ingredients: [
      generateIngredient({
        name: "Cooked Rice",
        quantity: 3,
        uom: "Cup",
        notes: "Day old",
      }),
      generateIngredient({
        name: "Vegetable Oil",
        quantity: 2,
        uom: "Tbs",
      }),
      generateIngredient({
        name: "Soy sauce",
        quantity: 1,
        uom: "Tbs",
      }),
      generateIngredient({
        name: "Green onions",
        quantity: 2,
      }),
    ],
  },
};

export const Default: Story = {
  ...Template,
};

export const Loading: Story = {
  ...Template,
  args: {
    ...Template.args,
    isLoading: true,
    ingredients: [],
  },
};

export const Empty: Story = {
  ...Template,
  args: {
    ...Template.args,
    ingredients: [],
  },
};
