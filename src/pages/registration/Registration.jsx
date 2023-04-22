import Grid from "@mui/material/Grid";
import FormRegistration from "./FormRegistration";
import { useContext } from "react";
import { Box } from "@mui/material";
import { Context } from "../../context/Context";
import backg from "../../assets/SmartMarketPlace_Logo.png";
import logo from "../../assets/smp_logo.png";
import Topbar from "../../components/topbar/Topbar";
import Header from "../../components/header/Header";
import Sidebar from "../../components/sidebar/SidebarManager";
import Restriction from "../../components/restriction/Restriction";

const Registration = () => {
let background = null;
background = backg;
  return (
    <>
    
    <Box display={"flex"}>

    <Box width={"100%"}>
    <Topbar/>
    <Grid container>
      <Grid item xs={0} sm={0} md={0} lg={5} xl={5}>
        <Box
          sx={{
            backgroundImage: `url(${logo})`,
            backgroundRepeat: "no-repeat",
            backgroundPosition: "50% 70%",
            height: "100%",
          }}
        ></Box>
    </Grid>
      <FormRegistration />
    </Grid>
    </Box>
    </Box>
    </>
  );
};

export default Registration;
