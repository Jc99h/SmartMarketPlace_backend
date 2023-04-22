import { Box, Button, TextField } from "@mui/material";
import Grid from "@mui/material/Grid";
import { Formik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import "./formRegistration.scss";
import PhotoCamera from "@mui/icons-material/PhotoCamera";
import { useNavigate } from "react-router-dom";
import { useState, useContext } from "react";
import { Context } from "../../context/Context";

const FormRegistration = () => {
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const navigate = useNavigate();
  const [validar, setValidar] = useState(false);
  const context = useContext(Context);

  const handleFormSubmit = (values) => {
    let data = null;
    data = {
      f_name: values.firstName,
      l_name: values.lastName,
      id: values.idNumber,
      email: values.email,
      password:values.password,
      birth_dt: values.dateBirth,
      phone: values.cellphone,
      address: values.address,
      is_admin: False
    };
    fetch("http://127.0.0.1:8000/mande/user/create", {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify(data),
    })
    };

  return (
    <Grid item xs={12} sm={12} md={12} lg={7} xl={7}>
      <Box
        height={isNonMobile ? "calc(100vh - 70px)" : "100%"}
        padding={"30px"}
      >
        <Formik onSubmit={handleFormSubmit} initialValues={initialValues}>
          {({
            values,
            errors,
            touched,
            handleBlur,
            handleChange,
            handleSubmit,
          }) => (
            <div className="registration">
              <h3>{("Registration")}</h3>
              <form onSubmit={handleSubmit}>
              <Box
                    display="grid"
                    gap="30px"
                    width={"100%"}
                    height={"100%"}
                    gridTemplateColumns="repeat(6, minmax(0, 1fr))"
                    sx={{
                      "& > div": {
                        gridColumn: isNonMobile ? undefined : "span 6",
                      },
                    }}
                  >
                    <TextField
                      fullWidth
                      variant="filled"
                      type="text"
                      label={("First Name")}
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.firstName}
                      name="firstName"
                      error={!!touched.firstName && !!errors.firstName}
                      helperText={touched.firstName && errors.firstName}
                      sx={{ gridColumn: "span 3" }}
                    />
                    <TextField
                      fullWidth
                      variant="filled"
                      type="text"
                      label={("Last Name")}
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.lastName}
                      name="lastName"
                      error={!!touched.lastName && !!errors.lastName}
                      helperText={touched.lastName && errors.lastName}
                      sx={{ gridColumn: "span 3" }}
                    />
                    <TextField
                        fullWidth
                        variant="filled"
                        type="text"
                        label={("Citizen ID")}
                        onBlur={handleBlur}
                        onChange={handleChange}
                        value={values.idNumber}
                        name="idNumber"
                        error={!!touched.idNumber && !!errors.idNumber}
                        helperText={touched.idNumber && errors.idNumber}
                        sx={{ gridColumn: "span 3" }}
                      />
                    <TextField
                      fullWidth
                      variant="filled"
                      type="text"
                      label={("Email")}
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.email}
                      name="email"
                      error={!!touched.email && !!errors.email}
                      helperText={touched.email && errors.email}
                      sx={{ gridColumn: "span 6" }}
                    />
                    <TextField
                        fullWidth
                        variant="filled"
                        type="password"
                        label={("Password")}
                        onBlur={handleBlur}
                        onChange={handleChange}
                        value={values.password}
                        name="password"
                        error={!!touched.password && !!errors.password}
                        helperText={touched.password && errors.password}
                        sx={{ gridColumn: "span 3" }}
                    />
                    <TextField
                      fullWidth
                      id="filled-number"
                      variant="filled"
                      type="date"
                      InputLabelProps={{
                        shrink: true,
                      }}
                      label={("Birth Date")}
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.dateBirth}
                      name="dateBirth"
                      error={!!touched.dateBirth && !!errors.dateBirth}
                      helperText={touched.dateBirth && errors.dateBirth}
                      sx={{ gridColumn: "span 3" }}
                    />
                     <TextField
                        fullWidth
                        variant="filled"
                        type="text"
                        label={("Cellphone number")}
                        onBlur={handleBlur}
                        onChange={handleChange}
                        value={values.cellphone}
                        name="cellphone"
                        error={!!touched.cellphone && !!errors.cellphone}
                        helperText={touched.cellphone && errors.cellphone}
                        sx={{ gridColumn: "span 3" }}
                      />
                      <TextField
                        fullWidth
                        variant="filled"
                        type="text"
                        label={("Address")}
                        onBlur={handleBlur}
                        onChange={handleChange}
                        value={values.address}
                        name="address"
                        error={!!touched.address && !!errors.address}
                        helperText={touched.address && errors.address}
                        sx={{ gridColumn: "span 3" }}
                      />
              </Box>
              <Box
                    className="send"
                    paddingTop={"20px"}
                    display={"flex"}
                    justifyContent={"center"}
                  >
                    <Button
                      variant="outlined"
                      type="submit"
                      sx={{
                        width: "230px",
                        height: "50px",
                        borderRadius: "10px",
                      }}
                    >
                      Validate Data
                    </Button>
                  </Box>
              </form>
            </div>
          )}
        </Formik>
      </Box>
    </Grid>
  );
};

const phoneRegExp =
  /^((\+[1-9]{1,4}[ -]?)|(\([0-9]{2,3}\)[ -]?)|([0-9]{2,4})[ -]?)*?[0-9]{3,4}[ -]?[0-9]{3,4}$/;

const initialValues = {
  firstName: "",
  lastName: "",
  idNumber:"",
  email:"",
  password:"",
  dateBirth:"",
  cellphone:"",
  address:"",
};

export default FormRegistration;
