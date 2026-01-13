import type { Meta, StoryObj } from "@storybook/vue3";
import BaseFabModal from "./BaseFabModal.vue";
import { IonButton, IonIcon, IonItem, IonLabel } from "@ionic/vue";
import { filterCircleOutline } from "ionicons/icons";

//META

const meta: Meta<typeof BaseFabModal> = {
  title: "Common/Base Fab Modal",
  component: BaseFabModal,
  render: (args: any) => ({
    components: {
      BaseFabModal,
      IonButton,
      IonIcon,
      IonItem,
      IonLabel,
    },
    setup: () => ({
      ...args,
      filterCircleOutline,
    }),
    template: `
      <BaseFabModal :content-class="contentClass">
        <template #fab>
          <IonIcon :icon="filterCircleOutline" />
        </template>
        <template #default="{ close }">
          <IonItem>
            <IonLabel>{{ contentText }}</IonLabel>
          </IonItem>
          <IonButton expand="block" @click="close">Close</IonButton>
        </template>
      </BaseFabModal>
    `,
  }),
  args: {
    contentClass: "ion-padding",
    contentText: "Example modal content",
  },
};

export default meta;

//STORIES

type Story = StoryObj<typeof BaseFabModal>;

export const Default: Story = {};
