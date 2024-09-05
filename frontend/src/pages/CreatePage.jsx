import React, { useState } from "react";
import {
  Box,
  Heading,
  VStack,
  FormControl,
  Input,
  Button,
  Center,
  Text,
} from "@chakra-ui/react";

import { useCreateProduct } from "../store/product";

const CreatePage = () => {
  const [product, setProduct] = useState({
    productName: "",
    price: "",
    imageUrl: "",
  });

  const createProductMutation = useCreateProduct();

  const handleSubmit = (e) => {
    e.preventDefault();

    // Update the product object to match the expected field names
    const productData = {
      name: product.productName,
      price: product.price,
      image: product.imageUrl,
    };

    createProductMutation.mutate(productData, {
      onSuccess: () => {
        console.log("Product created successfully");
        // Reset form
        setProduct({
          productName: "",
          price: "",
          imageUrl: "",
        });
      },
      onError: (error) => {
        console.error("Error creating product:", error);
      },
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProduct((prevProduct) => ({
      ...prevProduct,
      [name]: value,
    }));
  };

  return (
    <Box maxW="container.md" mx="auto" mt={8}>
      <Heading as="h1" mb={6} textAlign="center">
        Create New Product
      </Heading>
      <Center>
        <VStack spacing={4} align="stretch" width="100%" maxW="400px">
          <form onSubmit={handleSubmit}>
            <FormControl mb={4}>
              <Input
                placeholder="Product Name"
                name="productName"
                value={product.productName}
                onChange={handleInputChange}
              />
            </FormControl>
            <FormControl mb={4}>
              <Input
                placeholder="Price"
                type="number"
                name="price"
                value={product.price}
                onChange={handleInputChange}
              />
            </FormControl>
            <FormControl mb={4}>
              <Input
                placeholder="Image URL"
                name="imageUrl"
                value={product.imageUrl}
                onChange={handleInputChange}
              />
            </FormControl>
            <Button colorScheme="blue" type="submit" width="100%">
              <Center width="100%">
                <Text>Add Product</Text>
              </Center>
            </Button>
          </form>
        </VStack>
      </Center>
    </Box>
  );
};

export default CreatePage;
