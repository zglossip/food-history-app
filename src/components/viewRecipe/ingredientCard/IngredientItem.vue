<script setup lang="ts">
import { IonItem, IonGrid, IonRow, IonCol, IonLabel } from "@ionic/vue";
import { Ingredient } from "@/types/Ingredient";
import { formatMeasurementText } from "./ingredientItemService";

interface Props {
  ingredient: Ingredient;
}

defineProps<Props>();
</script>

<template>
  <ion-item>
    <ion-grid>
      <ion-row>
        <ion-col>
          <ion-label>
            {{ ingredient.name }}
            <p v-if="ingredient.notes">{{ ingredient.notes }}</p>
          </ion-label>
        </ion-col>
        <ion-col>
          <ion-label>
            <p :class="$style.ingredientMeasurement">
              {{ formatMeasurementText(ingredient) }}
            </p>
          </ion-label>
        </ion-col>
      </ion-row>
    </ion-grid>
  </ion-item>
</template>

<style module>
.ingredientMeasurement {
  float: right;
}
</style>
