import React, { useState } from "react";
import { Link, Outlet } from "react-router-dom";

//Components
import AuthNavbar from "../../components/ui/AuthNavbar";

//styled Components
import {
  CardContainer,
  Container,
  GridContainer,
  MainContainer,
  Heading,
  BtnWrap,
  Button,
  LightText,
  ScreenContainer,
} from "../../Global";

//RTK Query

import { BorderNavBtn, SmallText } from "./Auth.elements";
import { useLoginMutation } from "../../api/endpoints/loginEndpoint";

function AuthPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [login, { isLoading: isLoginLoading, error: loginError }] =
    useLoginMutation();

  const handleSubmit = (e) => {
    e.preventDefault();
    login({ username, password });
  };
  return (
    <>
      <AuthNavbar />

      <Outlet />
    </>
  );
}

export default AuthPage;
