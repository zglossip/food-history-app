import type { Meta, StoryObj } from "@storybook/vue3";

import RecipeCard from "./RecipeCard.vue";
import { RecipeService, injectionKey } from "@/services/recipeService";
import { generateRecipe } from "@tests/data/defaults";
import { computed, provide } from "vue";

const TEST_RECIPE_NAME = "Fried Rice";
const TEST_SERVING_TAG = "4 servings";
const TEST_CUISINE_TAG = "Cuisines: American, Chinese";
const TEST_COURSE_TAG = "Courses: Main, Side";
const TEST_TAG_TAG = "Tags: fav, St. Louis";

const meta: Meta<typeof RecipeCard> = {
  component: RecipeCard,
  argTypes: {
    onEdit: { action: "edit clicked" },
    formattedCuisineTag: {
      options: [TEST_CUISINE_TAG, false],
      type: "select",
    },
    formattedCourseTag: {
      options: [TEST_COURSE_TAG, false],
      type: "select",
    },
    formattedTagTag: {
      options: [TEST_TAG_TAG, false],
      type: "select",
    },
  },
};

export default meta;

type Story = StoryObj<typeof RecipeCard>;

const Template: Story = {
  render: (args: any) => ({
    components: { RecipeCard },
    setup: () => {
      provide(
        injectionKey,
        (): RecipeService => ({
          formattedServingTag: computed(() => args.formattedServingTag),
          formattedCuisineTag: computed(() => args.formattedCuisineTag),
          formattedCourseTag: computed(() => args.formattedCourseTag),
          formattedTagTag: computed(() => args.formattedTagTag),
          navigate: () => ({}),
        }),
      );

      return { args };
    },
    template: '<RecipeCard v-bind="args" />',
  }),
  args: {
    recipe: generateRecipe({
      name: TEST_RECIPE_NAME,
    }),
    formattedServingTag: TEST_SERVING_TAG,
    formattedCuisineTag: TEST_CUISINE_TAG,
    formattedCourseTag: TEST_COURSE_TAG,
    formattedTagTag: TEST_TAG_TAG,
  },
};

export const Default: Story = {
  ...Template,
};

export const OneMissing: Story = {
  ...Template,
  args: {
    ...Template.args,
    formattedTagTag: false,
  },
};

export const AllMissing: Story = {
  ...Template,
  args: {
    ...Template.args,
    formattedCuisineTag: false,
    formattedCourseTag: false,
    formattedTagTag: false,
  },
};
