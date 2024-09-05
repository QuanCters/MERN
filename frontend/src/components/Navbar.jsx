import { Box, Flex, Spacer, Link, Button } from "@chakra-ui/react"; // Added Button import
import { Link as RouterLink } from "react-router-dom";
import { MdLocalGroceryStore } from "react-icons/md";
import { PlusSquareIcon } from "@chakra-ui/icons";
import { useColorMode } from "@chakra-ui/react"; // Added useColorMode import
import { MoonIcon, SunIcon } from "@chakra-ui/icons"; // Added MoonIcon and SunIcon imports
import { IconButton } from "@chakra-ui/react";

const Navbar = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  return (
    <Box bg={colorMode === "light" ? "gray.100" : "gray.700"} py={4}>
      <Flex maxW="container.lg" mx="auto" alignItems="center">
        <Link
          as={RouterLink}
          to="/"
          fontSize="xl"
          fontWeight="bold"
          display="flex"
          alignItems="center"
          color={colorMode === "light" ? "gray.800" : "white"}
        >
          PRODUCT STORE
          <MdLocalGroceryStore style={{ marginLeft: "10px" }} />
        </Link>
        <Spacer />
        <Flex>
          <Link as={RouterLink} to="/create" display="flex" alignItems="center">
            <PlusSquareIcon
              ml={1}
              fontSize="20px"
              color={colorMode === "light" ? "gray.800" : "white"}
            />
          </Link>
          <Box ml={4}>
            <IconButton
              icon={colorMode === "light" ? <MoonIcon /> : <SunIcon />}
              onClick={toggleColorMode}
              aria-label="Toggle color mode"
            />
          </Box>
        </Flex>
      </Flex>
    </Box>
  );
};

export default Navbar;
