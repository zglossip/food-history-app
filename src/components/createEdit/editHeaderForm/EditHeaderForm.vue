<script setup lang="ts">
import { Recipe } from "@/types/Recipe";
import { inject } from "vue";
import {
  INJECTION_KEY,
  useEditHeaderFormService,
} from "./editHeaderFormService";
import {
  IonCard,
  IonCardContent,
  IonInput,
  IonList,
  IonItem,
  IonSelect,
  IonSelectOption,
  IonButton,
  IonIcon,
} from "@ionic/vue";
import { add } from "ionicons/icons";
import FilterChips from "@/components/common/filterChips/FilterChips.vue";

interface Props {
  recipe?: Recipe | null;
}

const props = defineProps<Props>();

const {
  newName,
  newServingAmount,
  newServingName,
  newCourseTypes,
  newCuisineTypes,
  newTags,
  currentFilterType,
  filterText,
  filterOptions,
  addChip,
  removeChip,
  onSaveClick,
  onCancelClick,
} = inject(INJECTION_KEY, useEditHeaderFormService)(props.recipe);
</script>

<template>
  <ion-card>
    <ion-card-content>
      <ion-list>
        <ion-item>
          <ion-input label="Name" label-placement="stacked" :value="newName" />
        </ion-item>
        <ion-item>
          <ion-input
            label="Serving Amount"
            label-placement="stacked"
            :value="newServingAmount"
            name="servamt"
            autocomplete="off"
          />
        </ion-item>
        <ion-item>
          <ion-input
            label="Serving Name"
            label-placement="stacked"
            :value="newServingName"
          />
        </ion-item>
        <ion-item>
          <ion-select
            label="Filter Type"
            v-model="currentFilterType"
            fill="solid"
            label-placement="stacked"
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
            label-placement="stacked"
            v-model="filterText"
            label="Filter"
          />
          <ion-button slot="end" @click="addChip">
            <ion-icon :icon="add" />
          </ion-button>
        </ion-item>
        <ion-item>
          <FilterChips
            :course-types="newCourseTypes"
            :cuisine-types="newCuisineTypes"
            :tags="newTags"
            @remove-chip="removeChip"
          />
        </ion-item>
        <ion-item> </ion-item>
      </ion-list>
    </ion-card-content>
    <ion-button fill="clear" @click="onCancelClick">Cancel</ion-button>
    <ion-button fill="clear" @click="onSaveClick">Confirm</ion-button>
  </ion-card>
</template>

<style scoped>
ion-select {
  margin-right: -1rem;
  margin-left: -1rem;
}
</style>
