import type { Meta, StoryObj } from "@storybook/vue3";
import IngredientCard from "./IngredientCard.vue";
import { provide, ref } from "vue";
import { IngredientCardService, INJECTION_KEY } from "./ingredientCardService";
import { generateIngredient } from "@tests/data/defaults";
import { action } from "@storybook/addon-actions";

//STUBS

export const stubIngredientCardService = (args: any) => {
  provide(
    INJECTION_KEY,
    (): IngredientCardService => ({
      isLoading: ref(args.isLoading),
      ingredients: ref(args.ingredients),
      onClick: action("button clicked"),
    }),
  );
};

//META

const meta: Meta<typeof IngredientCard> = {
  title: "View Recipe/Ingredient Card",
  excludeStories: ["stubIngredientCardService"],
  component: IngredientCard,
  render: (args: any) => ({
    components: { IngredientCard },
    setup: () => {
      stubIngredientCardService(args);
      return { args };
    },
    template: '<IngredientCard v-bind="args" />',
  }),
  args: {
    id: 100,
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

export default meta;

type Story = StoryObj<typeof IngredientCard>;

export const Default: Story = {};

export const Loading: Story = {
  args: {
    isLoading: true,
    ingredients: [],
  },
};

export const Empty: Story = {
  args: {
    ingredients: [],
  },
};
