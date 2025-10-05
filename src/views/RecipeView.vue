<script setup lang="ts">
import {
  IonPage,
  IonContent,
  IonHeader,
  IonToolbar,
  IonTitle,
} from "@ionic/vue";
import ViewRecipeContainer from "@/components/viewRecipe/viewRecipeContainer/ViewRecipeContainer.vue";
import BasePage from "@/components/common/basePage/BasePage.vue";

//PROPS
interface Props {
  id: string;
}

defineProps<Props>();
</script>

<template>
  <BasePage title="View Recipe">
    <ViewRecipeContainer :id="Number(id)" />
  </BasePage>
</template>
