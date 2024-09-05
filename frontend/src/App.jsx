import { Box, useColorMode } from "@chakra-ui/react"; // Added useColorMode import
import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import CreatePage from "./pages/CreatePage";
import Navbar from "./components/Navbar";
function App() {
  const { colorMode } = useColorMode(); // Get colorMode

  return (
    <Box bg={colorMode === "light" ? "white" : "gray.800"}>
      {" "}
      {/* Set background color based on colorMode */}
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/create" element={<CreatePage />} />
      </Routes>
    </Box>
  );
}

export default App;
