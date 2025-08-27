import { useQuery } from "@tanstack/react-query";
import { reqUserListApi } from "../../api/adminApi";

export const useUserListQuery = () =>
  useQuery({
    queryKey: ["userList"],
    queryFn: async () => await reqUserListApi(),
  });
