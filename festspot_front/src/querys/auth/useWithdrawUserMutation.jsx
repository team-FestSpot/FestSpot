import { useMutation } from "@tanstack/react-query";
import React from "react";
import { reqWithdraw } from "../../api/authApi";

export const useWithdrawUserMutation = () =>
  useMutation({
    mutationFn: async (password) => await reqWithdraw(password),
  });
