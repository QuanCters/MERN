import React, { useState } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  FormControl,
  Input,
  Button,
  VStack,
} from "@chakra-ui/react";
import { useUpdateProduct } from "../store/product";

const EditModal = ({ product, onClose, isOpen }) => {
  const [updatedProduct, setUpdatedProduct] = useState({
    productName: product.name,
    price: product.price,
    imageUrl: product.image,
  });

  const updateProductMutation = useUpdateProduct();

  const handleSubmit = (e) => {
    e.preventDefault();

    const productData = {
      name: updatedProduct.productName,
      price: updatedProduct.price,
      image: updatedProduct.imageUrl,
    };

    updateProductMutation.mutate(
      { id: product._id, updatedProduct: productData },
      {
        onSuccess: () => {
          console.log("Product updated successfully");
          onClose();
        },
        onError: (error) => {
          console.error("Error updating product:", error);
        },
      }
    );
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdatedProduct((prevProduct) => ({
      ...prevProduct,
      [name]: value,
    }));
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent bg="gray.800" color="white">
        <ModalHeader>Update Product</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <VStack spacing={4} as="form" onSubmit={handleSubmit}>
            <FormControl>
              <Input
                placeholder="Product Name"
                name="productName"
                value={updatedProduct.productName}
                onChange={handleInputChange}
                bg="gray.700"
              />
            </FormControl>
            <FormControl>
              <Input
                placeholder="Price"
                type="number"
                name="price"
                value={updatedProduct.price}
                onChange={handleInputChange}
                bg="gray.700"
              />
            </FormControl>
            <FormControl>
              <Input
                placeholder="Image URL"
                name="imageUrl"
                value={updatedProduct.imageUrl}
                onChange={handleInputChange}
                bg="gray.700"
              />
            </FormControl>
          </VStack>
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={handleSubmit}>
            Update
          </Button>
          <Button variant="ghost" onClick={onClose}>
            Cancel
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default EditModal;
