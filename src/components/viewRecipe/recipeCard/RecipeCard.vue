<template>
  <ion-card>
    <ion-card-header>
      <ion-grid class="recipe-card-header">
        <ion-row>
          <ion-col>
            <ion-card-title>
              <span>{{ recipe.name }}</span>
            </ion-card-title>
            <ion-card-subtitle>{{ formattedServingTag }}</ion-card-subtitle>
          </ion-col>
          <ion-col>
            <ion-button @click="$emit('edit')" class="edit-button">
              EDIT
            </ion-button>
          </ion-col>
        </ion-row>
      </ion-grid>
    </ion-card-header>
    <ion-card-content>
      <div
        v-for="(tag, i) in [
          formattedCuisineTag,
          formattedCourseTag,
          formattedTagTag,
        ]"
        :key="i"
      >
        <span v-if="tag">{{ tag }}</span>
      </div>
    </ion-card-content>
  </ion-card>
</template>

<script setup lang="ts">
import { inject, toRefs } from "vue";
import {
  useRecipeCardService,
  injectionKey,
} from "@/components/viewRecipe/recipeCard/recipeCardService";
import {
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardSubtitle,
  IonCardContent,
  IonButton,
  IonGrid,
  IonRow,
  IonCol,
} from "@ionic/vue";
import { Props } from "./Props";

const props = defineProps<Props>();
const { recipe } = toRefs(props);

const {
  formattedServingTag,
  formattedCuisineTag,
  formattedCourseTag,
  formattedTagTag,
} = inject(injectionKey, useRecipeCardService)(recipe);
</script>

<style scoped>
.recipe-card-header {
  margin-inline: 0 !important;
}

.edit-button {
  float: right;
}
</style>
