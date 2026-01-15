import { inject, onBeforeUnmount, provide } from "vue";

export type PageRefreshHandler = () => Promise<void> | void;

export type PageRefreshController = {
  register: (handler: PageRefreshHandler) => () => void;
  onRefresh: (event: CustomEvent) => Promise<void>;
};

export const PAGE_REFRESH_KEY = Symbol("page-refresh");

export const usePageRefreshController = (): PageRefreshController => {
  const handlers = new Set<PageRefreshHandler>();
  const register = (handler: PageRefreshHandler) => {
    handlers.add(handler);
    return () => handlers.delete(handler);
  };

  const onRefresh = async (event: CustomEvent) => {
    try {
      await Promise.all(Array.from(handlers).map((handler) => handler()));
    } finally {
      event.detail.complete();
    }
  };

  const controller: PageRefreshController = { register, onRefresh };
  provide(PAGE_REFRESH_KEY, controller);
  return controller;
};

export const usePageRefresher = (
  handler: PageRefreshHandler,
  controller?: PageRefreshController,
): void => {
  const resolvedController =
    controller ?? inject<PageRefreshController | null>(PAGE_REFRESH_KEY, null);

  if (!resolvedController) {
    return;
  }

  const unregister = resolvedController.register(handler);
  onBeforeUnmount(() => unregister());
};
