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
  useEditIngredientService,
} from "./editIngredientsService";
import { formatMeasurementText } from "@/services/util";

//PROPS

interface Props {
  recipeId: number;
}

const props = defineProps<Props>();

//SERVICE

const { ingredients, onItemReorder, onSaveClick, onCancelClick } = inject(
  INJECTION_KEY,
  useEditIngredientService,
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
          <ion-item v-for="ingredient in ingredients" :key="ingredient.name">
            <ion-label>
              {{ ingredient.name }}
              <p v-if="ingredient.notes">{{ ingredient.notes }}</p>
            </ion-label>
            <ion-label>
              <p :class="$style.ingredientMeasurement">
                {{ formatMeasurementText(ingredient) }}
              </p>
            </ion-label>
            <ion-reorder slot="end"></ion-reorder>
          </ion-item>
        </ion-reorder-group>
      </ion-list>
    </ion-card-content>
    <ion-button fill="clear" @click="onCancelClick">Cancel</ion-button>
    <ion-button fill="clear" @click="onSaveClick">Confirm</ion-button>
  </ion-card>
</template>

<style module>
.ingredientMeasurement {
  float: right;
}
</style>
