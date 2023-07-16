<template>
  <button-card @click="$emit('edit')">
    <template #header>
      <ion-card-title>
              <span>{{ recipe.name }}</span>
            </ion-card-title>
            <ion-card-subtitle>{{ formattedServingTag }}</ion-card-subtitle>
    </template>
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
  </button-card>
</template>

<script setup lang="ts">
import { inject, toRefs } from "vue";
import {
  useRecipeCardService,
  injectionKey,
} from "@/components/viewRecipe/recipeCard/recipeCardService";
import {
  IonCardTitle,
  IonCardSubtitle,
} from "@ionic/vue";
import ButtonCard from '@/components/common/buttonCard/ButtonCard.vue'
import { Props } from "./Props";

const props = defineProps<Props>();
const { recipe } = toRefs(props);

const {
  formattedServingTag,
  formattedCuisineTag,
  formattedCourseTag,
  formattedTagTag,
} = inject(injectionKey, useRecipeCardService)(recipe);

defineEmits(['edit'])
</script>

<style scoped>
.recipe-card-header {
  margin-inline: 0 !important;
}

.edit-button {
  float: right;
}
</style>
