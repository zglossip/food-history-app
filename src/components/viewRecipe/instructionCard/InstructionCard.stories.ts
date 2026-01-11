import { Meta, StoryObj } from "@storybook/vue3";
import InstructionCard from "./InstructionCard.vue";
import { InstructionCardService, injectionKey } from "./instructionCardService";
import { provide, ref } from "vue";
import { action } from "@storybook/addon-actions";

//STUBS

export const stubInstructionCardService = (args: any) => {
  provide(
    injectionKey,
    (): InstructionCardService => ({
      isLoading: ref(args.isLoading),
      instructions: ref(args.instructions),
      displayError: ref(args.displayError ?? false),
      onClick: action("button clicked"),
    }),
  );
};

//META

const meta: Meta<typeof InstructionCard> = {
  title: "View Recipe/Instruction Card",
  excludeStories: ["stubInstructionCardService"],
  component: InstructionCard,
  render: (args: any) => ({
    components: { InstructionCard },
    setup: () => {
      stubInstructionCardService(args);
      return { args };
    },
    template: '<InstructionCard v-bind="args" />',
  }),
  args: {
    id: 100,
    isLoading: false,
    instructions: ["Mix it", "Cook it", "Bop it"],
  },
};

export default meta;

//STORIES

type Story = StoryObj<typeof InstructionCard>;

export const Default: Story = {};

export const Loading: Story = {
  args: {
    isLoading: true,
    instructions: [],
  },
};

export const Empty: Story = {
  args: {
    instructions: [],
  },
};

export const Error: Story = {
  args: {
    displayError: true,
    instructions: [],
  },
};
