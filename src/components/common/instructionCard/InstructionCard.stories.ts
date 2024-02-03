import { Meta, StoryObj } from "@storybook/vue3";
import InstructionCard from "@/components/common/instructionCard/InstructionCard.vue";
import {
  InstructionCardService,
  injectionKey,
} from "@/components/common/instructionCard/instructionCardService";
import { provide, ref } from "vue";

const meta: Meta<typeof InstructionCard> = {
  component: InstructionCard,
  argTypes: { onEdit: { action: "edit clicked" } },
};

export default meta;

type Story = StoryObj<typeof InstructionCard>;

const Template: Story = {
  render: (args: any) => ({
    components: { InstructionCard },
    setup: () => {
      provide(
        injectionKey,
        (): InstructionCardService => ({
          isLoading: ref(args.isLoading),
          instructions: ref(args.instructions),
        }),
      );

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

export const Default: Story = {
  ...Template,
};

export const Loading: Story = {
  ...Template,
  args: {
    ...Template.args,
    isLoading: true,
    instructions: [],
  },
};

export const Empty: Story = {
  ...Template,
  args: {
    ...Template.args,
    instructions: [],
  },
};
