import { useContext } from "react";
import { Box } from "@mui/material";
import { Context } from "../../context/Context";
import Sidebar from "../../components/sidebar/SidebarManager";
import Topbar from "../../components/topbar/Topbar";
import Header from "../../components/header/Header";
import Restriction from "../../components/restriction/Restriction";

const Home = () => {
    const context = useContext(Context);
    return(
    <>
    {window.localStorage.loginUser === undefined ? (
        <Restriction />
      ) : (
    <Box display={"flex"}>
          <Sidebar />
          <Box width={"100%"}>
            <Topbar />
            <Header title={"Home"} subtitle={"This is the main page"} />
          </Box>
        </Box> 
        )}
    </>
    );
};


export default Home;