import type { Meta, StoryObj } from "@storybook/vue3";

import FilterChips from "./FilterChips.vue";

const meta: Meta<typeof FilterChips> = {
  component: FilterChips,
  argTypes: { onRemoveChip: { action: "chip removed" } },
};

export default meta;

type Story = StoryObj<typeof FilterChips>;

const Template: Story = {
  render: (args: any) => ({
    components: { FilterChips },
    setup: () => {
      return { args };
    },
    template: `<FilterChips v-bind="args" />`,
  }),
};

export const Full: Story = {
  ...Template,
  args: {
    courseTypes: ["Main", "Side"],
    cuisineTypes: ["American"],
    tags: ["fav"],
  },
};

export const Empty: Story = {
  ...Template,
  args: {
    courseTypes: [],
    cuisineTypes: [],
    tags: [],
  },
};
