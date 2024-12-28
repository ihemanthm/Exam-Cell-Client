import { Box, Typography, Stack } from "@mui/material";
import src_logo from "../assets/src_logo.png";

export default function Footer() {


  return (
    <Box
      sx={{
        position: "absolute",
        left: 0,
        right: 0,
        textAlign: "center",
        backgroundColor: "#fff",
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
            height: "30px",
            marginLeft: "8px",
          }}
        />
      </Stack>
    </Box>
  );
}
