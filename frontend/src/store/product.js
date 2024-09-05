import { useMutation, useQueryClient, useQuery } from "@tanstack/react-query";
import axios from "axios";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

export const useCreateProduct = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (newProduct) =>
      axios.post(`${BACKEND_URL}/products`, newProduct),
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
    onError: (error) => {
      // Handle error
      console.error("Error creating product:", error);
    },
    onMutate: () => {
      // Handle pending state
      console.log("Creating product...");
    },
  });
};

export const useGetProducts = () => {
  return useQuery({
    queryKey: ["products"],
    queryFn: () => axios.get(`${BACKEND_URL}/products`).then((res) => res.data),
    onError: (error) => {
      console.error("Error fetching products:", error);
    },
  });
};

export const useDeleteProduct = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (productId) =>
      axios.delete(`${BACKEND_URL}/products/${productId}`),
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
    onError: (error) => {
      // Handle error
      console.error("Error deleting product:", error);
    },
    onMutate: () => {
      // Handle pending state
      console.log("Deleting product...");
    },
  });
};

export const useUpdateProduct = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, updatedProduct }) =>
      axios.put(`${BACKEND_URL}/products/${id}`, updatedProduct),
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
    onError: (error) => {
      // Handle error
      console.error("Error updating product:", error);
    },
    onMutate: () => {
      // Handle pending state
      console.log("Updating product...");
    },
  });
};
