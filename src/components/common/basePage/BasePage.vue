<script lang="ts" setup>
import {
  IonHeader,
  IonButtons,
  IonButton,
  IonIcon,
  IonToolbar,
  IonTitle,
  IonContent,
  IonRefresher,
  IonRefresherContent,
  IonPage,
  IonMenuButton,
} from "@ionic/vue";
import { home } from "ionicons/icons";
import { inject } from "vue";
import {
  PAGE_REFRESH_KEY,
  PageRefreshController,
} from "@/composables/usePageRefresher";

//PROPS

interface Props {
  title: string;
}

defineProps<Props>();

const pageRefresh = inject<PageRefreshController | null>(
  PAGE_REFRESH_KEY,
  null,
);

const handleRefresh = async (event: CustomEvent) => {
  if (!pageRefresh) {
    event.detail.complete();
    return;
  }

  await pageRefresh.onRefresh(event);
};
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
      <ion-refresher slot="fixed" @ionRefresh="handleRefresh">
        <ion-refresher-content />
      </ion-refresher>
      <slot />
    </ion-content>
  </ion-page>
</template>
