<template>
  <ion-list>
    <ion-item>
      <ion-input
        label="Name"
        clear-input
        :model-value="nameFilter"
        @update:model-value="setNameFilter"
        fill="solid"
        label-placement="stacked"
      />
    </ion-item>
    <ion-item>
      <ion-select
        label="Filter Type"
        placeholder="Select"
        :model-value="currentFilterType"
        @update:modelValue="setCurrentFilterType"
        fill="solid"
      >
        <ion-select-option
          v-for="filterOption in filterOptions"
          :key="filterOption"
          :value="filterOption"
        >
          {{ filterOption }}
        </ion-select-option>
      </ion-select>
    </ion-item>
    <ion-item>
      <ion-input
        :clear-input="true"
        :model-value="filterText"
        @update:modelValue="setFilterText"
        fill="solid"
      />
      <ion-button slot="end" @click="addFilter">
        <ion-icon :icon="add" />
      </ion-button>
    </ion-item>
    <ion-item>
      <FilterChips
        :course-types="courseTypeFilters"
        :cuisine-types="cuisineTypeFilters"
        :tags="tagFilters"
        @remove-chip="removeChip"
      />
    </ion-item>
  </ion-list>
  <ion-button @click="apply()" expand="full" size="large" class="apply-button">
    APPLY
  </ion-button>
</template>

<script setup lang="ts">
import { inject } from "vue";
import {
  injectionKey,
  useFilterMenuService,
} from "@/components/browse/filterMenu/filterMenuService";
import {
  IonList,
  IonItem,
  IonSelect,
  IonSelectOption,
  IonInput,
  IonButton,
  IonIcon,
} from "@ionic/vue";
import { add } from "ionicons/icons";
import FilterChips from "@/components/common/filterChips/FilterChips.vue";

interface Props {
  startingName: string;
  startingCourseTypes: string[];
  startingCuisineTypes: string[];
  startingTags: string[];
}

const props = defineProps<Props>();

const emit = defineEmits(["apply"]);
const apply = () =>
  emit("apply", {
    courseTypeFilters: courseTypeFilters.value,
    cuisineTypeFilters: cuisineTypeFilters.value,
    tagFilters: tagFilters.value,
    nameFilter: nameFilter.value,
  });

const {
  filterOptions,
  currentFilterType,
  setCurrentFilterType,
  filterText,
  setFilterText,
  setNameFilter,
  addFilter,
  nameFilter,
  courseTypeFilters,
  cuisineTypeFilters,
  tagFilters,
  removeChip,
} = inject(injectionKey, useFilterMenuService)(
  props.startingName,
  props.startingCourseTypes,
  props.startingCuisineTypes,
  props.startingTags
);
</script>
