import { useMemo, useState } from "react";

export default function useClientSidePagination<A>(
  data?: Array<A>,
  pageSize = 16
): [Array<A>, () => void, boolean] {
  const [size, setSize] = useState(pageSize);
  const [computedData, isMore] = useMemo(() => {
    if (!data) {
      return [[], false];
    }
    return [data.slice(0, size), size < data.length];
  }, [data, size]);
  const loadMore = () => setSize(size + pageSize);

  return [computedData, loadMore, isMore];
}
