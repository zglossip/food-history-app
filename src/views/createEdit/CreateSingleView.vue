<script setup lang="ts">
import BasePage from "@/components/common/basePage/BasePage.vue";
import CreateSingleContainer from "@/components/createEdit/createSingleContainer/CreateSingleContainer.vue";
import { usePageRefreshController } from "@/composables/usePageRefresher";

usePageRefreshController();
</script>

<template>
  <BasePage title="Add Recipe">
    <CreateSingleContainer />
  </BasePage>
</template>
