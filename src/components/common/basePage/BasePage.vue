<script lang="ts" setup>
import {
  IonHeader,
  IonButtons,
  IonButton,
  IonIcon,
  IonMenu,
  IonToolbar,
  IonTitle,
  IonContent,
  IonPage,
  IonMenuButton,
} from "@ionic/vue";
import { home } from "ionicons/icons";
import { useSlots } from "vue";
import { useRouter } from "vue-router";

//PROPS

interface Props {
  title: string;
  menuTitle?: string;
}

const { title, menuTitle = "Menu" } = defineProps<Props>();

const slots = useSlots();
const router = useRouter();

const goHome = (): void => {
  router.push("/");
};
</script>

<template>
  <ion-menu v-if="!!slots.menu" content-id="main-content" side="end">
    <ion-header>
      <ion-toolbar>
        <ion-title>
          {{ menuTitle }}
        </ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content>
      <slot name="menu" />
    </ion-content>
  </ion-menu>
  <ion-page content-id="main-content">
    <ion-header :translucent="true">
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-button @click="goHome">
            <ion-icon slot="icon-only" :icon="home" />
          </ion-button>
        </ion-buttons>
        <ion-title>
          {{ title }}
        </ion-title>
        <ion-buttons slot="end">
          <ion-menu-button />
        </ion-buttons>
      </ion-toolbar>
    </ion-header>
    <ion-content>
      <slot />
    </ion-content>
  </ion-page>
</template>
