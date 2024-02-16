<script setup lang="ts">
import { inject } from "vue";
import {
  INJECTION_KEY,
  useViewRecipeContainerService,
} from "./viewRecipeContainerService";
import RecipeCard from "@/components/viewRecipe/recipeCard/RecipeCard.vue";
import IngredientCard from "../ingredientCard/IngredientCard.vue";
import InstructionCard from "../instructionCard/InstructionCard.vue";

// PROPS
interface Props {
  id: number;
}
const props = defineProps<Props>();

// SERVICE

const { recipe } = inject(
  INJECTION_KEY,
  useViewRecipeContainerService,
)(props.id);
</script>

<template>
  <RecipeCard :recipe="recipe" />
  <IngredientCard :id="id" />
  <InstructionCard :id="id" />
</template>
