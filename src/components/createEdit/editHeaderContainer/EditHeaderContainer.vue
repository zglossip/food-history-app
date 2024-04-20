<script setup lang="ts">
import { inject } from "vue";
import {
  INJECTION_KEY,
  useEditHeaderContainerService,
} from "./editHeaderContainerService";
import EditHeaderForm from "@/components/createEdit/editHeaderForm/EditHeaderForm.vue";

interface Props {
  id: number;
}

const props = defineProps<Props>();

const { recipe } = inject(
  INJECTION_KEY,
  useEditHeaderContainerService,
)(props.id);
</script>

<template>
  <EditHeaderForm :recipe="recipe" />
</template>
