<template>
  <ion-header>
    <ion-toolbar>
      <ion-title>Filter</ion-title>
    </ion-toolbar>
  </ion-header>
  <ion-content class="ion-padding">
    <ion-grid>
      <ion-row>
        <ion-select
          label="Filter Type"
          placeholder="Select"
          :model-value="currentFilterType"
          @update:modelValue="setCurrentFilterType"
        >
          <ion-select-option
            v-for="filterOption in filterOptions"
            :key="filterOption"
            :value="filterOption"
          >
            {{ filterOption }}
          </ion-select-option>
        </ion-select>
      </ion-row>
      <ion-row>
        <ion-col>
          <ion-input
            :clear-input="true"
            :model-value="filterText"
            @update:modelValue="setFilterText"
          />
        </ion-col>
        <ion-col size="auto">
          <ion-button @click="addFilter" expand="block">
            <ion-icon :icon="add" />
          </ion-button>
        </ion-col>
      </ion-row>
      <ion-row>
        <FilterChips
          :course-types="courseTypeFilters"
          :cuisine-types="cuisineTypeFilters"
          :tags="tagFilters"
          @remove-chip="removeChip"
        />
      </ion-row>
      <ion-button
        @click="apply()"
        expand="full"
        size="large"
        class="apply-button"
      >
        APPLY
      </ion-button>
    </ion-grid>
  </ion-content>
</template>

<script setup lang="ts">
import { inject } from "vue";
import {
  injectionKey,
  useFilterMenuService,
} from "@/components/browse/filterMenu/filterMenuService";
import {
  IonContent,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonSelect,
  IonSelectOption,
  IonInput,
  IonButton,
  IonIcon,
  IonGrid,
  IonRow,
  IonCol,
} from "@ionic/vue";
import { add } from "ionicons/icons";
import FilterChips from "@/components/common/filterChips/FilterChips.vue";

interface Props {
  contentId: string;
}

defineProps<Props>();

const emit = defineEmits(["apply"]);
const apply = () =>
  emit("apply", {
    courseTypeFilters: courseTypeFilters.value,
    cuisineTypeFilters: cuisineTypeFilters.value,
    tagFilters: tagFilters.value,
  });

const {
  filterOptions,
  currentFilterType,
  setCurrentFilterType,
  filterText,
  setFilterText,
  addFilter,
  courseTypeFilters,
  cuisineTypeFilters,
  tagFilters,
  removeChip,
} = inject(injectionKey, useFilterMenuService)();
</script>

<style scoped>
.apply-button {
  margin-top: 1rem;
}
</style>
