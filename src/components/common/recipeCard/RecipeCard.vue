<template>
  <ion-card>
    <ion-card-header>
      <ion-card-title>
        <span>{{ recipe.name }}</span>
        <!-- <ion-icon name="create" class="ion-float-left"/> -->
      </ion-card-title>
      <ion-card-subtitle>{{ formattedServingTag }}</ion-card-subtitle>
    </ion-card-header>
    <ion-card-content>
      <div v-if="displayEditButton" />
      <ul>
        <fragment
          v-for="(tag, i) in [
            formattedCuisineTag,
            formattedCourseTag,
            formattedTagTag,
          ]"
          :key="i"
        >
          <li v-if="tag">{{ tag }}</li>
        </fragment>
      </ul>
    </ion-card-content>
  </ion-card>
</template>

<script setup lang="ts">
import { Recipe } from "@/models/Recipe";
import { ref, toRefs } from "vue";
import { useRecipeCardService } from "@/components/common/recipeCard/recipeCardService";
import { IonCard, IonCardHeader, IonCardTitle, IonCardSubtitle, IonCardContent } from "@ionic/vue";

interface Props {
  recipe: Recipe;
  displayEditButton?: boolean;
}

const props = defineProps<Props>();
const { recipe, displayEditButton = ref(false) } = toRefs(props);

const {
  formattedServingTag,
  formattedCuisineTag,
  formattedCourseTag,
  formattedTagTag,
} = useRecipeCardService(recipe);
</script>
