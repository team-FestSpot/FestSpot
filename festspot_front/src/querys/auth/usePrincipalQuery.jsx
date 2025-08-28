import React from "react";
import { useQuery } from "@tanstack/react-query";
import { reqPrincipal } from "../../api/authApi";

function usePrincipalQuery(props) {
  return useQuery({
    queryKey: ["principal"],
    queryFn: async () => await reqPrincipal(),
    staleTime: 1000 * 60 * 30,
  });
}

export default usePrincipalQuery;
