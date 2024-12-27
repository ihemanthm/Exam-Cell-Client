import React from "react";
import { Box, Typography, Stack } from "@mui/material";
import src_logo from "../assets/src_logo.png";

export default function  Footer () {
  return (
    <Box textAlign={"center"} sx={{position:"relative",bottom:5}}>
      <Stack
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
      >
        <Typography variant="body1" color="primary">
          Made by
        </Typography>
        <Stack direction={"row"} alignItems={"center"}>
          <Typography variant="h6" fontWeight={"bold"}>
            TEAM SRC
          </Typography>
          <Box
            component="img"
            src={src_logo}
            alt="SRC Logo"
            sx={{
              height: "50px",
            }}
          />
        </Stack>
      </Stack>
    </Box>
  );
};
