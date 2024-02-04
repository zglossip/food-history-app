<script setup lang="ts">
import { inject, toRefs } from "vue";
import { useRecipeService, injectionKey } from "@/services/recipeService";
import { IonCardTitle, IonCardSubtitle } from "@ionic/vue";
import ButtonCard from "@/components/common/buttonCard/ButtonCard.vue";
import { Props } from "./Props";

//PROPS

const props = defineProps<Props>();
const { recipe } = toRefs(props);

//EMITS

const emit = defineEmits(["edit"]);
const editEmit = () => emit("edit");

//SERVICE

const {
  formattedServingTag,
  formattedCuisineTag,
  formattedCourseTag,
  formattedTagTag,
  onClick,
} = inject(injectionKey, useRecipeService)(recipe, undefined, editEmit);
</script>

<template>
  <button-card @click="onClick">
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
