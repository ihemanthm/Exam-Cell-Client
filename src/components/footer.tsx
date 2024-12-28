import { Box, Typography, Stack } from "@mui/material";
import src_logo from "../assets/src_logo.png";

export default function Footer() {


  return (
    <Box
     sx={{
        marginTop:10,
        textAlign: "center",
        backgroundColor: "#fff",
        padding: "8px 0"
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
            height: "50px",
            marginLeft: "8px",
          }}
        />
      </Stack>
    </Box>
  );
}
