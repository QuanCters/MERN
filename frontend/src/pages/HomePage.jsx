import { Box, Heading, Center, Icon, Text } from "@chakra-ui/react";
import { RiRocketLine } from "react-icons/ri";
import { FaSadTear } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useColorMode } from "@chakra-ui/react";
import { useGetProducts, useDeleteProduct } from "../store/product";
import ProductCard from "../components/ProductCard";
import EditModal from "./EditModal";
import { useState } from "react";

const HomePage = () => {
  const navigate = useNavigate();
  const { colorMode } = useColorMode();
  const { data, isLoading, isError } = useGetProducts();
  const deleteProductMutation = useDeleteProduct();
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const products = data?.data || [];

  const handleDelete = (productId) => {
    deleteProductMutation.mutate(productId, {
      onSuccess: () => {
        console.log("Product deleted successfully");
      },
      onError: (error) => {
        console.error("Error deleting product:", error);
      },
    });
  };

  const handleEdit = (product) => {
    setSelectedProduct(product);
    setIsEditModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsEditModalOpen(false);
    setSelectedProduct(null);
  };

  return (
    <Box position="relative">
      <Center mt={8} flexDirection="column">
        <Heading as="h1" size="xl" display="flex" alignItems="center" mb={4}>
          Current Products
          <Icon as={RiRocketLine} ml={2} />
        </Heading>
        {isLoading ? (
          <Text>Loading products...</Text>
        ) : isError ? (
          <Text>Error fetching products</Text>
        ) : products.length === 0 ? (
          <Text fontSize="xl" display="flex" alignItems="center">
            No products found
            <Icon as={FaSadTear} ml={2} />
            <Text
              fontSize="lg"
              color={colorMode === "light" ? "blue.500" : "blue.300"}
              ml={4}
              cursor="pointer"
              onClick={() => navigate("/create")}
              display="inline"
              _hover={{ textDecoration: "underline" }}
            >
              Create a product
            </Text>
          </Text>
        ) : (
          <Box
            display="grid"
            gridTemplateColumns={{
              base: "repeat(1, 1fr)",
              sm: "repeat(2, 1fr)",
              md: "repeat(3, 1fr)",
            }}
            gap={6}
            width="100%"
            maxW="container.lg"
          >
            {products.map((product) => (
              <ProductCard
                key={product._id}
                product={product}
                onEdit={() => handleEdit(product)}
                onDelete={() => handleDelete(product._id)}
              />
            ))}
          </Box>
        )}
      </Center>
      {selectedProduct && (
        <EditModal
          product={selectedProduct}
          onClose={handleCloseModal}
          isOpen={isEditModalOpen}
        />
      )}
    </Box>
  );
};

export default HomePage;
