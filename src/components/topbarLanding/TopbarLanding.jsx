import { Box, IconButton, Button, useTheme } from "@mui/material";
import { useContext } from "react";
import { ColorModeContext, tokens } from "../../style/theme";
import { useState } from "react";
import { findRelativeConfig } from "@babel/core/lib/config/files";
import { useNavigate } from "react-router-dom";
import "./TopbarLanding.scss"
import logo from "../../assets/SmartMarketPlace_Logo.png";

const TopbarLandingPage = () => {
    const [modeTheme, setModeTheme] = useState("dark");
    const navigate = useNavigate();
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const colorMode = useContext(ColorModeContext);
  
    return (
      <Box
        width={"100%"}
        height={"70px"}
        display={"flex"}
        justifyContent={"space-between"}
        alignItems={"center"}
        backgroundColor={"transparent"}
        sx={{
          boxShadow: "0px 5px 0px 0px rgba(0,0,0,0.1)",
          position: "relative",
          paddingLeft: "10px",
          paddingRight: "10px",
          zIndex: "100",
        }}
      >
        <Box width={"280px"} display={"flex"} justifyContent={"space-between"}>
          <Button
            variant="outlined"
            sx={{
              fontSize: "10px",
              backgroundColor: "rgba(3,4,94,1)",
              color: "rgba(0,180,216,1)",
              transition: "all 0.5s"
            }}
            onClick={() => {navigate("/login")}}
          > {("Log In")}
          </Button>
        </Box>
      </Box>
    );
  };
  
  export default TopbarLandingPage;
  