import { Admin } from "@prisma/client";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { backendApiUrl } from "@/store";
import toast from "react-hot-toast";

// TODO:
// have to create the default admin api

export const useAddAdmin = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationKey: ["add-admin"],
    mutationFn: async (body: Partial<Admin>) => {
      toast.loading("creating admin", { id: "add-admin" });
      const { data } = await axios.post(`${backendApiUrl}/admin/singup`, body);

      return data;
    },
    onSuccess: () => {
      toast.success("success", { id: "add-admin" });
    },
    onError: (error: any) => {
      queryClient.clear();
      toast.error(
        error.response.data.message ? error.response.data.message : "error",
        { id: "add-admin" }
      );
    },
  });
  return { ...mutation, adminMutation: mutation };
};

export const useAdminLogin = (body: Partial<Admin>) => {
  const query = useQuery({
    queryKey: ["admin-login"],
    queryFn: async () => {
      // toast.loading("loging in", { id: "admin-login" });
      const { data } = await axios.post(`${backendApiUrl}/admin/login`, body);
      return data;
    },
    enabled: false,
  });

  return { ...query, adminLoginQuery: query };
};

export const useGetAdmin = () => {
  const query = useQuery({
    queryKey: ["get-admin"],
    queryFn: async () => {
      const { data } = await axios.get(`${backendApiUrl}/admin/get`);
      return data;
    },
  });
  return { ...query, getAdminQuery: query };
};
