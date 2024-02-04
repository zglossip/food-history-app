import { Meta, StoryObj } from "@storybook/vue3";
import InstructionCard from "@/components/common/instructionCard/InstructionCard.vue";
import {
  InstructionCardService,
  injectionKey,
} from "@/components/common/instructionCard/instructionCardService";
import { provide, ref } from "vue";
import { action } from "@storybook/addon-actions";

//STUBS

const stubInstructionCardService = (args: any) => {
  provide(
    injectionKey,
    (): InstructionCardService => ({
      isLoading: ref(args.isLoading),
      instructions: ref(args.instructions),
      onClick: action("button clicked"),
    }),
  );
};

//META

const meta: Meta<typeof InstructionCard> = {
  title: "Common/Instruction Card",
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
    instructionUrl: "www.test.com",
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
