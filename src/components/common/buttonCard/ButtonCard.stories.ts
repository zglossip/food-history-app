import { Meta, StoryObj } from "@storybook/vue3";
import ButtonCard from "./ButtonCard.vue";
import { IonCardSubtitle, IonCardTitle } from "@ionic/vue";

const meta: Meta<typeof ButtonCard> = {
  component: ButtonCard,
  argTypes: { onClick: { action: "button clicked" } },
};

export default meta;

type Story = StoryObj<typeof ButtonCard>;

//TODO: Why is this here?
// const generateTemplate = (
//   template: string,
//   headerProp: string | null
// ): Story => ({
//   render: (args: any) => ({
//     components: { ButtonCard },
//     setup: () => ({ args }),
//     template,
//   }),
//   args: {
//     buttonText: "ACTION",
//     headerText: headerProp,
//   },
// });

export const HeaderProp: Story = {
  render: (args: any) => ({
    components: { ButtonCard },
    setup: () => ({ args }),
    template: `
          <ButtonCard v-bind="args" >
            {{args.content}}
          </ButtonCard>
        `,
  }),
  args: {
    headerText: "Header",
    content: "Some Content",
  },
};

export const HeaderSlot: Story = {
  render: (args: any) => ({
    components: { ButtonCard, IonCardTitle, IonCardSubtitle },
    setup: () => ({ args }),
    template: `
        <buttonCard v-bind="args" >
          <template v-slot:header>
            ${args.headerHtml}
          </template>
          {{args.content}}
        </ButtonCard>
        `,
  }),
  args: {
    content: "Some Content",
    headerHtml: `
        <ion-card-title>Title</ion-card-title>
        <ion-card-subtitle>Subtitle</ion-card-subtitle>
        `,
  },
};

export const CustomButtonText: Story = {
  render: (args: any) => ({
    components: { ButtonCard },
    setup: () => ({ args }),
    template: `
        <ButtonCard v-bind="args" >
          {{args.content}}
        </ButtonCard>
      `,
  }),
  args: {
    content: "Some Content",
    buttonText: "CUSTOM",
    headerText: "Header",
  },
};
