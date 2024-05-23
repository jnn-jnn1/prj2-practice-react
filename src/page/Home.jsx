import { Outlet } from "react-router-dom";
import { Box } from "@chakra-ui/react";
import { NavBar } from "../component/NavBar.jsx";

export function Home() {
  return (
    <Box>
      <Box>
        <NavBar />
      </Box>
      <Box>
        <Outlet />
      </Box>
    </Box>
  );
}
