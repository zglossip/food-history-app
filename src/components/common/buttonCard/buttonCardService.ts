export const INJECTION_KEY = Symbol();

interface ButtonCardService {
  onClick: () => void;
}

export const useButtonCardService = (
  clickEmit: () => void,
): ButtonCardService => {
  const onClick = () => clickEmit();

  return { onClick };
};
