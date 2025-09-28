import { provide, ref } from "vue";
import {
  CreateSingleContainerService,
  INJECTION_KEY,
} from "./createSingleContainerService";
import { Meta, StoryObj } from "@storybook/vue3";
import { action } from "@storybook/addon-actions";
import CreateSingleContainer from "./CreateSingleContainer.vue";

//STUBS

const stubCreateSingleContainerService = (): void => {
  provide(
    INJECTION_KEY,
    (): CreateSingleContainerService => ({
      name: ref(""),
      coursesString: ref(""),
      cuisinesString: ref(""),
      tagsString: ref(""),
      servingAmount: ref(0),
      servingName: ref(""),
      sourceUrl: ref(""),
      ingredientsString: ref(""),
      instructionsString: ref(""),
      add: action("add"),
    }),
  );
};

const meta: Meta<typeof CreateSingleContainer> = {
  title: "Create Edit/Create Single Container",
  component: CreateSingleContainer,
  render: () => ({
    components: { CreateSingleContainer },
    setup: () => {
      stubCreateSingleContainerService();
    },
    template: `<CreateSingleContainer />`,
  }),
};

export default meta;

//STORIES

type Story = StoryObj<typeof CreateSingleContainer>;

export const Default: Story = {};
