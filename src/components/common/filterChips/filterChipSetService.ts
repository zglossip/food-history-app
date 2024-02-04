export const INJECTION_KEY = Symbol();

export interface FilterChipSetService {
  onClose: (element: string) => void;
}

export const useFilterChipSetService = (
  closeEmit: (element: string) => void,
): FilterChipSetService => {
  const onClose = (element: string) => closeEmit(element);

  return { onClose };
};
