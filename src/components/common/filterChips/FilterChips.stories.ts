import type { Meta, StoryObj } from "@storybook/vue3";

import FilterChips from "./FilterChips.vue";
import { provide } from "vue";
import {
  FilterChipSetService,
  INJECTION_KEY as SET_INJECTION_KEY,
} from "./filterChipSetService";
import { FilterChipService, INJECTION_KEY } from "./filterChipService";
import { action } from "@storybook/addon-actions";

//STUBS

export const stubFilterChipsSetService = () => {
  provide(
    SET_INJECTION_KEY,
    (closeEmit: (element: string) => void): FilterChipSetService => ({
      onClose: (element: string) => closeEmit(element),
    }),
  );
};

export const stubFilterChipService = () => {
  provide(
    INJECTION_KEY,
    (): FilterChipService => ({
      onClose: action("remove chip"),
    }),
  );
};

//META

const meta: Meta<typeof FilterChips> = {
  title: "Common/Filter Chips",
  component: FilterChips,
  excludeStories: ["stubFilterChipsSetService", "stubFilterChipService"],
  render: (args: any) => ({
    components: { FilterChips },
    setup: () => {
      stubFilterChipsSetService();
      stubFilterChipService();
      return { ...args };
    },
    template: `<FilterChips :course-types="courseTypes" :cuisine-types="cuisineTypes" :tags="tags" />`,
  }),
};

export default meta;

//STORIES

type Story = StoryObj<typeof FilterChips>;

export const Full: Story = {
  args: {
    courseTypes: ["Main", "Side"],
    cuisineTypes: ["American"],
    tags: ["fav"],
  },
};

export const Empty: Story = {
  args: {
    courseTypes: [],
    cuisineTypes: [],
    tags: [],
  },
};
