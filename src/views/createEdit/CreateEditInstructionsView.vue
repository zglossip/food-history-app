<script setup lang="ts">
import BasePage from "@/components/common/basePage/BasePage.vue";
import EditInstructionsForm from "@/components/createEdit/editInstructionsForm/EditInstructionsForm.vue";
import { usePageRefreshController } from "@/composables/usePageRefresher";

//PROPS
interface Props {
  id?: string;
}

defineProps<Props>();

usePageRefreshController();
</script>

<template>
  <BasePage title="Edit Instructions">
    <EditInstructionsForm :recipe-id="id ? Number(id) : undefined" />
  </BasePage>
</template>
