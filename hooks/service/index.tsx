import { backendApiUrl } from "@/store";
import { Service } from "@prisma/client";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import toast from "react-hot-toast";

export const useAddOrUpdateService = (setLoading: any, url: string) => {
  const mutation = useMutation({
    mutationKey: ["add-service"],
    mutationFn: async (body: Partial<Service>) => {
      const data = (await axios.post(`${backendApiUrl}/${url}`, body)).data;
      return data;
    },
    onSuccess: () => {
      toast.success("success", { id: "add-service" });
      setLoading(false);
    },
    onError: (error: any) => {
      setLoading(false);
      toast.error(
        error.response.data.message ? error.response.data.message : "error",
        { id: "add-service" }
      );
    },
  });
  return { serviceMutation: mutation };
};

export const useGetServices = (social: string) => {
  const query = useQuery({
    queryKey: ["get-service"],
    queryFn: async () => {
      const data = (
        await axios.post(`${backendApiUrl}/service/get`, { social })
      ).data;

      return data as {
        services: Service[];
        message: string;
      };
    },
  });

  return { serviceQuery: query };
};

export const useGetServiceById = (id: string) => {
  const query = useQuery({
    queryKey: ["get-service-by-id"],
    queryFn: async () => {
      const data = (
        await axios.post(`${backendApiUrl}/service/getbyid`, { id })
      ).data;

      return data as {
        service: Service;
        message: string;
      };
    },
  });

  return { serviceByIdQuery: query };
};
