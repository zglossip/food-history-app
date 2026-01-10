export const INJECTION_KEY = Symbol();

export interface ButtonCardService {
  onClick: () => void;
}

export const useButtonCardService = (
  clickEmit: () => void,
): ButtonCardService => {
  const onClick = () => clickEmit();

  return { onClick };
};
