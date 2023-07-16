<template>
  <ion-card>
    <ion-card-header> Ingredients </ion-card-header>
    <ion-card-content v-if="isLoading">
      <ion-spinner />
    </ion-card-content>
    <ion-card-content v-else-if="ingredients.length === 0">
      <ion-item>
        <ion-label> None </ion-label>
      </ion-item>
    </ion-card-content>
    <ion-card-content v-else>
      <ion-list>
        <ingredient-item
          v-for="ingredient in ingredients"
          :key="ingredient.name"
          :ingredient="ingredient"
        />
      </ion-list>
    </ion-card-content>
  </ion-card>
</template>

<script setup lang="ts">
import {
  useIngredientCardService,
  injectionKey,
} from "@/components/common/ingredientCard/ingredientCardService";
import { inject } from "vue";
import {
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonList,
  IonSpinner,
  IonItem,
  IonLabel,
} from "@ionic/vue";
import IngredientItem from "@/components/common/ingredientCard/IngredientItem.vue";

interface Props {
  ingredientUrl: string;
}

const props = defineProps<Props>();

const { isLoading, ingredients } = inject(
  injectionKey,
  useIngredientCardService
)(props.ingredientUrl);
</script>
