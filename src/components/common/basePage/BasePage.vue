<script lang="ts" setup>
import {
  IonHeader,
  IonButtons,
  IonButton,
  IonIcon,
  IonToolbar,
  IonTitle,
  IonContent,
  IonPage,
  IonMenuButton,
} from "@ionic/vue";
import { home } from "ionicons/icons";

//PROPS

interface Props {
  title: string;
}

defineProps<Props>();
</script>

<template>
  <ion-page content-id="main-content">
    <ion-header :translucent="true">
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-button router-link="/">
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
