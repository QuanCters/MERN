import React from "react";
import { Box, Image, Text, Button, HStack } from "@chakra-ui/react";
import { FaEdit, FaTrash } from "react-icons/fa";

const ProductCard = ({ product, onEdit, onDelete }) => {
  return (
    <Box
      borderWidth="1px"
      borderRadius="lg"
      overflow="hidden"
      bg="gray.800"
      color="white"
      p={4}
      maxW="sm"
    >
      <Image src={product.image} alt={product.name} />

      <Box p={4}>
        <Text fontWeight="bold" fontSize="xl" mb={2}>
          {product.name}
        </Text>
        <Text fontSize="lg" mb={4}>
          ${product.price}
        </Text>

        <HStack spacing={4}>
          <Button
            leftIcon={<FaEdit />}
            colorScheme="blue"
            variant="solid"
            onClick={() => onEdit(product)}
          >
            Edit
          </Button>
          <Button
            leftIcon={<FaTrash />}
            colorScheme="red"
            variant="solid"
            onClick={() => onDelete(product)}
          >
            Delete
          </Button>
        </HStack>
      </Box>
    </Box>
  );
};

export default ProductCard;
