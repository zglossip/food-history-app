<script setup lang="ts">
import { IonCard, IonCardContent } from "@ionic/vue";
import FilterChipSet from "@/components/common/filterChips/FilterChipSet.vue";
import { FilterChipData } from "@/types/FilterChipData";
import { FilterType } from "@/types/FilterType";
import { inject } from "vue";
import { INJECTION_KEY, useFilterChipService } from "./filterChipService";

//PROPS

interface Props {
  courseTypes: Array<string>;
  cuisineTypes: Array<string>;
  tags: Array<string>;
}

defineProps<Props>();

//EMITS

const emit = defineEmits(["remove-chip"]);
const removeChipEmit = (data: FilterChipData) => emit("remove-chip", data);

//SERVICE
const { onClose } = inject(INJECTION_KEY, useFilterChipService)(removeChipEmit);
</script>

<template>
  <ion-card :class="$style.filterChips">
    <ion-card-content>
      <filter-chip-set
        :elements="courseTypes"
        icon-url="/img/reshot-icon-fork-V968G523SF.svg"
        icon-alt-text="Course"
        @close="(course) => onClose(FilterType.COURSE, course)"
      />
      <filter-chip-set
        :elements="cuisineTypes"
        icon-url="/img/reshot-icon-globe-JHXCB4TD7Q.svg"
        icon-alt-text="Cuisine"
        @close="(cuisine) => onClose(FilterType.CUISINE, cuisine)"
      />
      <filter-chip-set
        :elements="tags"
        icon-url="/img/reshot-icon-tag-YU436XW8QJ.svg"
        icon-alt-text="Tag"
        @close="(tag) => onClose(FilterType.TAG, tag)"
      />
    </ion-card-content>
  </ion-card>
</template>

<style module>
.filterChips {
  width: 100%;
  margin: 0;
}
</style>
