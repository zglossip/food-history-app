import type { Meta, StoryObj } from "@storybook/vue3";
import { provide, ref } from "vue";
import {
  EditInstructionsService,
  INJECTION_KEY,
} from "./editInstructionsService";
import { action } from "@storybook/addon-actions";
import EditInstructionsForm from "./EditInstructionsForm.vue";

//STUBS

const stubEditInstructionsService = (args: any) => {
  const instructions = ref(args.instructions);

  provide(
    INJECTION_KEY,
    (): EditInstructionsService => ({
      instructions,
      onItemReorder: (evt: CustomEvent) => {
        const from = evt.detail.from;
        const to = evt.detail.to;

        const element = instructions.value.splice(from, 1)[0];
        instructions.value.splice(to, 0, element);

        action("items reordered")({ to, from });
        evt.detail.complete();
      },
      onSaveClick: action("saved"),
      onCancelClick: action("cancelled"),
    }),
  );
};

//META

const meta: Meta<typeof EditInstructionsForm> = {
  title: "Create Edit/Edit Instructions Form",
  component: EditInstructionsForm,
  render: (args: any) => ({
    components: { EditInstructionsForm },
    setup: () => {
      stubEditInstructionsService(args);
      return { ...args };
    },
    template: `<EditInstructionsForm :recipe-id="recipeId" />`,
  }),
  args: {
    instructions: ["Bob it", "Pull it", "Twist it"],
    recipeId: 100,
  },
};

export default meta;

//STORIES

type Story = StoryObj<typeof EditInstructionsForm>;

export const Default: Story = {};

export const Empty: Story = {
  args: {
    instructions: [],
  },
};
