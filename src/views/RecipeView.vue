<script setup lang="ts">
import ViewRecipeContainer from "@/components/viewRecipe/viewRecipeContainer/ViewRecipeContainer.vue";
import BasePage from "@/components/common/basePage/BasePage.vue";
import { onIonViewDidEnter } from "@ionic/vue";
import { ref } from "vue";

//PROPS
interface Props {
  id: string;
}

const container = ref();

defineProps<Props>();

onIonViewDidEnter(() => container.value?.refreshData());
</script>

<template>
  <BasePage title="View Recipe">
    <ViewRecipeContainer :id="Number(id)" ref="container" />
  </BasePage>
</template>
