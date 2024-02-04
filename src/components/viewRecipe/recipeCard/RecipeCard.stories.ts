import type { Meta, StoryObj } from "@storybook/vue3";

import RecipeCard from "./RecipeCard.vue";
import { RecipeService, injectionKey } from "@/services/recipeService";
import { generateRecipe } from "@tests/data/defaults";
import { computed, provide } from "vue";
import { action } from "@storybook/addon-actions";

//STUBS

const stubRecipeService = (args: any) => {
  provide(
    injectionKey,
    (): RecipeService => ({
      formattedServingTag: computed(() => args.formattedServingTag),
      formattedCuisineTag: computed(() => args.formattedCuisineTag),
      formattedCourseTag: computed(() => args.formattedCourseTag),
      formattedTagTag: computed(() => args.formattedTagTag),
      navigate: () => ({}),
      onClick: action("button clicked"),
    }),
  );
};

//META

const TEST_RECIPE_NAME = "Fried Rice";
const TEST_SERVING_TAG = "4 servings";
const TEST_CUISINE_TAG = "Cuisines: American, Chinese";
const TEST_COURSE_TAG = "Courses: Main, Side";
const TEST_TAG_TAG = "Tags: fav, St. Louis";

const meta: Meta<typeof RecipeCard> = {
  title: "View Recipe/Recipe Card",
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
  render: (args: any) => ({
    components: { RecipeCard },
    setup: () => {
      stubRecipeService(args);
      return { ...args };
    },
    template: '<RecipeCard :recipe="recipe" />',
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

export default meta;

//STORIES

type Story = StoryObj<typeof RecipeCard>;

export const Default: Story = {};

export const OneMissing: Story = {
  args: {
    formattedTagTag: false,
  },
};

export const AllMissing: Story = {
  args: {
    formattedCuisineTag: false,
    formattedCourseTag: false,
    formattedTagTag: false,
  },
};
