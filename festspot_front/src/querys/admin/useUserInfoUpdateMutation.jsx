import { useMutation } from "@tanstack/react-query";
import { reqUserInfoUpdateApi } from "../../api/adminApi";

export const useUserInfoUpdateMutation = () =>
  useMutation({
    mutationKey: ["userInfoUpdate"],
    mutationFn: async (data) => {
      return await reqUserInfoUpdateApi(data);
    },
  });
