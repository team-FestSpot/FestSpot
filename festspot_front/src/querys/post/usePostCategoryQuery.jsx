import { useQuery } from "@tanstack/react-query";
import React from "react";
import { reqPostCategory } from "../../api/postApi";

export const usePostCategoryQuery = (props) =>
  useQuery({
    queryKey: ["postCategory"],
    queryFn: async () => await reqPostCategory(),
  });

export default usePostCategoryQuery;
