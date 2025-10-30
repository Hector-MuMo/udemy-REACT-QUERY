import { QueryCache, QueryClient } from "@tanstack/react-query";

import { toast } from "@/components/app/toast";

function errorHandler(errorMsg: string) {
  // https://chakra-ui.com/docs/components/toast#preventing-duplicate-toast
  // one message per page load, not one message per query
  // the user doesn't care that there were three failed queries on the staff page
  //    (staff, treatments, user)
  const id = "react-query-toast";

  if (!toast.isActive(id)) {
    const action = "fetch";
    const title = `Could not ${action} data: ${
      errorMsg ?? "error connecting to server"
    }`;
    toast({ id, title, status: "error", variant: "subtle", isClosable: true });
  }
}

export const queryCliient = new QueryClient({
  defaultOptions: {
    // default global options for all queries
    queries: {
      staleTime: 10 * 60 * 1000, // 10 minutes for data to be fresh
      gcTime: 15 * 60 * 1000, // 15 minutes before unused data is garbage collected
      refetchOnWindowFocus: false,
    },
  },
  queryCache: new QueryCache({
    onError: (error) => {
      errorHandler(error.message); // global error handler for all queries
    }
  })
});