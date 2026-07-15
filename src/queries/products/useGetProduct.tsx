import { useQuery } from "@tanstack/react-query";
import axiosInstance from "../../config/axios";

type ProductQueryOptions = {
  limit?: number;
  page?: number;
};

const useGetProduct = ({ limit = 10, page = 1 }: ProductQueryOptions = {}) => {
  return useQuery({
    queryKey: ["products", { limit, page }],
    queryFn: async () => {
      const response = await axiosInstance.get("/products/get-products", {
        params: { limit, page },
      });
      return response.data;
    },
  });
};

export { useGetProduct };
