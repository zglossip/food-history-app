<template>
  <button-card header-text="Ingredients" @click="$emit('edit')">
    <div v-if="isLoading">
      <ion-spinner />
    </div>
    <div v-else-if="ingredients.length === 0">
      <ion-item>
        <ion-label> None </ion-label>
      </ion-item>
    </div>
    <div v-else>
      <ion-list>
        <ingredient-item
          v-for="ingredient in ingredients"
          :key="ingredient.name"
          :ingredient="ingredient"
        />
      </ion-list>
    </div>
  </button-card>
</template>

<script setup lang="ts">
import {
  useIngredientCardService,
  injectionKey,
} from "@/components/common/ingredientCard/ingredientCardService";
import { inject, Fragment } from "vue";
import { IonList, IonSpinner, IonItem, IonLabel } from "@ionic/vue";
import IngredientItem from "@/components/common/ingredientCard/IngredientItem.vue";
import ButtonCard from "@/components/common/buttonCard/ButtonCard.vue";

interface Props {
  ingredientUrl: string;
}

const props = defineProps<Props>();

const { isLoading, ingredients } = inject(
  injectionKey,
  useIngredientCardService
)(props.ingredientUrl);

defineEmits(["edit"]);
</script>
