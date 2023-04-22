import { Box } from "@mui/material";
import Grid from "@mui/material/Grid";
import React from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import "./formLogin.scss";
import logo from "../../assets/SmartMarketPlace_Logo.png";
import TopbarLanding from "../../components/topbarLanding/TopbarLanding";
import { useNavigate } from "react-router-dom";
import { WifiTetheringErrorRoundedTwoTone } from "@mui/icons-material";
import { useContext } from "react";
import { Context } from "../../context/Context";

const FormLogin = () => {
  const navigate = useNavigate();
  const context = useContext(Context);
  // Creating schema
  let schema = Yup.object().shape({
    email: Yup.string()
      .required(("Error. Email Required"))
      .email(("Error. Invalid Email")),
    password: Yup.string().required(("Error. Password Required")),
    // .min(5, t("error.min-password")),
  });

  function handleFormSubmit(values) {
    console.log("Sending");
    let data = {
      email: values.email,
      password: values.password,
    };
    console.log(data);
    fetch("http://127.0.0.1:8000/mande/user/login", {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify(data),
    })
    .then((res) => res.json())
      .then((res) => {
        window.localStorage.setItem(
          "loginUser",
          "Token " + res.description.token
        );
        context.setAppState({
            ...context.appState,
            admin: res.description.admin,
          });
          if (window.localStorage.loginUser != undefined) {
            if(context.admin == false) {
                navigate(`/worker/home`)
            }
            else{
                navigate(`/manager/home`)
            }
          }
        });
  }

  return (
    <Grid item xs={12} sm={12} md={12} lg={6} xl={6}>
      <TopbarLanding />
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          height: "calc(100vh - 70px)",
        }}
      >
        <Formik
          validationSchema={schema}
          initialValues={{ email: "", password: "" }}
          onSubmit={handleFormSubmit}
        >
          {({
            values,
            errors,
            touched,
            handleChange,
            handleBlur,
            handleSubmit,
          }) => (
            <div className="login">
              <form noValidate onSubmit={handleSubmit}>
                <div className="image">
                  <img src={logo} alt="logo" />
                </div>
                <h3>{("LOGIN")}</h3>
                <h5>{("Please insert your data")}</h5>
                <div className="inputs">
                  <input
                    type="email"
                    name="email"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.email}
                    placeholder={("test@email.com")}
                    className="form-control inp_text"
                    id="email"
                  />
                  <p className="error email">
                    {errors.email && touched.email && errors.email}
                  </p>
                  <input
                    type="password"
                    name="password"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.password}
                    placeholder={("1234")}
                    className="form-control"
                  />
                  <p className="error pass">
                    {errors.password && touched.password && errors.password}
                  </p>
                </div>
                <button type="submit">{("Log In")}</button>
                <p className="forget">
                  {("Account")}{" "}
                  <a href="#" className="text-blue-500">
                    {("Sign Up")}
                  </a>
                </p>
              </form>
            </div>
          )}
        </Formik>
      </Box>
    </Grid>
  );
};

export default FormLogin;
