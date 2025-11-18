import React from "react";
import { Box } from "@mui/material";
import Navbar from "./AdminNavbar";


const Layout = ({ children }) => {
  return (
    <Box sx={{ display: "flex", height: "100vh", backgroundColor: "#f1f1f1" }}>
     
      <Box sx={{ flexGrow: 1, display: "flex", flexDirection: "column" }}>
        <Navbar />
        <Box
          sx={{
            flexGrow: 1,
            backgroundColor: "#f2edf0",
            borderRadius: "0 0 10px 10px",
            m: 2,
            p: 2,
          }}
        >
          {children}
        </Box>
      </Box>
    </Box>
  );
};

export default Layout;
