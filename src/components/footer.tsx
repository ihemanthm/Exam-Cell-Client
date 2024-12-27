import React from "react";
import { Box, Typography, Stack } from "@mui/material";
import src_logo from "../assets/src_logo.png";

export default function Footer() {
  return (
    <Box
      sx={{
        position: "absolute",
        bottom: 0,
        left: 0,
        right: 0,
        textAlign: "center",
        backgroundColor: "#fff", // Optional: Set a background color for better visibility
        padding: "10px 0", // Optional: Adds padding for spacing
      }}
    >
      <Stack
        direction="row"
        justifyContent="center"
        alignItems="center"
      >
        <Typography variant="body1" color="gray">
          Designed by Team SRC@CSE
        </Typography>
        <Box
          component="img"
          src={src_logo}
          alt="SRC Logo"
          sx={{
            height: "30px", // Adjust size to fit well with text
          }}
        />
      </Stack>
    </Box>
  );
}
