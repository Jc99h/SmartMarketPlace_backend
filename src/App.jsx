import { Routes, Route } from "react-router-dom";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { ColorModeContext, useMode } from "./style/theme";
import { ProSidebarProvider } from "./components/react-pro-sidebar";
import HomePage from "./pages/landingPage/LandingPage";
import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import Registration from "./pages/registration/Registration";
function App() {
  const [theme, colorMode] = useMode();
  return (
  <>
    <div className="App">
      <ProSidebarProvider>
        <ColorModeContext.Provider value={colorMode}>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            <Routes>
              <Route path="/">
                <Route index element={<HomePage />} />
                <Route path="login" element={<Login />} />
                
              </Route>
              <Route path="manager">
                <Route path="home" element={<Home/>} />
                <Route path="registration" element={<Registration />} />
              </Route>
              <Route path="worker">
                <Route path="home" element={<Home/>} />
              </Route>
            </Routes>
          </ThemeProvider>
        </ColorModeContext.Provider>
      </ProSidebarProvider>
      </div>
  </>
  )
}

export default App
