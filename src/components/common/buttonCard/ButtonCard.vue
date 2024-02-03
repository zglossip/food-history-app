<script setup lang="ts">
import {
  IonCard,
  IonCardHeader,
  IonGrid,
  IonRow,
  IonCol,
  IonButton,
  IonCardContent,
  IonCardTitle,
} from "@ionic/vue";
import {
  useButtonCardService,
  INJECTION_KEY,
} from "@/components/common/buttonCard/buttonCardService";
import { inject } from "vue";

//PROPS

interface Props {
  buttonText?: string;
  headerText?: string;
}

withDefaults(defineProps<Props>(), {
  buttonText: "EDIT",
  headerText: "",
});

//EMITS

const emit = defineEmits(["click"]);

const clickEmit = () => emit("click");

//SERVICE

const { onClick } = inject(INJECTION_KEY, useButtonCardService)(clickEmit);
</script>

<template>
  <ion-card>
    <ion-card-header>
      <ion-grid :class="$style.buttonCardHeader">
        <ion-row>
          <ion-col>
            <ion-card-title v-if="headerText">
              <span>{{ headerText }}</span>
            </ion-card-title>
            <slot name="header" />
          </ion-col>
          <ion-col>
            <ion-button :class="$style.buttonCardButton" @click="onClick">
              {{ buttonText }}
            </ion-button>
          </ion-col>
        </ion-row>
      </ion-grid>
    </ion-card-header>
    <ion-card-content>
      <slot />
    </ion-card-content>
  </ion-card>
</template>

<style module>
.buttonCardHeader {
  margin-inline: 0 !important;
}

.buttonCardButton {
  float: right;
}
</style>
