<script lang="ts" setup>
import {
  IonCard,
  IonCardContent,
  IonButton,
  IonList,
  IonReorderGroup,
  IonItem,
  IonLabel,
  IonReorder,
} from "@ionic/vue";
import { inject } from "vue";
import {
  INJECTION_KEY,
  useEditInstructionService,
} from "./editInstructionsService";

//PROPS

interface Props {
  recipeId: number;
}

const props = defineProps<Props>();

//SERVICE

const { instructions, onItemReorder } = inject(
  INJECTION_KEY,
  useEditInstructionService,
)(props.recipeId);
</script>

<template>
  <ion-card>
    <ion-card-content>
      <ion-list>
        <ion-reorder-group
          :disabled="false"
          @ion-item-reorder="onItemReorder($event)"
        >
          <ion-item v-for="instruction in instructions" :key="instruction">
            <ion-label>
              {{ instruction }}
            </ion-label>
            <ion-reorder slot="end"></ion-reorder>
          </ion-item>
        </ion-reorder-group>
      </ion-list>
    </ion-card-content>
    <ion-button fill="clear">Cancel</ion-button>
    <ion-button fill="clear">Confirm</ion-button>
  </ion-card>
</template>
