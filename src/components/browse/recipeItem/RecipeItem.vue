<template>
  <ion-item @click="navigate" class="recipe-item">
    <ion-grid>
      <ion-row>
        <ion-col>
          <ion-label>
            <span class="recipe-item-title">
              {{ recipe.name }}
            </span>
            <p>
              {{ formattedServingTag }}
            </p>

            <p
              v-for="(tag, i) in [
                formattedCuisineTag,
                formattedCourseTag,
                formattedTagTag,
              ]"
              :key="i"
            >
              {{ tag ? tag : "" }}
            </p>
          </ion-label>
        </ion-col>
        <ion-col size="auto" class="recipe-item-arrow">
          <ion-icon :icon="arrowForward" size="large" />
        </ion-col>
      </ion-row>
    </ion-grid>
  </ion-item>
</template>

<script setup lang="ts">
import { injectionKey, useRecipeService } from "@/services/recipeService";
import { Recipe } from "@/types/Recipe";
import { inject, toRefs } from "vue";
import {
  IonGrid,
  IonRow,
  IonCol,
  IonIcon,
  IonLabel,
  IonItem,
} from "@ionic/vue";
import { arrowForward } from "ionicons/icons";

interface Props {
  recipe: Recipe;
}

const props = defineProps<Props>();
const { recipe } = toRefs(props);

const {
  formattedServingTag,
  formattedCuisineTag,
  formattedCourseTag,
  formattedTagTag,
  navigate,
} = inject(injectionKey, useRecipeService)(recipe);
</script>

<style scoped>
.recipe-item {
  cursor: pointer;
}

.recipe-item-title {
  font-size: 1.5rem;
}

.recipe-item-arrow {
  display: flex;
  align-items: center;
  float: right;
}
</style>
