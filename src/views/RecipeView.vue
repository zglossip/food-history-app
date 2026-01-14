<script setup lang="ts">
import { ref } from "vue";
import { onIonViewDidEnter } from "@ionic/vue";
import ViewRecipeContainer from "@/components/viewRecipe/viewRecipeContainer/ViewRecipeContainer.vue";
import BasePage from "@/components/common/basePage/BasePage.vue";
import { usePageRefreshController } from "@/composables/usePageRefresher";

//PROPS
interface Props {
  id: string;
}

defineProps<Props>();

const viewRecipeContainerRef = ref<InstanceType<
  typeof ViewRecipeContainer
> | null>(null);

onIonViewDidEnter(() => {
  viewRecipeContainerRef.value?.refreshData();
});

usePageRefreshController();
</script>

<template>
  <BasePage title="View Recipe">
    <ViewRecipeContainer :id="Number(id)" ref="viewRecipeContainerRef" />
  </BasePage>
</template>
