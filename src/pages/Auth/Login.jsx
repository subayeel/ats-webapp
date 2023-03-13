import { TextField } from "@mui/material";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  CardContainer,
  Heading2,
  Button,
  LightText,
  Container,
  GridContainer,
} from "../../Global";
import { useLoginMutation } from "../../api/endpoints/loginEndpoint";

function Login() {
  const [login, { isLoading, error: loginError, isError }] = useLoginMutation();
  const [phone, setPhone] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  async function handlePhoneSubmit() {
    if (!phone) {
      setError("Please enter your Phone Number");
      return;
    } else if (phone.length !== 10) {
      setError("Invalid Phone Number Please enter without country code ");
      return;
    } else if (parseInt(phone).toString().length !== 10) {
      setError("Please Enter only Numbers in Phone field");
      return;
    }
    //create send otp api call
    try {
      await login({phone_number:phone});
    } catch (err) {
      console.log(err);
    }
  }
  return (
    <CardContainer>
      <Heading2 width="100%">Login</Heading2>

      <GridContainer width="100%" columns="1fr" rows="">
        <TextField
          error={error}
          helperText={error}
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          name="phone-number"
          id="outlined-basic"
          label="Enter your Phone number"
          variant="outlined"
        />
        <LightText>
          New User? <Link to="/auth/signup"> Sign Up</Link>
        </LightText>
        <Button
          onClick={() => handlePhoneSubmit()}
          btnColor={(props) => props.theme.colors.atsGreen}
        >
          Get OTP
        </Button>
      </GridContainer>
    </CardContainer>
  );
}

export default Login;
