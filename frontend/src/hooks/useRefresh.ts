import { useCallback, useState } from "react";

const useRefresh: () => [number, () => void] = () => {
  const [state, setState] = useState(0);

  const refresh = useCallback(() => setState((prev) => prev + 1), [setState]);

  return [state, refresh];
};

export default useRefresh;
