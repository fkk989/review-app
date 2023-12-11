import { backendApiUrl } from "@/store";
import { User } from "@prisma/client";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import toast from "react-hot-toast";

export const useUserSignUp = (setLoading: any) => {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationKey: ["user-signup"],
    mutationFn: async (body: Partial<User>) => {
      const data = (await axios.post(`${backendApiUrl}/user/signup`, body))
        .data;

      return data;
    },
    onSuccess: () => {
      setLoading(false);
    },
    onError: (error: any) => {
      queryClient.clear();
      setLoading(false);
      toast.error(
        error.response.data.message ? error.response.data.message : "error",
        { id: "user-signup" }
      );
    },
  });
  return { ...mutation, userMutation: mutation };
};

export const useUserLogin = (body: Partial<User>) => {
  const query = useQuery({
    queryKey: ["user-login"],
    queryFn: async () => {
      // toast.loading("loging in", { id: "user-login" });
      const { data } = await axios.post(`${backendApiUrl}/user/login`, body);
      return data;
    },
    enabled: false,
  });

  return { ...query, userLoginQuery: query };
};

export const useGetUser = () => {
  const query = useQuery({
    queryKey: ["get-user"],
    queryFn: async () => {
      const { data } = await axios.get(`${backendApiUrl}/user/get`);
      return data;
    },
  });
  return { ...query, getUserQuery: query };
};
