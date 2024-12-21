import { useRef } from "react";

const useElement = (): [
  React.MutableRefObject<number | null>,
  React.MutableRefObject<number | null>
] => {
  const firstElement = useRef<number | null>(null);
  const lastElement = useRef<number | null>(null);

  return [firstElement, lastElement];
};

export default useElement;
