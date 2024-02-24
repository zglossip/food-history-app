import type { Meta, StoryObj } from "@storybook/vue3";
import { provide, ref } from "vue";
import {
  EditIngredientsService,
  INJECTION_KEY,
} from "./editIngredientsService";
import { action } from "@storybook/addon-actions";
import EditIngredientsForm from "./EditIngredientsForm.vue";
import { generateIngredient } from "@tests/data/defaults";

//STUBS

const stubEditIngredientsFormService = (args: any) => {
  const ingredients = ref(args.ingredients);

  provide(
    INJECTION_KEY,
    (): EditIngredientsService => ({
      ingredients,
      onItemReorder: (evt: CustomEvent) => {
        const from = evt.detail.from;
        const to = evt.detail.to;

        const element = ingredients.value.splice(from, 1)[0];
        ingredients.value.splice(to, 0, element);

        action("items reordered")({ to, from });
        evt.detail.complete();
      },
    }),
  );
};

//META

const meta: Meta<typeof EditIngredientsForm> = {
  title: "Create Edit/Edit Ingredients Form",
  component: EditIngredientsForm,
  render: (args: any) => ({
    components: { EditIngredientsForm },
    setup: () => {
      stubEditIngredientsFormService(args);
      return { ...args };
    },
    template: `<EditIngredientsForm :recipe-id="recipeId" />`,
  }),
  args: {
    ingredients: [
      generateIngredient(),
      generateIngredient({ quantity: 2, name: "Test Item 2", uom: "Tbs" }),
      generateIngredient({
        name: "Test Item 3",
        notes: "A note about the item",
      }),
    ],
    recipeId: 100,
  },
};

export default meta;

//STORIES

type Story = StoryObj<typeof EditIngredientsForm>;

export const Default: Story = {};

export const Empty: Story = {
  args: {
    ingredients: [],
  },
};
