import { Meta, StoryObj } from "@storybook/vue3";
import ButtonCard from "./ButtonCard.vue";
import { IonCardSubtitle, IonCardTitle } from "@ionic/vue";
import { provide } from "vue";
import { INJECTION_KEY } from "./buttonCardService";
import { action } from "@storybook/addon-actions";

//STUB

export const stubButtonCardService = () => {
  provide(INJECTION_KEY, () => ({
    onClick: action("clicked"),
  }));
};

//META

const meta: Meta<typeof ButtonCard> = {
  title: "Common/Button Card",
  component: ButtonCard,
  excludeStories: /stubButtonCardService/,
  render: (args: any) => ({
    components: { ButtonCard },
    setup: () => {
      stubButtonCardService();
      return { ...args };
    },
    template: `
      <ButtonCard :button-text="buttonText" :header-text="headerText" >
        {{content}}
      </ButtonCard>
    `,
  }),
};

export default meta;

//STORIES

type Story = StoryObj<typeof ButtonCard>;

export const HeaderProp: Story = {
  args: {
    headerText: "Header",
    content: "Some Content",
  },
};

export const HeaderSlot: Story = {
  render: (args: any) => ({
    components: { ButtonCard, IonCardTitle, IonCardSubtitle },
    setup: () => ({ ...args }),
    template: `
        <buttonCard :button-text="buttonText" :header-text="headerText">
          <template v-slot:header>
            ${args.headerHtml}
          </template>
          {{content}}
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
  args: {
    content: "Some Content",
    buttonText: "CUSTOM",
    headerText: "Header",
  },
};
