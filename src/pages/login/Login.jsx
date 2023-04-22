import { Box } from "@mui/material";
import Grid from "@mui/material/Grid";
import FormLogin from "./FormLogin";
import backg from "../../assets/smp_logo.png";
import TopbarLanding from "../../components/topbarLanding/TopbarLanding";

const Login = () => {
    return (
      <Grid container>
        
        <Grid item xs={0} sm={0} md={0} lg={6} xl={6}>
          <Box
            sx={{
              backgroundImage: `url(${backg})`,
              backgroundRepeat: "no-repeat",
              backgroundSize: "100% 100%",
              backgroundPosition: "center",
              height: "100%",
            }}
          >
          </Box>
        </Grid>
        <FormLogin />
      </Grid>
    );
  };
  
  export default Login;
  