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
            <p class="ingredient-measurement">
              {{ formatMeasurementText(ingredient) }}
            </p>
          </ion-label>
        </ion-col>
      </ion-row>
    </ion-grid>
  </ion-item>
</template>

<script setup lang="ts">
import { IonItem, IonGrid, IonRow, IonCol, IonLabel } from "@ionic/vue";
import { Ingredient } from "@/types/Ingredient";
import { formatMeasurementText } from "@/components/common/ingredientCard/ingredientItemService";

interface Props {
  ingredient: Ingredient;
}

defineProps<Props>();
</script>

<style scoped>
.ingredient-measurement {
  float: right;
}
</style>
